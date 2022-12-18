const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const htmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (str) => {
    return path.resolve(__dirname, str)
}
module.exports = {
    entry: resolve('../src/main.js'),
    output: {
        filename: 'bundle.js',
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /.vue$/,
                use: 'vue-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('../public/index.html')
        })
    ],
    mode: 'development'
}