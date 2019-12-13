// load in the imports
const express = require('express');
const bodyParser = require('body-parser');
const morganDebug = require('morgan-debug');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

// routes
const childrenRouter = require('./routes/children');
const choresRouter = require('./routes/chores');
const rewardsRouter = require('./routes/rewards');
const usersRouter = require('./routes/users');
// create an express app
const app = express();
app.use(cors());
// checks to see if the content-type is json and parses it into req.body
app.use(bodyParser.json());
// log all requests
app.use(morganDebug('api:request', 'dev'));

// setup to use router at /user
app.use('/users', usersRouter);
// setup to use router at /children
app.use('/children', childrenRouter);
// setup to use router at /chores
app.use('/chores', choresRouter);
// setup to use router at /rewards
app.use('/rewards', rewardsRouter);

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
