const express = require("express");

const couchbase = require("couchbase");

const config = require('config');

// const cluster = new couchbase.Cluster("couchbase://localhost", {
//   username: "larapomoni",
//   password: "Pomoni01?",
// });

function authenticateUser(obj){
    if(obj.username == config.get("authentication.username") && obj.password == config.get("authentication.password")){
        return next();
    }else{
        return {code: 401, message: "unauthorized"}
    }
}

module.exports = {
    authenticateUser
}