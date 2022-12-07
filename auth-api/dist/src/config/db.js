'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = __importDefault(require('mongoose'))
const host = process.env.MONGO_HOST || 'localhost'
const port = process.env.MONGO_PORT || 27017
const database = process.env.MONGO_DATABASE || 'fastify'
mongoose_1.default.connect(`mongodb://${host}:${port}/${database}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (!err) { console.log(`MongoDB connection successful.${database}`) } else { console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2)) }
})
module.exports = mongoose_1.default
// # sourceMappingURL=db.js.map
