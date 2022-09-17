# Vue 面试题

## Vue 项目性能优化

### Vue 代码层面的优化

- `v-if` 和 `v-show` 区分使用场景
- `computed` 和 `watch` 区分使用场景
- `v-for` 遍历必须为 item 添加 key，且避免同时使用 `v-if`
- 长列表性能优化
- 事件的销毁
- 图片资源懒加载
- 路由懒加载
- 第三方插件的按需引入
- 优化无线列表性能
- 服务端渲染 SSR or 预渲染
  - 服务端渲染
    - 优点
      - 更好的 SEO
        更快的内容到达时间
    - 缺点
      - 更多的开发条件限制
      - 更多的服务端负载

### webpack 配置层面的优化

- Webpack 对图片进行压缩
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 sourcemap
- Vue 项目的编译优化

### 基础的 Web 技术层面的优化

- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用

## Vue 项目 Webpack 优化实践

- 缩小文件的搜索范围

  - 优化 loader 配置
  - 优化 `resolve.modules` 配置层面的优化
  - 优化 `resolve.alias` 配置
  - 优化 `resolve.extensions` 配置

- 减少冗余代码
- 使用 HappyPack 多进程解析和处理文件
- 使用 ParallelUglifyPlugin 多进程压缩代码文件
- 使用自动刷新
- 开启模块热替换
- 提取公共代码
- 按需加载代码
- 优化 sourcemap
- 构建结构输出分析
