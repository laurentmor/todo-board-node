process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

describe('dummy', function () {
    var i = 2 + 2;
    it('should equal 4', function (done) {
        i.should.be.eql(4);
        done();
    })
});