var vumigo = require('vumigo_v02');
var BaseError = vumigo.utils.BaseError;


var OnaValidationError = BaseError.extend(function(self, message) {
    /**class:OnaValidationError
    Thrown for invalid api requests.

    :param String message:
        The error for the validation error.
    */
    self.message = message;
});


exports.OnaValidationError = OnaValidationError;
