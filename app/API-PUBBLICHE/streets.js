const express = require("express");
const root = require('app-root-path');
const streetsController = require('./controllers/streetsController');
const router = express.Router();
const couchbase = require(root+"/models/couchbaseVasp.js");
const {validatorsSchema} = require(root+"/utils/validators/streetsValidator.js")
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
router.post('/', validatorsSchema, (req, res, next) =>{
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