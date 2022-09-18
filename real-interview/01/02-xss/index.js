// xss (cross script )
// csrf (cross side request forgery)
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const svgCaptcha = require('svg-captcha')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.static(path.resolve(__dirname)))

const userList = [
  {
    username: 'jack',
    password: '123',
    money: 10000
  },
  {
    username: 'tom',
    password: '123',
    money: 10
  }
]
const SESSION_ID = 'connect.sid'
const session = {}

app.post('/api/login', function (req, res) {
  const { username, password } = req.body
  const user = userList.find(
    (user) => user.username === username && user.password === password
  )
  if (user) {
    const cardId = Math.random() + Date.now()
    session[cardId] = user
    res.cookie(SESSION_ID, cardId, {
      httpOnly: true // 不让客户端取 cookie
    })
    res.json({
      code: 0
    })
  } else {
    res.json({
      code: 1,
      error: '用户不存在'
    })
  }
})

// 反射型
// 诱导用户自己点开（一次性的）
// http://localhost:3001/welcome?type=<script>alert(1)</script>
app.get('/welcome', function (req, res) {
  res.send(`${encodeURIComponent(req.query.type)}`)
  // res.send(`${req.query.type}`)
})

const comments = [
  {
    username: 'jack',
    content: '大家好'
  },
  {
    username: 'tom',
    content: 'hello everybody'
  }
]

app.get('/api/list', function (req, res) {
  res.json({ code: 0, comments })
})

// 存储型
app.post('/api/addCommon', function (req, res) {
  const user = session[req.cookies[SESSION_ID]] || {}
  if (user) {
    comments.push({
      username: user.username,
      content: req.body.content
    })
    res.json({ code: 0 })
  } else {
    res.json({
      code: 1,
      error: '用户未登录'
    })
  }
})

app.get('/api/userInfo', function (req, res) {
  const user = session[req.cookies[SESSION_ID]]
  const { data, text } = svgCaptcha.create()
  // 下次请求时，应该拿到返回的结果和上次存好的结果做对比
  user.text = text
  if (user) {
    res.json({ code: 0, user, svg: data })
  } else {
    res.json({
      code: 1,
      error: '用户未登录'
    })
  }
})

app.post('/api/transfer', function (req, res) {
  // 通过 refer （不靠谱，可以通过 node 自己发送请求来实现伪造）
  // const refer = req.headers['referer'] || ''
  // if (refer !== 'http://localhost:3001') {
  //   return
  // }

  const user = session[req.cookies[SESSION_ID]]
  console.log('req.body >>> ', req.body, user)

  if (user) {
    let { target, money, code } = req.body
    // 有验证码 并且验证码正确
    if (code && code === user.text) {
      money = Number(money)
      userList.forEach((u) => {
        if (u.username === user.username) {
          u.money -= money
        }
        if (u.username === target) {
          u.money += money
        }
      })
      res.json({
        code: 0
      })
    } else {
      res.json({
        code: 1,
        error: '骗子'
      })
    }
  } else {
    res.json({
      code: 1,
      error: '用户未登录'
    })
  }
})

app.listen(3001, () => {
  console.log('3001 port')
})
