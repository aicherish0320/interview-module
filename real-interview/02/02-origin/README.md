# 同源策略

协议 域名 端口

# 为什么浏览器不支持跨域？

cookie localStorage
DOM 元素也有同源策略 iframe
ajax 也不支持跨域

# 为什么还要去实现跨域？

- jsonp
  - 只能发送 get 请求，不支持 post put delete 支持
  - 不安全 xss
- cors
- postMessage 两个页面之间通信
- document.domain
- window.name
- location.hash
- webpack-dev-server http-proxy
- nginx
- websocket
