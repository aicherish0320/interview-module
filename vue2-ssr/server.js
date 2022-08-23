const fs = require('fs')
const path = require('path')
const VueServerRenderer = require('vue-server-renderer')
const Koa = require('koa')
const Router = require('@koa/router')
const static = require('koa-static')

const app = new Koa()
const router = new Router()

// const serverBundle = fs.readFileSync('./dist/ssr.bundle.js', 'utf8')
const template = fs.readFileSync('./dist/index.ssr.html', 'utf8')

const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest
})

router.get('/', async (ctx) => {
  ctx.body = await new Promise((resolve) => {
    render.renderToString((_, html) => {
      resolve(html)
    })
  })
})

app.use(router.routes())

app.use(static(path.resolve(__dirname, 'dist')))

app.listen(3001, () => console.log(3001))
