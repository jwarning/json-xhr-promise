# JSON XHR Promise

A simple JS Promise wrapper around an XMLHttpRequest with JSON. The module is a
function that takes the HTTP method name, the url of the request and optionally
any data to send with the request. On success (an HTTP 2xx success code) the
promise resolves and upon any other codes/errors it rejects the promise.

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

## License

[MIT](./LICENSE)
