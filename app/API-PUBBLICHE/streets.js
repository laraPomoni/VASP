
const express = require("express");
const streetsController = require('./controllers/streetsController');
const router = express.Router();
const couchbase = require("../../models/couchbaseVasp.js");

//GET ALL 
router.get('/', (req, res, next) =>{

    res.status(200);
    res.send('I\'m alive');
})

//GET BY ID
router.get('/:id', (req, res, next) =>{
    res.status(200);
    res.send("OK by ID");
})

//CREATE - POST create a new street
router.post('/', (req, res, next) =>{
	console.log("entra")
    return streetsController.create(req.body)
	.then(result => {
		if(result.code == 200){
			res.status(200);
			res.json(result);
		}else throw result
	})
	.catch(err => { return err; });
})

module.exports = router;