var assert = require('assert');

var OnaFixtures = require('../../src').OnaFixtures;

describe("fixtures.submit", function() {
    describe(".add", function() {
        it("should provide a default response", function() {
            var fixtures = new OnaFixtures();
            fixtures.submit.add();

            assert.deepEqual(
                fixtures.store[0].response.data,
                {reply: 'Successful submission'});
        });

        it("should use 201 as the default response code", function() {
            var fixtures = new OnaFixtures();
            fixtures.submit.add({response: {}});
            assert.equal(fixtures.store[0].response.code, 201);
        });

        it("should use POST as the default method", function() {
            var fixtures = new OnaFixtures();
            fixtures.submit.add({request: {}});
            assert.equal(fixtures.store[0].request.method, 'POST');
        });

        it("should use a default url", function() {
            var fixtures = new OnaFixtures({url: 'foo.io'});
            fixtures.submit.add({request: {}});
            assert.equal(
                fixtures.store[0].request.url,
                'foo.io/submission');
        });

        it("should allow submission data to be given directly", function() {
            var fixtures = new OnaFixtures({url: 'foo.io'});
            fixtures.submit.add({submission: {foo: 'bar'}});

            assert.deepEqual(
                fixtures.store[0].request.data,
                {foo: 'bar'});
        });
    });
});
