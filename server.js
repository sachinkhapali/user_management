require('rootpath')();
const express = require('express');
const helmet = require('helmet');
//const https = require("https");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(helmet({ dnsPrefetchControl: { allow: true }}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({'origin': 'http://localhost:4200'}))
  
// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
//https.createServer(app).listen(port);
//console.log('Server listening on port ' + port);
const server = app.listen(port, function () {
     console.log('Server listening on port ' + port);
});
