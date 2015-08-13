export default function (method, url, data) {
  // create a promise around an xhr object with json
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();

    request.open(method, url, true);

    // support cross origin requests
    request.setRequestHeader('Accept', '*/*');
    request.setRequestHeader('Content-type', 'application/json');
    request.withCredentials = true;

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(JSON.parse(request.response));
      }
      else {
        reject(Error(request.statusText));
      }
    };

    request.onerror = () => {
      reject(Error('A network error occurred'));
    };

    request.send(JSON.stringify(data));
  });
}
