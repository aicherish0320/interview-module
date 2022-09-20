const { SyncHook } = require('tapable')

const hook = new SyncHook()

hook.tap('some name', () => {
  console.log('some name')
})

hook.call()
