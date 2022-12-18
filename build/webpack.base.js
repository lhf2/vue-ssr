const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = (str) => {
    return path.resolve(__dirname, str)
}

const webpackConfig = {
    output: {
        filename: '[name].bundle.js',
        path: resolve('../dist')
    },
    resolve: {
        extensions: ['.js', '.vue'],
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
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    mode: 'development'
}

module.exports = {
    webpackConfig,
    resolve
}