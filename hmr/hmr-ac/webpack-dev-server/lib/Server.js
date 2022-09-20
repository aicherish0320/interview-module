const express = require('express')
const http = require('http')
const updateCompiler = require('./utils/updateCompiler')
const webpackDevMiddleware = require('../../webpack-dev-middleware')
const WebsocketServer = require('socket.io')

class Server {
  constructor(compiler, devServerArgs) {
    this.sockets = []
    this.compiler = compiler
    this.devServerArgs = devServerArgs
    updateCompiler(compiler)
    // 开始启动 webpack 编译
    this.setupHooks()
    this.setupApp()
    this.routes()
    this.setupDevMiddleware()
    this.createServer()
    this.createSocketServer()
  }
  createSocketServer() {
    const webpackSocketServer = WebsocketServer(this.server)
    // 监听客户端连接
    webpackSocketServer.on('connection', (socket) => {
      console.log('一个新的 webpackSocket 客户端已经链接上来了')
      // 把新的客户端添加到数组里，为了以后编译成功之后广播做准备
      this.sockets.push(socket)
      // 监听客户端断开事件
      socket.on('disconnect', () => {
        const index = this.sockets.indexOf(socket)
        this.sockets.splice(index, 1)
      })
      // 如果以前编译过了，就把上一次的 hash 值发给客户端
      if (this._stats) {
        socket.emit('hash', this._stats.hash)
        socket.emit('ok')
      }
    })
  }
  setupDevMiddleware() {
    this.middleware = webpackDevMiddleware(this.compiler)
    this.app.use(this.middleware)
  }
  setupHooks() {
    // 监听编译成功的事件
    // 当 webpack 完成一次完整的编译之后，会触发的 done 这个钩子的回调函数执行
    // 编译成功后的成果描述（modules,chunks,files,assets,entries）会放在 stats 里
    this.compiler.hooks.done.tap('webpack-dev-server', (stats) => {
      console.log('stats >>> ', stats.hash)

      this.sockets.forEach((socket) => {
        socket.emit('hash', stats.hash)
        socket.emi('ok')
      })

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
