export default httpHeaderOrigin => (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', httpHeaderOrigin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', false);

  if (req.method !== 'OPTIONS') {
    res.setHeader('Content-Type', 'application/json');
  }

  next(req, res);
};
