var Q = require('q');
var path = require('path');

var vumigo = require('vumigo_v02');
var JsonApi = vumigo.http.api.JsonApi;

var errors = require('./errors');
var OnaValidationError = errors.OnaValidationError;


function submit(ona, data) {
    var http = new JsonApi(ona.im);
    var url = path.join(ona.url, 'submission');

    return Q(parse)
        .fcall(data)
        .then(function(data) {
            return http.post(url, {
                data: data,
                auth: ona.auth
            });
        });
}


function parse(data) {
    data = data || {};

    if (!('id' in data)) throw new OnaValidationError(
        "Submissions need an 'id' field");

    if (!('submission' in data)) throw new OnaValidationError(
        "Submissions need a 'submission' field");

    return data;
}


module.exports = submit;
