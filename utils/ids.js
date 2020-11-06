const uuid = require('uuid');

function generateId(resourceType) {
	return resourceType+':'+uuid.v4();
}

module.exports = {
    generateId
}