var express = require("express");
var app = express();
var checker = require("./checker");

app.get("/streets", function(req, res) {

  var string   = req.query.value;
  var result = checker.stringValidator(string);
  res.send(JSON.stringify(result));

});

app.get("/numberValidator", function(req, res) {

  var number   = req.query.value;
  var result = checker.numberValidator(number);
  res.send(JSON.stringify(number));

});

app.listen(3000);