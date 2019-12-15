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

// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // API calls
// app.get('/api/hello', (req, res) => {
//   res.send({ express: 'Hello From Express' });
// });

// app.post('/api/world', (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`
//   );
// });

// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'reactjs/build')));

//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'reactjs/build', 'index.html'));
//   });
// }

// app.listen(port, () => console.log(`Listening on port ${port}`));
// setting up a logger
// const log = require('debug')('api:logging');
// // get the express application
// const app = require('/api/app');
// const express = require('express');
// const path = require('path');

// //serve static assets
// if (process.env.NODE_ENV === 'production' || 'staging') {
//   app.use(express.static('reactjs/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'reactjs', 'build', 'index.html'));
//   });
// }

// // set the port to either the one passed from the environment variables or 4000
// const port = process.env.PORT || 5000;
// // spin up the server and log what port it is running on
// app.listen(port, () => log(`API listening on port ${port}!`));
