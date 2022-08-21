function analyze(ast, magicStringOfAst, module) {
  ast.body.forEach((statement) => {
    Object.defineProperties(statement, {
      // key 是 _source，值是这个语法树节点在源码中的源代码
      _source: {
        value: magicStringOfAst.snip(statement.start, statement.end)
      }
    })
  })
}
module.exports = analyze
