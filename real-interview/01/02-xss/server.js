const path = require('path')
const express = require('express')

const app = express()
app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(3002, () => {
  console.log('3002 port')
})
