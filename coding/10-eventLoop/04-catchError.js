Promise.resolve('success')
  .then((res) => {
    console.log('res >>> ', res)
    throw new Error('then error')
  })
  .then((res) => {
    console.log('res2 >>> ', res)
  })
// .catch((e) => {
//   console.log('e >>> ', e.message)
// })
