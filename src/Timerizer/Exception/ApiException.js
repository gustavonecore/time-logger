function ApiException()
{
}

ApiException.prototype.RESOURCE_NOT_FOUND = 1;
ApiException.prototype.COLLECTION_NOT_FOUND = 2;
ApiException.prototype.INTERNAL_ERROR = 3;
ApiException.prototype.AUTHORIZATION = 4;
ApiException.prototype.MISSING_PARAMETER = 5;

ApiException.prototype.code = 500;
ApiException.prototype.statusCode = 0;
ApiException.prototype.message = 'Unknow error';

module.exports = ApiException;