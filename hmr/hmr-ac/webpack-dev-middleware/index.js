// webpack 开发中间件
// 1. 真正的监听模式启动 webpack 编译
// 2. 返回一个 express 中间件，用来预览 我们产出的资源文件

const MemoryFileSystem = require('memory-fs')
const memoryFileSystem = new MemoryFileSystem()

const middleware = require('./middleware')

function webpackDevMiddleware(compiler) {
  compiler.watch({}, () => {
    console.log('监听到文件变化')
  })
  // 产出的文件并不是写在硬盘上，为了提高性能，产出的文件是放在内存里，所以你在硬盘上看不见
  const fs = (compiler.outputFileSystem = memoryFileSystem)
  return middleware({
    fs,
    outputPath: outputFileSystem.options.output.path
  })
}

module.exports = webpackDevMiddleware
