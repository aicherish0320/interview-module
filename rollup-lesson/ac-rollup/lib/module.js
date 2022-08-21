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
