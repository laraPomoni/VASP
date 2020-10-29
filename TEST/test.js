var expect    = require("chai").expect;
var streetsController = require("../app/API-PUBBLICHE/controllers/streetsController.js");

describe("VASP API", function(){
    describe("VASP streets controller", function() {
        it("Controlla se quella strada esiste", function() {
            var idCmn = "cmn:12345";
            var street = streetsController.getStreetsByCmn(idCmn);

            expect(street).to.deep.equal({"name": "Barconcelli", "lunghezza": 10000, "classe": "I"});
        });
    });
});