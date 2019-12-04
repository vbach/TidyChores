// load in the imports
const error = require('debug')('api:error');
const express = require('express');
const bodyParser = require('body-parser');
const morganDebug = require('morgan-debug');
// routes
const childrenRouter = require('./routes/children');
const choresRouter = require('./routes/chores');
// create an express app
const app = express();
// checks to see if the content-type is json and parses it into req.body
app.use(bodyParser.json());
// log all requests
app.use(morganDebug('api:request', 'dev'));
// setup to use router at /children
app.use('/children', childrenRouter);
// setup to use router at /chores
app.use('/chores', choresRouter);
// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
