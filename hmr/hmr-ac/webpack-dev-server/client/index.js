const hotEmitter = require('../../webpack/hot/emitter')
const io = require('socket.io')

const socket = io()

let currentHash

socket.on('hash', (hash) => {
  console.log('客户端收到 hash 消息')
  currentHash = hash
})

socket.on('ok', () => {
  console.log('客户端收到 ok 消息')
  reloadApp()
})

function reloadApp() {
  hotEmitter.emit('webpackHotUpdate', currentHash)
}
