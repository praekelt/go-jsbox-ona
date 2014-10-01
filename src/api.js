var _ = require('lodash');
var vumigo = require('vumigo_v02');
var submit = require('./submit');
var Eventable = vumigo.events.Eventable;


var Ona = Eventable.extend(function(self, im) {
    self.submit = _.curry(submit, self);
});


module.exports = Ona;
