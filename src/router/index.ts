import * as express from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

import config from '../config';
// routes
import { db } from './db';

const v1 = express.Router();
// 10 GB post payload limit for import dumps
v1.use(express.json({ limit: '10000MB' }));
v1.use(express.text({ limit: '10000MB' }));
if (config.auth) {
  const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      jwksUri: `${config.auth.domain}.well-known/jwks.json`,
    }),
    audience: config.auth.audience,
    issuer: config.auth.domain,
    algorithms: ['RS256'],
  });
  v1.use(checkJwt);
}
// TODO secure with scope
v1.use('/db', db);
v1.get('/version/latest', (_req, res) => res.send(config.modules.latestVersion));
v1.get('/version/oldest', (_req, res) => res.send(config.modules.oldestVersion));

export { v1 };
