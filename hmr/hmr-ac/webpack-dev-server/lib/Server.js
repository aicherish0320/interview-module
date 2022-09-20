const express = require('express')
const http = require('http')
const updateCompiler = require('./utils/updateCompiler')

class Server {
  constructor(compiler, devServerArgs) {
    this.compiler = compiler
    this.devServerArgs = devServerArgs
    updateCompiler(compiler)
    // 开始启动 webpack 编译
    this.setupHooks()
    this.setupApp()
    this.routes()
    this.createServer()
  }
  setupHooks() {
    // 监听编译成功的事件
    this.compiler.hooks.done.tap('webpack-dev-server', (stats) => {
      console.log('stats >>> ', stats.hash)
      this._stats = stats
    })
  }
  routes() {
    if (this.devServerArgs.static) {
      // 此目录将会成为静态文件根目录
      this.app.use(express.static(this.devServerArgs.static.directory))
    }
  }
  setupApp() {
    // this.app 并不是一个 http 服务，它本身其实只是一个路由中间件
    this.app = express()
  }
  createServer() {
    this.server = http.createServer(this.app)
  }
  listen(port, host, callback) {
    this.server.listen(port, host, callback)
  }
}

module.exports = Server
