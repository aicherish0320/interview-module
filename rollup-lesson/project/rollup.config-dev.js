import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/index.ts', // webpack entry
  output: {
    file: './dist/bundle.js',
    format: 'iife', // 输出格式 amd iife umd es cjs
    name: 'calculate', // iife umd 挂载在全局的变量名称
    globals: {
      lodash: '_'
      // jquery: '$'
    }
  },
  plugins: [
    babel({
      exclude: /node_modules/
    }),
    resolve(),
    commonjs(),
    typescript(),
    terser(),
    postcss(),
    serve({
      // open: true,
      port: '3331',
      contentBase: './dist'
    })
  ],
  external: ['lodash']
}
