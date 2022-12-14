const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: '8080',
    static: {
      directory: path.resolve(__dirname, 'static')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
    // new HotModuleReplacementPlugin()
  ]
}
