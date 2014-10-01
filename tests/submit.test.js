var assert = require('assert');

var vumigo = require('vumigo_v02');
var make_im = vumigo.test_utils.make_im;

var Ona = require('../src').Ona;

describe("ona.submit", function() {
    var im;

    beforeEach(function() {
        return make_im()
            .then(function(new_im) {
                im = new_im;
            });
    });

    it("should exist", function() {
        assert(typeof (new Ona(im)).submit != 'undefined');
    });
});
