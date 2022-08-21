const acorn = require('acorn')
const walk = require('./walk')

const sourceCode = `import $ from 'jquery'`
// 将源代码转换成语法树
const ast = acorn.parse(sourceCode, {
  locations: true,
  ranges: true,
  sourceType: 'module',
  ecmaVersion: 8
})
// console.log('ast >>> ', ast)

let ident = 0
const padding = () => ' '.repeat(ident)
ast.body.forEach((statement) => {
  debugger
  walk(statement, ast, {
    enter(node, parent) {
      if (node.type) {
        console.log('enter >>> ', padding() + node.type)
        ident += 2
      }
    },
    leave(node, parent) {
      if (node.type) {
        ident -= 2
        console.log('leave >>> ', padding() + node.type)
      }
    }
  })
})

// 遍历的时候采用的是深度优先
