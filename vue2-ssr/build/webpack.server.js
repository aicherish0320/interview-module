const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const merge = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
  mode: 'development',
  entry: {
    ssr: path.resolve(__dirname, '../src/server-entry.js')
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      filename: 'index.ssr.html',
      minify: false,
      excludeChunks: ['ssr']
    }),
    new VueSSRServerPlugin()
  ]
})
