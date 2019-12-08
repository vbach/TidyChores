// load in the imports
const error = require('debug')('api:error');
const express = require('express');
const port = process.env.PORT || 4000;
const log = require('debug')('api:logging');
const bodyParser = require('body-parser');
const morganDebug = require('morgan-debug');
const cors = require('cors');

// routes
const childrenRouter = require('./routes/children');
const choresRouter = require('./routes/chores');
const rewardsRouter = require('./routes/rewards');
// create an express app
const app = express();
app.use(cors());
// checks to see if the content-type is json and parses it into req.body
app.use(bodyParser.json());
// log all requests
app.use(morganDebug('api:request', 'dev'));
// setup to use router at /user
// setup to use router at /auth
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

// spin up the server and log what port it is running on
app.listen(port, () => log(`API listening on port ${port}!`));

// export the express app
module.exports = app;
