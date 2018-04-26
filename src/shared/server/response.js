export default httpResponse => {
  httpResponse.ok = () => {
    httpResponse.statusCode = 200;
    httpResponse.end();
  };

  httpResponse.error = (statusCode = 403, message = null) => {
    httpResponse.statusCode = statusCode;
    if (message !== null) httpResponse.write(JSON.stringify({ message: message }));
    httpResponse.end();
  };

  httpResponse.send = (obj, statusCode = 200) => {
    httpResponse.statusCode = statusCode;
    httpResponse.write(JSON.stringify(obj));
    httpResponse.end();
  };

  return httpResponse;
};
