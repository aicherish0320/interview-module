// ! new 到底做了哪些事情
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`
}

const p1 = new Person('kong', 'aic')

console.log(p1)
// 打印出的东西
// 1. 两个属性，firstName 和 lastName
// 2. 原型上有一个 getFullName 方法和一个构造器

// ! 得出：new 到底做了什么
// 1. 创建一个新的对象
// 2. 添加父类的属性到新的对象上并初始化
// 3. 继承父类原型上的方法
// 4. 返回新对象（注意：如果执行结果有返回值并且是一个对象，返回执行的结果，否则，返回新创建的对象）

function _new(obj, ...rest) {
  // 基于 obj 的原型创建一个新的对象
  const newObj = Object.create(obj.prototype)
  // 添加属性到新创建的 newObj 上，并获取 obj 函数执行的结果
  const ret = obj.apply(newObj, rest)
  // 如果执行结果有返回值并且是一个对象，返回执行的结果，否则，返回新创建的对象
  return typeof ret === 'object' ? ret : newObj
}

const p2 = _new(Person, 'kong', 'aic')
console.log(p2)
