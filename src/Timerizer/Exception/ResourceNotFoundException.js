function ResourceNotFoundException(resource){
	this.code = 404;
	this.statucCode = this.RESOURCE_NOT_FOUND;
	this.message = resource + " it's not a valid resource";
}

require('util').inherits(ResourceNotFoundException, require("./ApiException"));

module.exports = ResourceNotFoundException;