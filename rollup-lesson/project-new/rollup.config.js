import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/main.ts',
  output: {
    file: 'dist/bundle.cjs.js',
    format: 'iife',
    name: 'libName',
    globals: {
      lodash: '_', // 告诉 rollup 去全局变量上取 lodash
      jquery: '$'
    }
  },
  external: ['lodash', 'jquery'],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
    typescript()
  ]
}

/**
 输出文件格式：
  amd 异步模块定义 require.js
  cjs
  es
  iife
  umd
 */
