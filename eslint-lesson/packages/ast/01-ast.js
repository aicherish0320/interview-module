const esprima = require('esprima')
const estraverse = require('estraverse')
const escodegen = require('escodegen')

const code = `function a(){}`

// 将代码转换成 ast 语法树
const ast = esprima.parseScript(code)

estraverse.traverse(ast, {
  enter(node) {
    console.log('enter node >>> ', node)
    if (node.type === 'FunctionDeclaration') {
      node.id.name = 'b'
    }
  },
  leave(node) {
    console.log('leave node >>> ', node)
  }
})

const newCode = escodegen.generate(ast)

console.log('newCode >>> ', newCode)
