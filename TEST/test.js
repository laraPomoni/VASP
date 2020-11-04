var expect    = require("chai").expect;
const config = require('config');
var main = require('../main.js');
describe("VASP API", function(){

    describe(`[Couchbase VASP] Opening connection with couchbase on ${config.get('couchbase_vasp.connectionString')}`, function(){
        it("[Couchbase VASP] Controllo che la connessione sia aperta correttamente", function(){
            //connessione al bucket di couchbase
            process.on('couchbase_vasp_connected', function(){
                expect(main.startServer()).to.be.true;
            });
        })
    })

    //import streets tests
    //require('./controllers/streets.js');
    

    describe(`[Couchbase VASP] Closing the connection with couchbase on ${config.get('couchbase_vasp.connectionString')}`, function(){
        it("[Couchbase VASP] Chiusura dei processi", function(){
            // process.on('SIGINT', main.gracefulStop())
            // if(true){
            //     expect(true).to.be.true;
            // }else{
            //     this.skip;
            // } // alla chiusura del processo

            // if(process.on('SIGTERM', main.gracefulStop())){
            //     expect(true).to.be.true;
            // }else{
            //     this.skip;
            // }
            this.skip;
        })
    })
});