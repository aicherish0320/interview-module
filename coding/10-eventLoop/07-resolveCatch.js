const p = new Promise((resolve, reject) => {
  resolve('hello')
  throw new Error('error')
})

p.then((res) => {
  console.log('res >>> ', res)
}).catch((e) => {
  console.log('e >>> ', e)
})
