var expect  = require("chai").expect;
var request = require("request");

describe("VASP API", function() {

    describe("VASP streets controller", function() {
  
      var url = "http://localhost:3000/street?idCmn=1234";
  
      it("returns status 200", function(done) {
        request(url, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
  
      it("Returns the value", function(done) {
        request(url, function(error, response, body) {
          expect(body).to.deep.equal({"name": "Barconcelli", "lunghezza": 10000, "classe": "I"});
          done();
        });
      });
  
    });
  
  });