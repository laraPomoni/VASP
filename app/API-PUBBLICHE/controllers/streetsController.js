const express = require('express');

function getById(cmnId){
    return {"name": "Barconcelli", "lunghezza": 10000, "classe": "I"};
}

function getAll(){
    return {"name": "Barconcelli", "lunghezza": 10000, "classe": "I"};
}
module.exports = {
    getById,
    getAll
}
