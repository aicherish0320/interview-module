// 1. 准备创建开发服务器
const webpack = require('webpack')
const config = require('./webpack.config')
const Server = require('./webpack-dev-server/lib/Server')

function startDevServer(compiler, config) {
  const devServerArgs = config.devServer || {}
  // 3. 启动 HTTP 服务器，里面还会负责打包我们的项目并提供预览服务，通过它访问打包后的文件
  const server = new Server(compiler, devServerArgs)
  const { port = 8080, host = 'localhost' } = devServerArgs
  server.listen(port, host, (err) => {
    console.log(`project is running at http://${host}:${port}/`)
  })
}
// 2. 创建 compiler 实例
const compiler = webpack(config)
// 3. 启动服务 HTTP 服务器
startDevServer(compiler, config)

module.exports = startDevServer


/*
  热更新的整体流程
  1. 启动一个 HTTP 服务器，会打包我们的项目，并且让我们可以预览我们产出的文件
  2. 还会启动一个 websocket 双向通信服务器，如果有新的模块，发生变更的话，会通过消息的方式
  通知客户端，让客户端拉取最新的代码，并进行客户端的热更新
*/