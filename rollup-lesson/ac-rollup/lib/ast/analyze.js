const Scope = require('./scope')
const walk = require('./walk')

function analyze(ast, magicStringOfAst, module) {
  // 在遍历之前先创建作用域对象
  let scope = new Scope()
  ast.body.forEach((statement) => {
    function addToScope(name) {
      // let name = variableDeclarator.id.name
      scope.add(name)

      if (!scope.parent) {
        // 如果此作用域，没有父作用域，那就是顶级变量，根作用域下的变量
        // 模块内的顶级变量
        statement._defines[name] = true
      }
    }

    Object.defineProperties(statement, {
      _defines: { value: {} }, // 当前 statement 语法树节点保存了哪些变量 声明了哪些变量
      _dependsOn: { value: {} }, // 当前 statement 语句外部依赖的变量
      _included: { value: false, writable: true }, // 当前的语句是否防止在结果中，是否会出现在打包结果中
      // key 是 _source，值是这个语法树节点在源码中的源代码
      _source: {
        value: magicStringOfAst.snip(statement.start, statement.end)
      }
    })
    // 如何知道某个变量没有在当前模块内定义呢？
    // 原理是：扫描整个模块，找到所有的定义的变量
    // 构建作用域链
    walk(statement, ast.body, {
      enter(node) {
        let newScope
        switch (node.type) {
          case 'FunctionDeclaration':
            // 函数的参数 将会成为此函数作用域内的局部变量
            const names = node.params.map((param) => param.name)
            // 把 node 这个变量，添加到当前作用域内
            addToScope(node.id.name)
            // 如果遇到函数声明，就会产生一个新的作用域
            newScope = new Scope({
              parent: scope,
              params: names
            })
            break
          case 'VariableDeclaration':
            node.declarations.forEach((declaration) =>
              addToScope(declaration.id.name)
            )
            break
          default:
            break
        }
        // 如果创建了新的作用域，那么这个作用域将会成为的新的当前作用域
        if (newScope) {
          Object.defineProperty(node, '_scope', { value: newScope })
          // 这个函数作用域
          scope = newScope
        }
      },
      leave(node) {
        if (Object.hasOwnProperty(node, '_scope')) {
          scope = scope.parent
        }
      }
    })
  })
}
module.exports = analyze
