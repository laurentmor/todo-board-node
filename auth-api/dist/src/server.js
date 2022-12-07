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
const pino_1 = __importDefault(require('pino'))
const pino_colada_1 = __importDefault(require('pino-colada'))
const fastify_cors_1 = __importDefault(require('fastify-cors'))
const product_1 = __importDefault(require('./models/product'))
const health_1 = __importDefault(require('../src/routes/health'))
const product_2 = __importDefault(require('../src/routes/product'))
const customController_1 = __importDefault(require('../src/routes/customController'))
const fastify_1 = __importDefault(require('fastify'))
const logger = (0, pino_1.default)({
  prettyPrint: {},
  prettifier: pino_colada_1.default
})
const fastify = (0, fastify_1.default)({ logger: logger })
require('../src/config/db')
const createServer = () => __awaiter(void 0, void 0, void 0, function * () {
  yield fastify.register(fastify_cors_1.default)
  yield fastify.register(health_1.default, { prefix: '/health' })
  yield fastify.register(product_2.default, { prefix: '/product' })
  fastify.register(require('fastify-autocrud'), {
    prefix: '/api/products',
    Collection: product_1.default,
    additionalRoute: customController_1.default
  })
  fastify.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })
  return fastify
})
exports.default = createServer
// # sourceMappingURL=server.js.map
