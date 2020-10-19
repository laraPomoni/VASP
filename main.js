require('dotenv').config();

const express = require("express");
const Moment = require("moment");
const config = require("./config/default.json");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);