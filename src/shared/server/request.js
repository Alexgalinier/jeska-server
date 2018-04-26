import url from 'url';

const getContent = req => {
  let data = '';

  return new Promise(resolve => {
    req.on('data', chunk => (data += chunk));
    req.on('end', () => resolve(data));
  });
};

export default async httpRequest => {
  const parsedUrl = url.parse(httpRequest.url, true);
  const splittedPathname = parsedUrl.pathname.split('/');

  const res = await getContent(httpRequest);
  let data = {};
  if (res) {
    try {
      data = JSON.parse(res);
    } catch (e) {
      console.error('Invalid JSON data request:', res);
    }
  }

  return {
    ...httpRequest,
    id: splittedPathname.length > 2 ? splittedPathname[splittedPathname.length - 1] : undefined,
    name: splittedPathname[1],
    order: parsedUrl.query.o || parsedUrl.query.order,
    data: data,
  };
};
