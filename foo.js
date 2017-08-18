const validate = require('webpack-validator');
const config = require('./webpack.config')
const webpack = require('webpack')
webpack(config)

var path = require('path');
 module.exports = validate(config)


console.log(path.resolve(__dirname, "../../..", "node_modules"))
