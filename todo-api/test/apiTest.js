import chaiHttp from 'chai-http'
import chai from 'chai'
import app from '../src/'
import router from '../src/routes/todos'
// import(request());
const { expect } = chai
chai.use(chaiHttp)
/**
 *
 */
describe('Test TODO API endpoints', () => {
  before(() => {
    app.use('/todo', router)
  })
  describe('Get base route', () => {
    it('should return hello world with a 200 status code ', (done) => {
      // connectToDB();
      chai.request(app).get('/')
        .end((err, res) => {
          if (err) done(err)
          expect(res).to.have.status(200)
          expect(res.body).to.equal('Hello World!')
          expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')

          // expect(res.body).to.be.json;
          done()
        })
    })
  })
  describe('Get todo  base route', () => {
    it('should return  a 403 status code ', (done) => {
      // connectToDB();
      chai.request(app).get('/todo/')
        .end((err, res) => {
          if (err) done(err)
          expect(res).to.have.status(403)
          expect(res.body).to.equal('You\'re not getting anywhere, boyo with this api')
          expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')

          done()
        })
    })
  })

  describe('Get todo/all   route', () => {
    it('should return  a 200 status code ', (done) => {
      // connectToDB();
      chai.request(app).get('/todo/all')
        .end((err, res) => {
          if (err) done(err)
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array').of.length(13)
          expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')

          done()
        })
    })
  })

  describe('Post todo/create   route', () => {
    it('should return  a 500 status code ', (done) => {
      // connectToDB();
      chai.request(app).post('/todo/create')
        .end((err, res) => {
          if (err) done(err)
          expect(res).to.have.status(500)
          // expect(res.body).to.be.an('array').of.length(13);
          // expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');

          done()
        })
    })
  })
})
