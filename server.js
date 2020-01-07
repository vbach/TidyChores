// setting up a logger
const log = require('debug')('api:logging');
// get the express application
const express = require('express');
const bodyParser = require('body-parser');
const morganDebug = require('morgan-debug');
const cors = require('cors');
const path = require('path');

// create an express app
const app = express();
app.use(cors());

// init middleware
app.use(express.json({ extended: false }));

// routes
const childrenRouter = require('./routes/children');
const choresRouter = require('./routes/chores');
const rewardsRouter = require('./routes/rewards');
const usersRouter = require('./routes/users');
// const stepsRouter = require('./routes/steps');

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
// setup to use router at /steps
// app.use('/steps', stepsRouter);
// setup to use router at /rewards
app.use('/rewards', rewardsRouter);

// Serve static assetts
//serve static assets
if (process.env.NODE_ENV === 'production' || 'staging') {
  app.use(express.static('reactjs/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'reactjs', 'build', 'index.html'));
  });
}

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on: ${PORT}`));

// export the express app
module.exports = app;
