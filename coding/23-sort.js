// 冒泡排序
// 选择排序
// 快速排序
const quickSort = (arr) => {
  if (arr.length < 1) return arr

  const mid = Math.floor(arr.length / 2)
  const midVal = arr.splice(mid, 1)[0]

  let left = []
  let right = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > midVal) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return [...quickSort(right), midVal, ...quickSort(left)]
}
// 插入排序
const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const temp = arr[i]
    let j = i
    while (j > 0) {
      if (arr[j - 1] > temp) {
        arr[j] = arr[j - 1]
      } else {
        break
      }
      j -= 1
    }
    arr[j] = temp
  }
}
// 归并排序
const mergeSort = (arr) => {
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid, arr.length)

  const orderLeft = rec(left)
  const orderRight = rec(right)

  const res = []

  while (orderLeft.length || orderRight.length) {
    if (orderLeft.length && orderRight.length) {
      res.push(
        orderLeft[0] > orderRight[0] ? orderRight.shift() : orderLeft.shift()
      )
    } else if (orderLeft.length) {
      res.push(orderLeft.shift)
    } else if (orderRight.length) {
      res.push(orderRight.shift)
    }
  }
  return res
}
