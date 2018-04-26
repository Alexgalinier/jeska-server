import dotenv from 'dotenv';
import dbConfig from './db';
import webConfig from './web';
import encryptConfig from './encrypt';
import authConfig from './auth';

if (process.env.NODE_ENV === 'production') {
  dotenv.config();
}

export default {
  database: dbConfig(process.env),
  web: webConfig(process.env),
  encrypt: encryptConfig(process.env),
  auth: authConfig(process.env),
};
