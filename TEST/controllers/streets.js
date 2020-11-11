var expect = require("chai").expect;
var chai = require('chai');
const config = require('config');
var streetsController = require("../../app/API-PUBBLICHE/controllers/streetsController.js");
let server = require('../../app/server.js');
let should = chai.should();
const axios = require('axios');
const request = require('request');

let streetBody = {
    channels: ["authority:1"],
    log: {
        createdBy: "api-public",
        createdDate: "2020-11-06"
    },
    //name: "Strada Barconcelli",
    class: 1, //classe di transibilità
    departure: {
        name: "Loc. Giabbio",
        address: "Via giabbio",
        city: "Premana",
        province: "LC",
        zipcode: "23834"
    },
    arrival: {
        name: "Alpe Barconcelli",
        address: null,
        city: "Premana",
        province: "LC",
        zipcode: "23834"
    },
    year: "2020",
    lengthMeters: 2000,
    description: "Strada agro-silvo-pastorale con destinazione alpe Barconcelli",
    status: 1,
    dateOpening: "2020-04-01",
    dateClosure: "2020-11-01"
  }

describe("[Couchbase VASP] VASP streets controller", function(){
    describe("[Couchbase VASP] Get all streets ", function() {
        it("returns status 200 and valid street", function(done) {
            axios.get('http://localhost:3005/v1/api-public/streets')
            .then(result => {
                expect(result.status).to.equal(200);
                result.data.should.be.a('object');
                done()
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
        });
    });

    describe("[Couchbase VASP] Insert a new street", function() {
        it("returns status 200", function(done) {
            axios.post('http://localhost:3005/v1/api-public/streets', streetBody)
            .then(result => {
                expect(result.status).to.equal(200);
                result.data.should.be.a('object');
                done()
            })
            .catch(err => {
                console.log(err);
                done(err);
            })
        });
    });
});