const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      devServer.app.get('/api/lists', (_, response) => {
        response.json([
          {
            _id: 1,
            url: 'http://localhost:8080/images/kj.jpeg'
          },
          {
            _id: 2,
            url: 'http://localhost:8080/images/lisa1.jpeg'
          },
          {
            _id: 3,
            url: 'http://localhost:8080/images/lisa2.jpeg'
          },
          {
            _id: 4,
            url: 'http://localhost:8080/images/logo.png'
          },
          {
            _id: 5,
            url: 'http://localhost:8080/images/lisa3.jpeg'
          },
          {
            _id: 6,
            url: 'http://localhost:8080/images/lisa4.jpeg'
          },
          {
            _id: 7,
            url: 'http://localhost:8080/images/lisa5.jpeg'
          },
          {
            _id: 8,
            url: 'http://localhost:8080/images/lisa6.jpeg'
          },
          {
            _id: 9,
            url: 'http://localhost:8080/images/lisa7.jpeg'
          },
          {
            _id: 10,
            url: 'http://localhost:8080/images/lisa8.jpeg'
          },
          {
            _id: 11,
            url: 'http://localhost:8080/images/lisa9.jpeg'
          },
          {
            _id: 12,
            url: 'http://localhost:8080/images/lisa10.jpeg'
          },
          {
            _id: 13,
            url: 'http://localhost:8080/images/lisa11.jpeg'
          },
        ])
      })

      return middlewares
    }
  }
})
