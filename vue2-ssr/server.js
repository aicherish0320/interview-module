const fs = require('fs')
const path = require('path')
const VueServerRenderer = require('vue-server-renderer')
const Koa = require('koa')
const Vue = require('vue')
const Router = require('@koa/router')
const static = require('koa-static')

const app = new Koa()
const router = new Router()

app.use(static(path.resolve(__dirname, 'dist')))

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
    render.renderToString({ url: ctx.url }, (_, html) => {
      resolve(html)
    })
  })
})

// For Test
const vm = new Vue({
  template: `
    <button @click="add">Add{{ count }}</button>
  `,
  data() {
    return {
      count: 1
    }
  },
  methods: {
    add() {
      this.count++
    }
  },
})
const renderTest = VueServerRenderer.createRenderer()
router.get('/test/render', async ctx => {
  ctx.body = await renderTest.renderToString(vm)
})
// For Test

router.get('(.*)', async (ctx) => {
  ctx.body = await new Promise((resolve) => {
    render.renderToString({ url: ctx.url }, (error, html) => {
      if (error && error.code === '404') {
        return resolve('Page Not Found')
      } else {
        return resolve(html)
      }
    })
  })
})

app.use(router.routes())

app.listen(3001, () => console.log(3001))
