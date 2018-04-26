import _ from 'lodash';

export const get = async (request, response, db) => {
  if (request.id) {
    const res = await db.get(request.name, request.id);
    res ? response.send(res) : response.error(404);
  } else {
    let res = await db.getAll(request.name);

    if (res && request.order) {
      res = _.orderBy(res, request.order);
    }

    res ? response.send(res) : response.send([]);
  }
};

export const post = async (request, response, db) => {
  response.send(await db.insert(request.name, request.data), 201);
};

export const put = async (request, response, db) => {
  const res = await db.update(request.name, request.id, request.data);

  res ? response.send(res) : response.error(404);
};

export const remove = async (request, response, db) => {
  const res = await db.remove(request.name, request.id);

  res ? response.send(res) : response.error(404);
};
