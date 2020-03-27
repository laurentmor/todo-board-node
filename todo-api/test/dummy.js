import chai from "chai";

import chaiHttp from "chai-http";

process.env.NODE_ENV = 'test';
const should = chai.should();

describe('dummy', () => {
    let i = 2 + 2;
    it('should equal 4', done => {
        i.should.be.eql(4);
        done();

    })
});