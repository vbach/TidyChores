// setting up a logger
const log = require('debug')('api:logging');
// get the express application
const app = require('./app');
const express = require('express');
const path = require('path');

//serve static assets
// if (process.env.NODE_ENV === 'production' || 'staging') {
//   app.use(express.static('../reactjs/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, '..', 'reactjs', 'build', 'index.html')
//     );
//   });
// }

// set the port to either the one passed from the environment variables or 4000
const port = process.env.PORT || 5000;
// spin up the server and log what port it is running on
app.listen(port, () => log(`API listening on port ${port}!`));
