import EventEmitter from 'events';
import { run } from 'graphile-worker';

import { IasqlOperationType } from '../modules/iasql_functions@0.0.1/entity';
import MetadataRepo from './repositories/metadata'
import * as iasql from '../services/iasql'
import logger, { logUserErr } from '../services/logger'
import { TypeormWrapper } from './typeorm';
import { IasqlDatabase } from '../entity';
import config from '../config';

const workerShutdownEmitter = new EventEmitter();
// no max number of listeners warning
workerShutdownEmitter.setMaxListeners(0);

// graphile-worker here functions as a library, not a child process.
// It manages its own database schema
// (graphile_worker) and migrations in each uid db using our credentials
export async function start(dbId: string, dbUser:string) {
  // use the same connection for the scheduler and its operations
  const conn = await TypeormWrapper.createConn(dbId, { name: `${dbId}-${Math.floor(Math.random()*10000)}-scheduler`, });
  // create a dblink server per db to reduce connections when calling dblink in iasql op SP
  // https://aws.amazon.com/blogs/database/migrating-oracle-autonomous-transactions-to-postgresql/
  await conn.query(`CREATE EXTENSION IF NOT EXISTS dblink;`);
  await conn.query(`CREATE SERVER IF NOT EXISTS loopback_dblink_${dbId} FOREIGN DATA WRAPPER dblink_fdw OPTIONS (host '${config.db.host}', dbname '${dbId}', port '${config.db.port}');`);
  await conn.query(`CREATE USER MAPPING IF NOT EXISTS FOR ${config.db.user} SERVER loopback_dblink_${dbId} OPTIONS (user '${config.db.user}', password '${config.db.password}')`);
  const runner = await run({
    pgPool: conn.getMasterConnection(),
    concurrency: 5,
    logger,
    // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
    noHandleSignals: false,
    pollInterval: 1000, // ms
    taskList: {
      operation: async (payload: any) => {
        const { params, opid, optype } = payload;
        let promise;
        switch(optype) {
          case IasqlOperationType.APPLY: {
            promise = iasql.apply(dbId, false, conn);
            break;
          }
          case IasqlOperationType.PLAN_APPLY: {
            promise = iasql.apply(dbId, true, conn);
            break;
          }
          case IasqlOperationType.SYNC: {
            promise = iasql.sync(dbId, false, conn);
            break;
          }
          case IasqlOperationType.PLAN_SYNC: {
            promise = iasql.sync(dbId, true, conn);
            break;
          }
          case IasqlOperationType.INSTALL: {
            promise = iasql.install(params, dbId, dbUser, false, conn);
            break;
          }
          case IasqlOperationType.UNINSTALL: {
            promise = iasql.uninstall(params, dbId, conn);
            break;
          }
          case IasqlOperationType.LIST: {
            promise = iasql.modules(true, false, dbId);
            break;
          }
          case IasqlOperationType.UPGRADE: {
            promise = (async () => {throw new Error('Upgrade not yet implemented'); })();
            break;
          }
          default: {
            break;
          }
        }
        try {
          let output = await promise;
          // once the operation completes updating the `end_date`
          // will complete the polling
          const query = `
            update iasql_operation
            set end_date = now(), output = '${output}'
            where opid = uuid('${opid}');
          `;
          logger.debug(query);
          output = typeof output === 'string' ? output : JSON.stringify(output);
          await conn.query(query);
        } catch (e) {
          let errorMessage: string | string[] = logUserErr(e);
          // split message if multiple lines in it
          if (errorMessage.includes('\n')) errorMessage = errorMessage.split('\n');
          // error must be valid JSON as a string
          const errorStringify = JSON.stringify({ message: errorMessage });
          // replace single quotes to make it valid
          const error = errorStringify.replace(/[\']/g, "\\\"");
          const query = `
            update iasql_operation
            set end_date = now(), err = '${error}'
            where opid = uuid('${opid}');
          `
          await conn.query(query);
        } finally {
          const recCount = await iasql.getDbRecCount(conn);
          await MetadataRepo.updateDbRecCount(dbId, recCount);
        }
      },
    },
  });
  // register the shutdown listener
  workerShutdownEmitter.on(dbId, async () => {
    await runner.stop()
    await conn.query(`DROP SERVER IF EXISTS loopback_dblink_${dbId} CASCADE`);
    await conn.dropConn();
  });
  // deregister it when already stopped
  runner.events.on('stop', () => {
    workerShutdownEmitter.removeAllListeners(dbId);
  })
}

export function stop(dbId: string) {
  workerShutdownEmitter.emit(dbId);
}

export async function stopAll() {
  const dbs: IasqlDatabase[] = await MetadataRepo.getAllDbs();
  dbs.forEach(db => stop(db.pgName));
}

// spin up a worker for every db that this server is already managing
export async function init() {
  const dbs: IasqlDatabase[] = await MetadataRepo.getAllDbs();
  const inits = await Promise.allSettled(dbs.map(db => start(db.pgName, db.pgUser)));
  for (const bootstrap of inits) {
    if (bootstrap.status === 'rejected') {
      logger.error(bootstrap.reason);
    }
  }
}