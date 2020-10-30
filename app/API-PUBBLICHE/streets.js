
const express = require("express");
const streetsController = require('./controllers/streetsController');
const router = express.Router();
const checker = require("../../test/test")
//GET ALL 
router.get('/', (req, res, next) =>{
    res.send("OK");
})

//GET BY ID
router.get('/:id', (req, res, next) =>{
    res.send("OK by ID");
})

module.exports = {
    router
}