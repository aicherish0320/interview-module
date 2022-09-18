const arr = [5, 4, 1, 3, 2]
//! 快速排序
const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr
  }

  const mid = Math.floor(arr.length / 2)
  const midVal = arr.splice(mid, 1)[0]
  let left = []
  let right = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midVal) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }

  return [...quickSort(right), midVal, ...quickSort(left)]
}

console.log('quickSort >>> ', quickSort(arr))
