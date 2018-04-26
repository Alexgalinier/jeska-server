import * as server from './shared/server';
import log from './hooks/log';
import accessControl from './hooks/access-control';
import config from './config';
import * as Auth from './shared/auth';
import * as Encrypt from './shared/encrypt';
import Database from './shared/db';
// Routes
import login from './routes/login';
import users from './routes/users';
import finances from './routes/finances';

(async () => {
  const { auth, encrypt, web, database } = config;

  Auth.config(auth);
  Encrypt.config(encrypt);

  server.before(log);
  server.before(accessControl(web.headerOrigin));

  server.config({ db: await Database(database) });
  server.routes(login);
  server.routes(users);
  server.routes(finances);

  server.start(web.port);
})();
