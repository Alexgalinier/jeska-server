let routes = {
  get: [],
  post: [],
  put: [],
  delete: [],
};

const add = (type, match, callback) => routes[type].push({ match, callback });

export const all = (match, callback) => {
  add('get', match, callback);
  add('post', match, callback);
  add('put', match, callback);
  add('delete', match, callback);
};
export const get = (match, callback) => add('get', match, callback);
export const post = (match, callback) => add('post', match, callback);
export const put = (match, callback) => add('put', match, callback);
export const _delete = (match, callback) => add('delete', match, callback);
export const apply = (req, res) => {
  const method = req.method.toLowerCase();

  if (method === 'options') {
    const routeExits = Object.keys(routes).reduce((previous, key) => {
      const filteredRoutes = routes[key].filter(_ => req.name === _.match);
      return previous || filteredRoutes.length > 0;
    }, false);

    if (routeExits) return res.ok();
    return res.error(404);
  }

  if (!routes[method]) throw new Error(`Invalid method ${req.method}. Use get, post, put or delete.`);

  const routesToCall = routes[method].filter(_ => req.name === _.match);

  if (routesToCall.length === 0) res.error(404);

  let trackReq = req;
  let trackRes = res;
  const next = index => (reqUpdated, resUpdated) => {
    trackReq = reqUpdated !== undefined ? reqUpdated : trackReq;
    trackRes = resUpdated !== undefined ? resUpdated : trackRes;
    if (routesToCall[index]) {
      routesToCall[index].callback(trackReq, trackRes, next(index + 1));
    }
  };

  next(0)(trackReq, trackRes);

  // routesToCall.map(_ => _.callback(req, res));
};
