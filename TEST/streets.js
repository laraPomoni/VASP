var expect    = require("chai").expect;
var streetsController = require("./API-PUBBLICHE/controller/streetsController.js");

describe("VASP streets controller", function() {
    describe("Ritorna tutte le strade", function() {
        var streets = streetsController.getStreetsByCmn(idCmn);
  
        expect(streets).to.equal({"name": "Barconcelli", "lunghezza": 10000, "classe": "I"});
        expect(streets).to.equal({"name": "Premaniga", "lunghezza": 5000, "classe": "I"});
        expect(streets).to.equal({"name": "Forni", "lunghezza": 5500, "classe": "I"});
    });
});