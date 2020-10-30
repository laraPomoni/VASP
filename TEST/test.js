var expect    = require("chai").expect;
var streetsController = require("../app/API-PUBBLICHE/controllers/streetsController.js");
var main = require('../main.js');
describe("VASP API", function(){

    describe("Opening connection with couchbase", function(){
        it("Controllo che la connessione sia aperta correttamente", function(){
            expect(main.startServer()).to.be.true;
        })
    })

    describe("VASP streets controller", function() {
        it("Controlla se quella strada esiste", function() {
            var idCmn = "cmn:12345";
            var street = streetsController.getStreetsByCmn(idCmn);

            expect(street).to.deep.equal({"name": "Barconcelli", "lunghezza": 10000, "classe": "I"});
        });
    });
});