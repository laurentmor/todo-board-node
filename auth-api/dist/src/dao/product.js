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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getOneProduct = exports.getAllProducts = void 0
const product_1 = __importDefault(require('../models/product'))
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function * () {
  try {
    return yield product_1.default.find({})
  } catch (err) {
    throw err
  }
})
exports.getAllProducts = getAllProducts
const getOneProduct = (_id) => __awaiter(void 0, void 0, void 0, function * () {
  try {
    return yield product_1.default.findOne({ _id })
  } catch (err) {
    throw err
  }
})
exports.getOneProduct = getOneProduct
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function * () {
  try {
    return yield product_1.default.create(data)
  } catch (err) {
    throw err
  }
})
exports.createProduct = createProduct
const updateProduct = (_id, data) => __awaiter(void 0, void 0, void 0, function * () {
  try {
    return yield product_1.default.updateOne({ _id }, data)
  } catch (err) {
    throw err
  }
})
exports.updateProduct = updateProduct
const deleteProduct = (_id) => __awaiter(void 0, void 0, void 0, function * () {
  try {
    return yield product_1.default.deleteOne({ _id })
  } catch (err) {
    throw err
  }
})
exports.deleteProduct = deleteProduct
// # sourceMappingURL=product.js.map
