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
