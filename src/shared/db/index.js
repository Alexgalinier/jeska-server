import * as memoryDB from './db-memory';
import * as mongoDB from './db-mongo';

export default async ({ user, password, name }) => {
  let db;

  if (user && password && name) {
    try {
      db = mongoDB;

      await db.connect(`mongodb://${user}:${password}@ds159489.mlab.com:59489/${name}`, name);
    } catch (e) {
      throw new Error('Database failed to start');
    }
  } else {
    db = memoryDB;
    await initialize(db);
  }

  return db;
};

const initialize = async db => {
  const user = await db.insert('users', {
    username: 'Alex',
    hash: '$2b$10$i48VrWcXiUczU5LYkTSbjed5jewZRdKGofE08PAU3sXTni2AKANXC',
    role: 'users',
  });
  await db.insert('finances', {
    data: [],
    owner: user._id,
  });
};
