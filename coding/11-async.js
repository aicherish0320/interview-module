console.log(1)

setTimeout(() => {
  console.log(2)
}, 0)

setTimeout(() => {
  console.log(3)
}, 0)

Promise.resolve()
  .then(function () {
    console.log(4)
  })
  .then(function () {
    console.log(5)
  })

// async function foo() {
//   await bar()
//   console.log(6)
// }
// foo()

// function bar() {
//   console.log(7)
// }

console.log(8)

// 1 8 4 5 2 3
