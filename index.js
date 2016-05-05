let requests = {};

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
  const cacheIndex = jsonData === undefined ? '' : jsonData;


  if (!useCache || !(requests[url] && requests[url][cacheIndex])) {
    if (!requests[url]) requests[url] = [];

    // create a promise around an xhr object with json
    requests[url][cacheIndex] = new Promise((resolve, reject) => {
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

      request.onerror = () => reject('A network error occurred');

      request.send(jsonData);
    });
  }

  return requests[url][cacheIndex];
}
