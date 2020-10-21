require('dotenv').config();

const express = require("express");
const Moment = require("moment");
const config = require("config");
const passport = require("passport");
const {BasicStrategy} = require("passport-http");
const auth = require('./middleware/auth');

const PORT = config.get('configuration.port');
const HOST = config.get('configuration.host');

passport.use(new BasicStrategy(
    function(username, password, done) {
      auth.authenticateUser({ username: username , password: password}, function (err, resp) {
        console.log(resp);
        if(err) return err;
        return done(false, resp);
      });
    }
  ));

const app = express();
app.get('/', passport.authenticate('basic', { session: false }), (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);