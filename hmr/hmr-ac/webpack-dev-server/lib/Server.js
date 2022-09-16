const express = require('express')
const http = require('http')

class Server {
  constructor(compiler, devServerArgs) {
    this.compiler = compiler
    this.devServerArgs = devServerArgs
    this.setupApp()
    this.routes()
    this.createServer()
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
