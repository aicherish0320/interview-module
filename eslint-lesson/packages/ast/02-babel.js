// es6 -> es5
// 将箭头函数 转换成 普通函数
// @babel/core（可以放入对应的 babel 插件，默认在转化的时候可以调用这些插件）
const babel = require('@babel/core')
const types = require('@babel/types')
// const transformFunction = require('babel-plugin-transform-es2015-arrow-functions')
const transformFunction = {
  visitor: {
    ArrowFunctionExpression(path) {
      const { node } = path
      node.type = 'FunctionExpression'

      hoistFunctionEvn(path)

      const body = node.body

      if (!types.isBlockStatement(body)) {
        node.body = types.blockStatement([types.returnStatement(body)])
      }
    }
  }
}
function getThisPath(path) {
  let arr = []
  path.traverse({
    ThisExpression(p) {
      arr.push(p)
    }
  })
  return arr
}
function hoistFunctionEvn(path) {
  // 查找父作用域
  const thisEnv = path.findParent(
    (parent) =>
      (parent.isFunction() && !parent.isArrowFunctionExpression()) ||
      parent.isProgram()
  )
  const bindingThis = '_this'
  const thisPaths = getThisPath(path)

  thisPaths.forEach((path) => {
    path.replaceWith(types.identifier(bindingThis))
  })

  thisEnv.scope.push({
    id: types.identifier(bindingThis),
    init: types.thisExpression()
  })
}

const code = `function a () { const sum = () => console.log(this) }`

const result = babel.transform(code, {
  plugins: [transformFunction]
})

console.log(result.code)
