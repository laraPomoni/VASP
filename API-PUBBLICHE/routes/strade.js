require('dotenv').config();

const express = require("express");
const streetsController = require('../controllers/streetsController');
const streets = express.Router();

streets.get('/', (req, res) =>{
    res.send("OK");
})

module.exports = {
    streets
}