const WebSocket = require('ws')

const wss = new WebSocket.Server({
  port: '3000'
})

wss.on('connection', function (ws) {
  ws.on('message', function (data) {
    console.log(data.toString())
    ws.send('word')
  })
})
