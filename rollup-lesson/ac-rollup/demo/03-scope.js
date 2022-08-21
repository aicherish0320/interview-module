// 作用域 如果不考虑块级作用域的话，作用域只有全局和函数

const Scope = require('./Scope')

/**
 作用域链式由当前的执行环境和上层执行环境的一系列变量组成的
 它保存了当前执行环境对符合访问权限的变量和函数的有序访问
 */

const globalScope = new Scope({
  name: '全局作用域',
  params: ['a'],
  parent: null
})
const oneScope = new Scope({
  name: 'one 作用域',
  params: ['b'],
  parent: globalScope
})
const twoScope = new Scope({
  name: 'two 作用域',
  params: ['c'],
  parent: oneScope
})

console.log(twoScope.findDefiningScope('a'))
