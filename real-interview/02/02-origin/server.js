const express = require('express')

const app = express()

app.get('/say', function (req, res) {
  const { cb } = req.query
  res.end(`${cb}('hello')`)
})

app.listen(3000, () => {
  console.log('3000 port')
})
