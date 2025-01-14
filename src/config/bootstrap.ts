import { ConfigInterface, throwError } from './config';

const config: ConfigInterface = {
  http: {
    port: 8088,
  },
  modules: {
    latestVersion: '0.0.20',
    oldestVersion: '0.0.16',
  },
  db: {
    host: 'db-bootstrap.iasql.com',
    // TODO: Move away from env var to secret
    user: process.env.DB_USER ?? throwError('No DB User defined'),
    password: process.env.DB_PASSWORD ?? throwError('No DB Password defined'),
    port: 5432,
    forceSSL: true,
    sqlViaRest: true,
  },
  logger: {
    debug: true,
    test: false,
  },
  cors: {
    origin: 'http://localhost:3000',
  },
};

export default config;
