require('dotenv').config();

const express = require("express");
const Moment = require("moment");
const config = require("config");
const passport = require("passport");
const {BasicStrategy} = require("passport-http");
const auth = require('./middleware/auth');

const PORT = config.get('configuration.port');
const HOST = config.get('configuration.host');

const app = express();

var streets = require('./API-PUBBLICHE/routes/strade');

app.get('/', (req, res) => {
  res.send('Hello World');
});

//app.use('/strade', auth.authenticateUser, streets);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);