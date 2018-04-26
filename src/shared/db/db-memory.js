import _ from 'lodash';
import shortId from 'shortid';

let data = {};

export const find = async (name, key, val) => {
  if (!data[name]) return Promise.resolve(undefined);
  return Promise.resolve(data[name].find(obj => obj[key] === val));
};
export const getAll = async name => Promise.resolve(data[name]);
export const get = async (name, id) => find(name, '_id', id);

export const insert = async (name, newEntry) => {
  if (!data[name]) data[name] = [];

  newEntry._id = shortId.generate();
  data[name].push(newEntry);

  return Promise.resolve(newEntry);
};

export const update = async (name, id, newValues, forceUpdate) => {
  if (!data[name]) return Promise.resolve(undefined);

  const index = data[name].findIndex(obj => obj._id === id);

  if (index < 0) return Promise.resolve(undefined);

  if (forceUpdate) {
    data[name][index] = Object.assign({}, data[name][index], newValues);
  } else {
    data[name][index] = _.merge(data[name][index], newValues);
  }

  return Promise.resolve(data[name][index]);
};

export const remove = async (name, id) => {
  if (!data[name]) return Promise.resolve(undefined);

  const index = data[name].findIndex(obj => obj._id === id);

  if (index < 0) return Promise.resolve(undefined);

  const deletedObj = data[name].splice(index, 1);
  return Promise.resolve(deletedObj[0]);
};
