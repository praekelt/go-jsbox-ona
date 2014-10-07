var assert = require('assert');

var vumigo = require('vumigo_v02');
var basic_auth = vumigo.utils.basic_auth;
var make_im = vumigo.test_utils.make_im;

var Ona = require('../src').Ona;
var OnaFixtures = require('../src').OnaFixtures;

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
            data: {foo: 'bar'},
            reply: ':)'
        });

        return ona.submit({foo: 'bar'})
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

        add_fixture({data: {foo: 'bar'}});

        return ona.submit({foo: 'bar'})
            .then(function() {
                var req = api.http.requests[0];
                assert.deepEqual(
                    req.headers.Authorization,
                    [basic_auth('root', 'toor')]);
            });
    });
});
