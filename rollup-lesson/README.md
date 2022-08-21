# Rollup

`rollup`是下一代 ES 模块捆绑器

## 背景

- webpack 打包非常繁琐，打包体积比较大
- rollup 主要是用来打包 JS 库
- vue/react 都是在用 rollup 作为打包工具

## 打包输出格式

### 源文件

```js
export default 'index.js'
```

### cjs

```js
'use strict'

var index = 'index.js'

module.exports = index
```

### ES

```js
var index = 'index.js'

export { index as default }
```

### iife

```js
var calculate = (function () {
  'use strict'

  var index = 'index.js'

  return index
})()
```

### umd

```js
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      (global.calculate = factory()))
})(this, function () {
  'use strict'

  var index = 'index.js'

  return index
})
```

## Tree-Shaking

- Tree-Shaking 是消除无用的代码
- rollup 只处理函数和顶层的 `import/export` 变量

## 使用第三方模块

- `rollup.js` 编译源码中的模块引用默认只支持 ES6+ 模块的方式 `import/export`

## 打包工具、工程化工具

- webpack 功能最全，但是略显复杂和臃肿，ESM 转换成 CommonJS
- vite 不需要打包，全是原生的 ESM 模块，不需要打包，如果要上线部署，得使用 rollup

## 手写 rollup

acorn -> @babel/parser
estraverse 实现语法的编译和作用域的生成
esprima 转 AST @babel/parser
estraverse 遍历和转换 @babel/traverse
escodegen 代码生成 @babel/generator

## TreeShaking

```js
// 1. 本模块从哪个模块导入了什么变量，叫什么名字
// main.js
import { name as n, age as a } from './msg.js'

this.imports['n'] = { localName: 'n', importName: 'name', source: 'msg.js' }
this.imports['a'] = { localName: 'a', importName: 'age', source: 'msg.js' }
// 2. 本模块导处了什么变量
// msg.js
export const name = 'jack'
export const age = 25
this.exports['name'] = {
  localName: 'name',
  exportName: 'name',
  type: 'ExportNamedDeclaration'
}

// 3. 本语句定义的变量
var type = 'bird'
statement._defines['type'] = true
// 4. 本模块定义了哪些变量
this.definitions['type'] = statement
// 5. 使用到的变量 没有定义，就表示依赖的外部变量
// 如果当前语句中使用到的变量没有在当前模块中定义，我们就认为它是一个外部导入的变量
import { name, age } from './msg.js'
console.log(name)
statement._dependsOn['name'] = true
```

- 如何判断外部变量
  - dependsOn 读取一个变量，但当前模块内没有声明，那它就是外部的
