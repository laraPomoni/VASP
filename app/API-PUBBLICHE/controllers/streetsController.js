const couchbase = require('../../../models/couchbaseVasp');
const { N1qlQuery } = require('couchbase');
const { STREET_TYPE } = require('../../../assets/document-type.js');
const { generateId } = require('../../../utils/ids');
const CREATED_BY = "api-public"

function getById(cmnId){
    return {"name": "Barconcelli", "lunghezza": 10000, "classe": "I"};
}

function getAll(){
    return {"name": "Barconcelli", "lunghezza": 10000, "classe": "I"};
}

function createStreet(body){
    let uuid = generateId(STREET_TYPE);
	let street = {
		channels: body.channel,
		type: STREET_TYPE,
		log: {
			createdBy: CREATED_BY,
			createdDate: new Date(),
		},
        name: body.name,
        length: body.streetLength,
        class: body.class, //classe di transibilità

    }

    return couchbase.insert(uuid, movement)
    .then(result => {
        return uuid;
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}

module.exports = {
    getById,
    getAll,
    createStreet
}
