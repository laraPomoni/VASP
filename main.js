require('dotenv').config();

const express = require("express");
const Moment = require("moment");
const config = require("config");

const PORT = config.get('configuration.port');
const HOST = config.get('configuration.host');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);