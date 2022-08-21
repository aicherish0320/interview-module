const MagicString = require('magic-string')
const { parse } = require('acorn')

const analyze = require('./ast/analyze')

class Module {
  constructor({ code, path, bundle }) {
    this.code = new MagicString(code, {
      filename: path
    })
    this.path = path
    this.bundle = bundle

    this.ast = parse(code, {
      ecmaVersion: 8,
      sourceType: 'module'
    })
    this.imports = {}
    this.exports = {}
    this.analyze()
  }
  analyze() {
    // 1. 给 import 和 export 赋值
    this.ast.body.forEach((statement) => {
      // import { age } from './msg.js'
      if (statement.type === 'ImportDeclaration') {
        let source = statement.source.value // ./msg
        statement.specifiers.forEach((specifier) => {
          let importName = specifier.imported.name // age
          let localName = specifier.local.name // age
          // 记录一个当前的这个引入的变量是从哪个模块哪个变量引入进来的
          this.imports[localName] = { localName, source, importName }
        })
        // export const age = 25
      } else if (statement.type === 'ExportNamedDeclaration') {
        let declaration = statement.declaration
        if (declaration === 'VariableDeclaration') {
          const declarations = declaration.declarations
          declarations.forEach((variableDeclarator) => {
            let localName = variableDeclarator.id.name
            // this.exports.age = { localName: 'age', exportName: 'age', expression: '' }
            this.exports[localName] = {
              localName,
              exportName: localName,
              expression: declaration
            }
          })
        }
      }
    })

    analyze(this.ast, this.code, this)
  }
  expandAllStatements() {
    let allStatements = []
    this.ast.body.forEach((statement) => {
      allStatements.push(statement)
    })
    return allStatements
  }
}

module.exports = Module
