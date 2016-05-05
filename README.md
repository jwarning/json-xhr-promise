# JSON XHR Promise

A simple JS Promise wrapper around an XMLHttpRequest with JSON. The module is a function that takes the HTTP method name, the url of the request and any data to send with the request. On success (an HTTP 2xx success code) the promise resolves and upon any other codes/errors it rejects the promise.

## Example

```
import jsonXHR from 'json-xhr-promise';

jsonXHR('POST', 'http://example.com/path', { value: 'Promises rule!' })
  .then(data => console.log(data));

// alternate method
jsonXHR({
  method: 'POST',
  url: 'http://example.com/path',
  data: { id: 1 }
}).then(data => console.log(data));

```

## Notes

- The HTTP method string should ideally be in the format: 'GET', 'POST', 'PUT', 'DELETE', etc...
- The url should be a string of the full path
- The data should be a plain JS object (it gets stringified in the request)
- An optional useCache paramater can be added as the last argument or in the options object to specify if the return result from a request should be cached and returned again if the same url and method are called

## License

[MIT](./LICENSE)
