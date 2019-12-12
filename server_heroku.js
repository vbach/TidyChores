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
const log = require('debug')('api:logging');
// get the express application
const app = require('/api/app');
const express = require('express');
const path = require('path');

//serve static assets
if (process.env.NODE_ENV === 'production' || 'staging') {
  app.use(express.static('reactjs/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'reactjs', 'build', 'index.html'));
  });
}

// set the port to either the one passed from the environment variables or 4000
const port = process.env.PORT || 5000;
// spin up the server and log what port it is running on
app.listen(port, () => log(`API listening on port ${port}!`));
