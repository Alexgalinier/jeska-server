import { MongoClient, ObjectID } from 'mongodb';

let db = null;

export const connect = async (dbServer, dbName) => {
  try {
    console.log('Database: Connecting...');
    let client = await MongoClient.connect(dbServer);
    console.log('Database: Connected!');
    db = client.db(dbName);
  } catch (e) {
    console.error('Database: An error occured', e);
    throw new Error(e);
  }
};

export const find = async (name, key, val) => {
  try {
    let res = await db.collection(name).find({ [key]: val });
    res = await res.toArray();

    if (res.length === 0) return undefined;
    if (res.length === 1) return res[0];

    return res;
  } catch (e) {
    console.log(e.stack);
  }
};

export const getAll = async name => {
  try {
    return (await db.collection(name).find({})).toArray();
  } catch (e) {
    console.log(e.stack);
  }
};

export const get = async function(name, id) {
  try {
    return await db.collection(name).findOne({ _id: ObjectID(id) });
  } catch (e) {
    console.log(e.stack);
  }
};

export const insert = async (name, newEntry) => {
  try {
    const res = await db.collection(name).insertOne(newEntry);
    newEntry._id = res.insertedId.toString();
    return newEntry;
  } catch (e) {
    console.log(e.stack);
  }
};

export const update = async (name, id, newValues, forceUpdate) => {
  try {
    delete newValues['_id'];
    return await db.collection(name).findOneAndUpdate({ _id: ObjectID(id) }, { $set: newValues });
  } catch (e) {
    console.log(e.stack);
  }
};

export const remove = async (name, id) => {
  try {
    return await db.collection(name).findOneAndDelete({ _id: ObjectID(id) });
  } catch (e) {
    console.log(e.stack);
  }
};

export const count = async name => {
  try {
    const res = await db.collection(name).stats();
    return res.count;
  } catch (e) {
    console.log(e.stack);
  }
};
