console.log('1')

const p1 = new Promise((resolve) => {
  console.log('2')
  resolve('resolve')
  console.log('继续执行')
})

// 产生了一个 微任务
p1.then((result) => {
  console.log('p1 result')
})

// 宏任务
setTimeout(() => {
  console.log('3')
})

console.log('4')

// 1 2 '继续执行' 4 'p1 result' 3
