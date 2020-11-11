
const express = require("express");
const streetsController = require('./controllers/streetsController');
const router = express.Router();
const couchbase = require("../../models/couchbaseVasp.js");
var bodyParser = require('body-parser')

router.use(bodyParser.json())

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
    return streetsController.create(req.body)
	.then(result => {
		if(result){
			res.status(200);
			res.json(result);
		}else throw result
	})
	.catch(err => { return err; });
})

module.exports = router;