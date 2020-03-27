const app=require("../src/index");
var request=require("supertest");
beforeAll(function (done)  {
    // do something before anything else runs
    console.log('Jest starting!');
});
// close the server after each test
afterAll(function() {
    //app.stop();
    console.log('server closed!');
});

describe('basic route tests', function() {
    test('get home route  GET /', function()  {
        var response =  request(app).get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Hello World!');
    });
});

describe('dog tests', function()  {
    test('get all dogs  GET /dogs', function ()  {
        var response = request(app).get('/dogs');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('affenpinscher');
    });
});