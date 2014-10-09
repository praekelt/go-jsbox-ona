var assert = require('assert');

var vumigo = require('vumigo_v02');
var basic_auth = vumigo.utils.basic_auth;
var make_im = vumigo.test_utils.make_im;
var fail = vumigo.test_utils.fail;

var ona = require('../src');
var Ona = ona.Ona;
var OnaFixtures = ona.OnaFixtures;
var OnaValidationError = ona.OnaValidationError;

describe("ona.submit", function() {
    var im;
    var api;
    var ona;
    var fixtures;

    beforeEach(function() {
        return make_im()
            .then(function(new_im) {
                im = new_im;
                api = im.api;
                ona = new Ona(im);
                fixtures = new OnaFixtures();
            });
    });

    function add_fixture(fixture) {
        im.api.http.fixtures.add(fixtures.submit.add(fixture));
    }

    it("should make a submission", function() {
        add_fixture({
            data: {
                id: 1,
                submission: {foo: 'bar'}
            },
            reply: ':)'
        });

        return ona.submit({
                id: 1,
                submission: {foo: 'bar'}
            })
            .then(function(resp) {
                assert.equal(resp.data.reply, ':)');
            });
    });

    it("should authenticate the requests", function() {
        var ona = new Ona(im, {
            auth: {
                username: 'root',
                password: 'toor'
            }
        });

        add_fixture({
            data: {
                id: 1,
                submission: {foo: 'bar'}
            }
        });

        return ona.submit({
                id: 1,
                submission: {foo: 'bar'}
            })
            .then(function() {
                var req = api.http.requests[0];
                assert.deepEqual(
                    req.headers.Authorization,
                    [basic_auth('root', 'toor')]);
            });
    });

    it("should throw an error if no 'id' field is given", function() {
        return ona.submit({submission: {foo: 'bar'}})
            .then(fail, function(e) {
                assert(e instanceof OnaValidationError);
                assert.equal(
                    e.message,
                    "Submissions need an 'id' field");
            });
    });

    it("should throw an error if no 'submission' field is given", function() {
        return ona.submit({id: 1})
            .then(fail, function(e) {
                assert(e instanceof OnaValidationError);
                assert.equal(
                    e.message,
                    "Submissions need a 'submission' field");
            });
    });

    it("should join urls correctly", function() {
        add_fixture({
            data: {
                id: 1,
                submission: {foo: 'bar'}
            }
        });

        return ona.submit({
                id: 1,
                submission: {foo: 'bar'}
            })
            .then(function() {
                    var req = api.http.requests[0];
                    assert.equal(req.url, "https://ona.io/api/v1/submission");
                });
            });
});
