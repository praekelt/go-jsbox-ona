var _ = require('lodash');
var vumigo = require('vumigo_v02');
var submit = require('./submit');
var Eventable = vumigo.events.Eventable;


var Ona = Eventable.extend(function(self, im, opts) {
    opts = _.defaults(opts || {}, {url: 'https://ona.io/api/v1/'});
    self.im = im;
    self.url = opts.url;
    self.submit = _.partial(submit, self);
});


module.exports = Ona;
