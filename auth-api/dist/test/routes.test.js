'use strict'
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = __importDefault(require('mongoose'))
describe('Product CRUD', () => {
  let server
  beforeAll((done) => __awaiter(void 0, void 0, void 0, function * () {
    done()
    server = yield require('../src/index')
  }))
  afterAll((done) => __awaiter(void 0, void 0, void 0, function * () {
    server.close()
    yield mongoose_1.default.connection.close()
    done()
  }))
  test('Add Product POST /product', (done) => __awaiter(void 0, void 0, void 0, function * () {
    server = yield require('../src/index')
    const response = yield server.inject({
      method: 'POST',
      url: '/product',
      payload: {
        _id: '5f2678dff22e1f4a3c0782ee',
        name: 'JBL Headphone',
        category: 'Electronic appliances',
        unit: 1
      }
    })
    expect(response.statusCode).toBe(201)
    done()
  }))
  test('Get All Product /product', (done) => __awaiter(void 0, void 0, void 0, function * () {
    const response = yield server.inject({
      method: 'GET',
      url: '/product'
    })
    expect(response.statusCode).toBe(200)
    done()
  }))
  test('Update Product PUT /product/:id', (done) => __awaiter(void 0, void 0, void 0, function * () {
    const response = yield server.inject({
      method: 'PUT',
      url: '/product/5f2678dff22e1f4a3c0782ee',
      payload: {
        unit: 2
      }
    })
    expect(response.statusCode).toBe(200)
    done()
  }))
  test('Get one Product GET /product/:id', (done) => __awaiter(void 0, void 0, void 0, function * () {
    const response = yield server.inject({
      method: 'GET',
      url: '/product/5f2678dff22e1f4a3c0782ee'
    })
    expect(response.statusCode).toBe(200)
    done()
  }))
  test('Delete one Product DELETE /product/:id', (done) => __awaiter(void 0, void 0, void 0, function * () {
    const response = yield server.inject({
      method: 'DELETE',
      url: '/product/5f2678dff22e1f4a3c0782ee'
    })
    expect(response.statusCode).toBe(200)
    done()
  }))
  test('Health Route', (done) => __awaiter(void 0, void 0, void 0, function * () {
    const response = yield server.inject({
      method: 'GET',
      url: '/health'
    })
    expect(response.statusCode).toBe(200)
    done()
  }))
})
// # sourceMappingURL=routes.test.js.map
