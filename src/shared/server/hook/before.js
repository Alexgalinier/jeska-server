let before = [];

export const add = func => {
  before.push(func);
};

export const exec = (request, response) => {
  let trackReq = request;
  let trackRes = response;

  return new Promise((resolve, reject) => {
    try {
      const next = index => (reqUpdated, resUpdated) => {
        trackReq = reqUpdated !== undefined ? reqUpdated : trackReq;
        trackRes = resUpdated !== undefined ? resUpdated : trackRes;

        if (before[index]) {
          before[index](trackReq, trackRes, next(index + 1));
        } else {
          resolve({ request: trackReq, response: trackRes });
        }
      };

      next(0)(trackReq, trackRes);
    } catch (e) {
      reject(`An error occured in before hook chain: ${e.message}`);
    }
  });
};
