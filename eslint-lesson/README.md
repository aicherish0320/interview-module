# 抽象语法树 (Abstract Syntax Tree)

- 抽象语法树，是源代码语法结构的一种抽象表示
- 它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构

## 抽象语法树用途

- 代码语法检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等
- 优化变更代码、改变代码结构使达到想要的结构

## JavaScript Parser

- `JavaScript Parser` 是把 JavaScript 源码转化为抽象语法树的解析器

## 代码转换

- 将代码转换成 ast 语法树
- 深度优先遍历、遍历 ast 抽象语法树用途
- 代码生成

## ESLint 使用

ESLint 是一个开源的工具 cli，ESLint 采用静态分析找到并修复 JavaScript 代码中的问题

- ESLint 使用 espree 进行 JavaScript 解析
- ESLint 使用 AST 来评估代码中的模式
- ESLint 是完全可插拔的，每一条规则都是一个插件，你可以运行时添加更多
- 解析器
  - esprima 经典的解析器
  - acorn
  - @babel/parser 基于 acorn 的
  - espress 最初从 Esprima 中 fork 出来的，现在给予 acorn
