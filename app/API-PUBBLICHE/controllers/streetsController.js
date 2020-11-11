const couchbase = require('../../../models/couchbaseVasp');
const { N1qlQuery } = require('couchbase');
const { STREET_TYPE } = require('../../../assets/document-type.js');
const { generateId } = require('../../../utils/ids');
const moment = require('moment');
const CREATED_BY = "api-public"

function getById(cmnId){
    return {"name": "Barconcelli", "lunghezza": 10000, "classe": "I"};
}

function getAll(){
    return {"name": "Barconcelli", "lunghezza": 10000, "classe": "I"};
}

function create(body){
    let uuid = generateId(STREET_TYPE);
	let street = {
		channels: body.channels,
		type: STREET_TYPE,
		log: {
			createdBy: CREATED_BY,
			createdDate: new Date(),
		},
        name: body.name,
        departure: {
            name: body.departure.name,
            address: body.departure.address,
            city: body.departure.city,
            province: body.departure.province,
            zipcode: body.departure.zipcode
        },
        arrival: {
            name: body.arrival.name,
            address: body.arrival.address,
            city: body.arrival.city,
            province: body.arrival.province,
            zipcode: body.arrival.zipcode
        },
        year: body.year,
        lengthMeters: body.lengthMeters,
        description: body.description,
        status: body.status,
        dateOpening: moment(body.dateOpening).format('DD-MM-YYYY hh-mm-ss'),
        dateClosure: moment(body.dateClosure).format('DD-MM-YYYY hh-mm-ss'),
        class: body.class //classe di transibilità, va da I a III
    }
    console.log(street)

    return couchbase.insert(uuid, street)
    .then(result => {
        console.log(result)
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
    create
}
