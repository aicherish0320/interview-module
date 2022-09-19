const express = require('express')

const app = express()

const whiteList = ['http://localhost:3001']

app.use(function (req, res, next) {
  console.log(req.headers)
  const origin = req.headers.origin
  if (whiteList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-headers', 'name')
    res.setHeader('Access-Control-Allow-Methods', 'PUT')
    res.setHeader('Access-Control-Allow-Credentials', true)
  }
  next()
})

app.use(express.static(__dirname))

app.put('/getData', function (req, res) {
  res.end('hello')
})

app.listen(3002, () => console.log('3002 port'))
