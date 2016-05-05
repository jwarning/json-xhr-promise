let cache = {};

export default function(method, url, data, useCache) {
  let withCredentials = true;

  if (arguments.length === 1) {
    const options = arguments[0];

    method = options.method || options.type || 'GET';
    useCache = options.useCache || options.cache;
    url = options.url;
    data = options.data;
    withCredentials = typeof options.withCredentials !== 'undefined'
      ? !!options.withCredentials
      : true;
  }

  const jsonData = JSON.stringify(data);
  const cacheValue = jsonData === undefined ? '' : jsonData;

  if (!useCache || !(cache[url] && cache[url][cacheValue])) {
    if (!cache[url]) cache[url] = [];

    // create a promise around an xhr object with json
    cache[url][cacheValue] = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open(method, url, true);

      // support cross origin requests
      request.setRequestHeader('Accept', '*/*');
      request.setRequestHeader('Content-type', 'application/json');
      request.withCredentials = withCredentials;

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.response));
        } else {
          reject(request.statusText);
        }
      };

      request.onerror = () => reject('An error occurred in the request');

      request.send(jsonData);
    });
  }

  return cache[url][cacheValue];
}
