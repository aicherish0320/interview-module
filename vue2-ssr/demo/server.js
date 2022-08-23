const Vue = require('vue')
const server = require('express')()

const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
  const app = new Vue({
    data() {
      return {
        url: req.url
      }
    },
    template: `<div> visit URL is: {{ url }} </div>`
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
    }
    res.end(html)
  })
})

server.listen(3301, () => console.log(3301))
