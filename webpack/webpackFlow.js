const { SyncHook } = require('tapable')
const path = require('path')
const fs = require('fs')

class Compiler {
  constructor(options) {
    this.options = options
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook()
    }
  }
  run() {
    let modules = []
    let chunks = []
    let files = []
    this.hooks.run.call()
    let entry = path.join(this.options.context, this.options.entry)
    // 读取模块内容
    const entryContent = fs.readFileSync(entry, 'utf-8')
    let entrySource = babelLoader(entryContent)
    // 模块 module，chunk 代码块,bundle 文件的关系
    let entryModule = {
      id: entry,
      source: entrySource
    }
    modules.push(entryModule)
    // 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 chunk
    const chunk = { name: 'main', modules }
    chunks.push(chunk)
    // 再把每个 chunk 转换成一个单独的文件加入到输出列表
    let file = {
      file: this.options.output.filename,
      source: ``
    }
    files.push(file)

    const outputPath = path.join(
      this.options.output.path,
      this.options.output.filename
    )
    fs.writeFileSync(outputPath, file.source)
    this.hooks.done()
  }
}

// 1. 初始化参数，从配置文件和 shell 语句中读取与合并参数，得出最终的参数
let options = require('./webpack.config.js')
// 2. 开始编译：用上一步得到的参数初始化 Compiler 对象
const compiler = new Compiler(options)
// 3. 加载所有配置的插件，执行对象的 run 方法开始执行编译
if (options.plugins && Array.isArray(options.plugins)) {
  for (const plugin of options.plugins) {
    plugin.apply(compiler)
  }
}
// 4. 确定入口，根据配置中的 entry 找出所有的入口文件
compiler.run()

function babelLoader(source) {
  return `const sum = function(a, b) { return a + b }`
}
