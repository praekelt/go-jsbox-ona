var assert = require('assert');

var vumigo = require('vumigo_v02');
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
                ona = new Ona(im, {url: 'ona.io'});
                fixtures = new OnaFixtures({url: 'ona.io'});
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
});
