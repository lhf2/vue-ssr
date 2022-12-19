const htmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const { webpackConfig: baseConfig, resolve } = require('./webpack.base.js')

module.exports = merge(baseConfig, {
    entry: {
        client: resolve('../src/entry-client.js')
    },
    output: {
        // 以免造成覆盖
        path: resolve('../dist/client')
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('../public/index.html')
        })
    ]

})