const hotEmitter = require('../../webpack/hot/emitter')

hotEmitter.on('webpackHotUpdate', (currentHash) => {
  console.log('currentHash: ', currentHash)
})
