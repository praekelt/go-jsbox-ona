var _ = require('lodash');
var path = require('path');
var submit = exports;


submit.add = function(fixtures, fixture) {
    fixture = fixture || {};

    fixture = _.defaults(fixture, {
        request: {data: fixture.submission || {}},
        response: {data: {reply: fixture.reply || 'Successful submission'}}
    });

    _.defaults(fixture.response, {code: 201});

    _.defaults(fixture.request, {
        method: 'POST',
        url: path.join(fixtures.url, 'submission'),
    });

    fixtures.store.push(fixture);
};
