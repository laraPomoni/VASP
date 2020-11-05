var express = require("express");
var app = express();
const streets = require('./API-PUBBLICHE/streets.js');

app.use("/api-public/streets", streets);

app.get("/numberValidator", function(req, res) {

  var number   = req.query.value;
  var result = checker.numberValidator(number);
  res.send(JSON.stringify(number));

});

app.listen(3000);

module.exports = app;