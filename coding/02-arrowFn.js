function fn1() {}
const fn2 = () => {}

// ! 箭头函数和普通函数的区别
// 1. this 问题：箭头函数的 this 在声明的时候确定，而普通函数的 this 是运行的时候确定
// 2. 箭头函数没有 arguments
// 3. 箭头函数不能 new
// 4. 箭头函数不能调用 call、apply
// 5. 箭头函数没有 prototype

// ! 箭头函数为什么不能 new
