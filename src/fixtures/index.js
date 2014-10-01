var _ = require('lodash');
var vumigo = require('vumigo_v02');
var submit = require('./submit');
var Extendable = vumigo.utils.Extendable;


var OnaFixtures = Extendable.extend(function(self, opts) {
    opts = _.defaults(opts || {}, {url: 'https://ona.io/api/v1/'});

    self.store = [];
    self.url = opts.url;
    self.submit = _.mapValues(submit, bind);

    function bind(fn) {
        return fn.bind(self, self);
    }
});


module.exports = OnaFixtures;
