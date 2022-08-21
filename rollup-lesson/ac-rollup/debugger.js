const path = require('path')
const rollup = require('./lib/rollup')
// 入口文件
let entry = path.resolve(__dirname, 'src/main.js')
// 打包，并把打包的结果 写入到 bundle.js 中
rollup(entry, 'bundle.js')
