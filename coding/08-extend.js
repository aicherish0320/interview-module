// ! js 继承

function Parent() {
  this.type = 'parent'
}
Parent.prototype.eat = function () {
  console.log('eat')
}

// function Child(name) {
//   this.name = name
//   this.color = 'green'
// }

// ! 原型继承
// 缺点：所有子类共享原型，改变一个其他也会改变

// Child.prototype = new Parent()

// const c = new Child('jack')
// console.log(c.type)
// c.eat()
// console.log(c.name);

// ! 构造函数继承
// 缺点：不能继承父类原型，函数在构造函数中，每个子类实例不能共享函数

// function Child(name) {
//   Parent.call(this)

//   this.name = name
//   this.color = 'green'
// }

// const c = new Child('jack')
// console.log(c.type)
// // c.eat() // error
// console.log(c.name)

// ! 组合继承
// 缺点：父亲原型和子类原型是同一个原型，无法区分子类是谁构造的

// function Child(name) {
//   Parent.call(this)

//   this.name = name
//   this.color = 'green'
// }

// Child.prototype = Parent.prototype

// const c = new Child('jack')
// console.log(c.type)
// c.eat()
// console.log(c.name)

// ! 寄生组合式继承

function Child(name) {
  Parent.call(this)

  this.name = name
  this.color = 'green'
}

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child
  }
})
