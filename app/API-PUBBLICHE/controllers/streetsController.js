const express = require('express');

function getStreetsByCmn(cmnId){
    return {"name": "Barconcelli", "lunghezza": 10000, "classe": "I"};
}

module.exports = {
    getStreetsByCmn,
}
