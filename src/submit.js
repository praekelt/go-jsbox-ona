var path = require('path');

var vumigo = require('vumigo_v02');
var JsonApi = vumigo.http.api.JsonApi;


function submit(ona, data) {
    var http = new JsonApi(ona.im);
    var url = path.join(ona.url, 'submission');
    return http.post(url, {
        data: parse(data),
        auth: ona.auth
    });
}


function parse(data) {
    // TODO do validation here maybe?
    return data;
}


module.exports = submit;
