import http from 'http';
import * as B4 from './hook/before';
import Request from './request';
import Response from './response';
import { all, get, put, post, _delete, apply } from './routes';

const handleNewRequest = async (req, res) => {
  try {
    const { request, response } = await B4.exec(await Request(req), Response(res));

    apply(request, response);
  } catch (e) {
    console.error('A request has failed', e.message);
  }
};

let configurations = {};

export const before = B4.add;
export const config = aConfig => (configurations = { ...configurations, ...aConfig });
export const routes = routesSetter => {
  routesSetter({ all, get, put, post, _delete, config: configurations });
};
export const start = port => {
  try {
    http
      .createServer(handleNewRequest)
      .listen(port)
      .on('listening', () => console.log(`Server started, listen on port : ${port}`));
  } catch (e) {
    console.error('An error occured on sartup', e.message);
    process.exit(1);
  }
};
