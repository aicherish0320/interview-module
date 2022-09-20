const path = require('path')

function updateCompiler(compiler) {
  const options = compiler.options
  // 它就是浏览器 websocket 客户端
  options.entry.main.import.unshift(
    require.resolve('../../client/index.js')
  )
  // 它用来在浏览器监听发射的事件，进行后续的热更新逻辑
  options.entry.main.import.unshift(require.resolve('../../../webpack/hot/dev-server.js'))

  console.log('compiler.entry >>> ', compiler.entry)

  compiler.hooks.entryOption.call(options.context, config.entry)
  

}

module.exports = updateCompiler
