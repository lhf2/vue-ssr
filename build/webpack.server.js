const htmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const { webpackConfig: baseConfig, resolve } = require('./webpack.base.js')

module.exports = merge(baseConfig, {
    entry: {
        server: resolve('../src/entry-server.js')
    },
    target: 'node', 
    output:{
        path: resolve('../dist/server'),
        libraryTarget: 'commonjs2' // 以commonjs规范导出
    },  
    plugins: [
        // new htmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: resolve('../public/index_ssr.html')
        // })
    ]
})