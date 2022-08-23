// 创建一个 Vue 实例
const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// 创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

// 将 Vue 实例渲染为 Html
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log('html >>> ', html)
})
