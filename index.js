if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dist/svg-barcode.js')
} else {
  module.exports = require('./dist/svg-barcode.common.js')
}
