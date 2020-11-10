var express = require("express");
var app = express();
const streets = require('./API-PUBBLICHE/streets.js');

app.use("/api-public/streets", streets);

module.exports = app;