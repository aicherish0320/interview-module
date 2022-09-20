# 1. 与 webpack 类似的工具还有哪些？谈谈你为什么选择或放弃 webpack

- grunt
  - 自动化，需要反复重复的任务，例如压缩、编译、单元测试、linting 等，自动化工具可以减轻你的劳动，简化你的工作，当你在 GruntFile 文件正确配置好了任务，任务运行期就会自动帮你完成大部分无聊的工作
  - 优点
    - 出现的早
  - 缺点
    - 配置项太多
    - 而且不同的插件可能会有自己扩展字段
    - 学习成本高，运用的时候需要明白各种插件的配置规则和配合方式
- gulp
  - 基于 nodejs 的 stream 流打包
  - 定义是基于任务流的自动化构建工具
  - Gulp 是通过 task 对整个开发过程进行构建
  - 优点
    - 流式的写法简单直观
    - API 简单，代码量少
    - 易于学习和使用
    - 适合多页面应用来发
  - 缺点
    - 异常处理比较麻烦
    - 工作流程顺序难以精细控制
    - 不太适合单页或者自定义模块开发
- webpack
  - webpack 是模块化管理工具和打包工具，通过 loader 转换，任何形式的资源都可以视作模块，比如：CommonJS 模块、AMD 模块。它可以将许多松散的模块按照依赖和规则打包符合生产环境部署的前端资源
  - 还可以将按需加载的模块进行代码分割，等到实际需要的时候再异步加载
  - 它定位是模块打包器，而 gulp 属于构建工具，webpack 可以代替 gulp 的一些功能，但不是一个职能的工具
  - 优点
    - 可以模块化的打包任何资源
    - 适配任何模块系统
    - 适合 SPA 单页应用的开发
  - 缺点
    - 学习成本高、配置负责
    - 通过 babel 编译后的 JS 代码后体积过大
- rollup
  - rollup 下一代 ES6 模块化工具，最大的亮点是利用 ES6 模块设计，利用 tree-shaking 生成更简洁、更简单的代码
  - 一般而言，对于应用使用 webpack，对于类库使用 rollup
  - 需要代码拆分、或者很多静态资源需要处理，再或者构建的项目需要引入很多 CommonJS 模块的依赖时，使用 webpack
  - 代码库是基于 ES6 模块，而且希望代码能够被其他人直接使用，使用 rollup
  - 优点
    - 用标准化的格式来写代码，通过减少死代码尽可能地缩小包体积
  - 缺点
    - 对代码拆分、静态资源、CommonJS 模块支持不好
- parcel
  - parcel 是快速、零配置的 Web 应用程序打包器
  - 目前 parcel 只能用来构建用于运行在浏览器中的网页，这也是他的出发点和专注点
  - 优点
    - 内置了常见场景的构建方案及其依赖，无需再安装各种依赖
    - 能以 HTML 为入口，自动检测和打包依赖资源
    - 默认支持模块热替换，真正的开箱即用
  - 缺点
    - 不支持 sourceMap
    - 不支持 treeShaking
    - 配置不灵活

# 2. Loader 和 Plugin 的不同

- Loading 直译为 加载器，Webpack 将一切文件视为模块，但是 webpack 原生是只能解析 js 文件，如果想将其他文件也打包的话，就会用到 loader，所以 loader 的作用是让 webpack 拥有了加载和解析非 JavaScript 文件的能力
- Plugin 直译为 插件，Plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。在 webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果

# 3. webpack 的构建流程是什么？

- 初始化参数：从配置文件和 shell 语句中读取与合并参数，得出最终的参数
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；确定入口，根据配置中的 entry 找出所有的入口文件
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行编译，再找出该模块依赖的模块，再递归本步骤直到所有的入口依赖的文件都经过了本步骤的处理
- 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系，输出资源：根据入口和之间的依赖关系，组装成一个个包含多个模块的 chunk
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中， webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 webpack 提供的 API 改变 webpack 的运行结果

# 4. 有哪些常见的 Loader 和 Plugin？他们是解决什么问题的？

- loader
  - babel-loader
  - css-loader
  - eslint-loader
  - file-loader
  - url-loader
  - sass-loader
  - postcss-loader
  - style-loader
- plugin
  - case-sensitive-paths-webpack-plugin
  - terser-webpack-plugin
  - pnp-webpack-plugin
  - html-webpack-plugin
  - webpack-manifest-plugin
  - optimize-css-assets-webpack-plugin
  - mini-css-extract-plugin
  - HotModuleReplacementPlugin
