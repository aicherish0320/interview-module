//! es6 数组操作的方法

// const arr = [1, 2, 3, 4, 5]

// forEach some every reduce map filter
// Array.from  includes find findIndex

// console.log(arr.reduce((acc, cur) => acc + cur, 0))
// console.log(arr.some((arr) => arr % 2 === 0))
// console.log(arr.every((arr) => arr % 2 === 0))

// ! 数组去重复
// const arr = [1, 1, 2, 2, 3, 4, 5]
// console.log(new Set(arr))

//* 双循环
// function unique(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] === arr[j]) {
//         arr.splice(j, 1)
//         j--
//       }
//     }
//   }
// }

// unique(arr)
// console.log(arr)
//* 利用 indexOf 去重
// function unique(arr) {
//   const ret = []
//   for (let i = 0; i < arr.length; i++) {
//     if (ret.indexOf(arr[i]) === -1) {
//       ret.push(arr[i])
//     }
//   }
//   return ret
// }

// * 利用 includes
// function unique(arr) {
//   const ret = []
//   for (let i = 0; i < arr.length; i++) {
//     if (!ret.includes(arr[i])) {
//       ret.push(arr[i])
//     }
//   }
//   return ret
// }

// * 利用 filter
// function unique(arr) {
//   return arr.filter((item, index) => arr.indexOf(item, 0) === index)
// }

// * 利用 reduce + includes
// function unique(arr) {
//   return arr.reduce(
//     (prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]),
//     []
//   )
// }

// console.log(unique(arr))

// ! 数组去平铺
const arr = [1, [2, [3], 4, 5], [9]]

//* flat
//  console.log(arr.flat(Infinity))

// * 递归
// function flat(arr) {
//   if (!Array.isArray(arr)) return false
//   let ret = []

//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       ret = ret.concat(flat(arr[i]))
//     } else {
//       ret.push(arr[i])
//     }
//   }

//   return ret
// }

// * 扩展运算符
// function flat(arr) {
//   if (!Array.isArray(arr)) return false
//   let ret = []

//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       ret.push(...flat(arr[i]))
//     } else {
//       ret.push(arr[i])
//     }
//   }

//   return ret
// }

// * reduce
// function flat(arr) {
//   if (!Array.isArray(arr)) return false
//   let ret = []

//   ret = arr.reduce(
//     (prev, cur) => prev.concat(Array.isArray(cur) ? flat(cur) : cur),
//     []
//   )

//   return ret
// }

// * toString + split

// function flat(arr) {
//   if (!Array.isArray(arr)) return false
//   let ret = []

//   ret = arr
//     .toString()
//     .split(',')
//     .map((val) => parseInt(val))

//   return ret
// }

// * flat 函数实现
function flat(arr, num = 1) {
  return num > 0
    ? arr.reduce(
        (pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur),
        []
      )
    : arr.slice()
}

console.log(flat(arr))
