const express = require('express')

const app = express()

app.use(express.static(__dirname))

app.listen(3002, () => console.log('3002 port'))
