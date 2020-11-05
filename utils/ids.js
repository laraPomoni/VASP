const uuidv4 = require('uuid');

function generateId(resourceType) {
	return resourceType+':'+uuidv4();
}

module.exports = {
    generateId
}