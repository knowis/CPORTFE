const express = require('express');

export const beforeAllMiddleware = express.Router();

// Enable options call to return proper with 200 state
// Server must be able to handle CORS. At the moment all origins are enabled.
// TODO: think about which origins to allow: Maybe for the future we want to have a more specific white list?
beforeAllMiddleware.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.sendStatus(200);
});

beforeAllMiddleware.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  return next();
});
