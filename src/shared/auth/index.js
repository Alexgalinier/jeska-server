import jwt from 'jsonwebtoken';
import * as Roles from './roles';

let authConfig = {
  secret: 'should-be-changed',
  maxAge: '1h',
  roles: {},
};

Roles.available(authConfig.roles);

export const config = aConfig => {
  authConfig = { ...authConfig, ...aConfig };
  Roles.available(authConfig.roles);
};
export const token = data => jwt.sign(data, authConfig.secret);
export const check = (req, res, next) => {
  try {
    if (!req.headers || !req.headers['authorization']) throw new Error('Header authorization not defined');

    const token = req.headers['authorization'].replace('Bearer ', '');

    const authData = jwt.verify(token, authConfig.secret, { maxAge: authConfig.maxAge });

    Roles.verify(authData.role, req.name, req.method);

    if (next !== undefined) {
      next({ ...req, authData }, res);
    } else {
      return authData;
    }
  } catch (e) {
    console.error('Auth check failed:', e.message);
    if (res !== undefined) {
      res.error(401);
    } else {
      return false;
    }
  }
};
