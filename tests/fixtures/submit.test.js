var assert = require('assert');

var OnaFixtures = require('../../src').OnaFixtures;

describe("new OnaFixtures", function() {

});

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
            var fixtures = new OnaFixtures({url: 'http://foo.io'});
            fixtures.submit.add({request: {}});
            assert.equal(
                fixtures.store[0].request.url, 'http://foo.io/submission');
        });

        it("should allow submission data to be given directly", function() {
            var fixtures = new OnaFixtures({url: 'foo.io'});
            fixtures.submit.add({data: {foo: 'bar'}});
            assert.deepEqual(fixtures.store[0].request.data, {foo: 'bar'});
        });

        it("should return the fixture", function() {
            var fixtures = new OnaFixtures();
            assert.deepEqual([fixtures.submit.add()], fixtures.store);
        });

        it("should join urls correctly", function() {
            var fixtures = new OnaFixtures();
            fixtures.submit.add();
            assert.equal(
                fixtures.store[0].request.url,
                "https://ona.io/api/v1/submission");
        });
    });

    describe(".add_error", function() {
        var fixture;
        var fixtures;
        beforeEach(function() {
            fixtures = new OnaFixtures();
            fixture = fixtures.submit.add_error({
                code: 403,
                reason: ':('
            });
        });

        it("should add an error response", function() {
            var response = fixtures.store[0].response ;
            assert.equal(response.code, 403);
            assert.deepEqual(response.data, {reason: ':('});
        });

        it("should return the fixture", function() {
            assert.deepEqual([fixture], fixtures.store);
        });
    });
});
