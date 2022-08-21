const path = require('path')
const fs = require('fs')
const MagicString = require('magic-string')
const Module = require('./module')

class Bundle {
  constructor({entry}) {
    this.entryPath = path.resolve(entry)
    this.modules = {} // 存放着本次打包的所有的模块
  }
  // 编译入口文件 把结果写入到 outputFile
  build(outputFile) {
    // 先获取入口模块的实例
    let entryModule = (this.entryModule = this.fetchModule(this.entryPath))
    // 展开入口模块的实例
    this.statements = entryModule.expandAllStatements()
    const transformedCode = this.generate()
    fs.writeFileSync(outputFile, transformedCode)
  }
  /**
   * 根据模块的决定路径返回模块的实例
   * @param {*} importee 模块的绝对路径
   */
  fetchModule(importee) {
    let route = importee
    if (route) {
      let code = fs.readFileSync(route, 'utf-8')
      const module = new Module({
        code,
        path: route,
        bundle: this
      })
      return module
    }
  }
  generate() {
    // 字符串包
    let transformedCode = new MagicString.Bundle()
    this.statements.forEach((statement) => {
      // 如何向 statement 这个顶级节点添加 _source 属性，值是 magicString 实例
      const content = statement._source.clone()
      transformedCode.addSource({
        content,
        separator: '\n'
      })
    })
    return transformedCode.toString()
  }
}

module.exports = Bundle
