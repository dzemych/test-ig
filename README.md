# IG test

This [project](https://github.com/dzemych/test-gi) is test task for IG recruitment.

## Problems
For some reason, probably because of server configuration, fetching https://recruitmentdb-508d.restdb.io/rest/accounts from localhost (ONLY from localhost), causes CORS error. With curl everything works perfectly. If set mode in request to 'no-cors' you cannot send 'x-apikey' header with request. I solved this either by installing a special plugin to the browser or by setting up a proxy server on localhost (anyproxy) that would be addressing all requests to the destination as a normal server.
Also, I want to mention that your API works in a strange way. /accounts endpoint gives you an array of 33 values, of which only 7 has wanted fields, the rest have only _id field. /accounttypes gives you an array of values that has only three fields including _id. And in items that you get from /accounts and /accounttypes is no item with the equal _id.
## P.S
#### I delete all proxy code and configurations

### Error log - 
Access to XMLHttpRequest at 'https://recruitmentdb-508d.restdb.io/rest/accounts' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

## Tests
Test for UsersList is in the src/components/UsersLists

## Engines
Please use only yarn >=1.22.19

## Available Scripts

In the project directory, you can run:

### `npm start`
### `npm test`
### `npm build`
### `npm eject`