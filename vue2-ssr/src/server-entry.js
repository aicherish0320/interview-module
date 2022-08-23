import createApp from './app'

export default (context) => {
  const { app, router } = createApp()
  return new Promise((resolve, reject) => {
    router.push(context.url)
    router.onReady(() => {
      // 前端没有配置对应的路由 那应该返回的是 Not Found
      const matchComponents = router.getMatchedComponents()
      if(!matchComponents.length) {
        return reject({code: '404'})
      }
      resolve(app)
    }, reject)
  })
}
