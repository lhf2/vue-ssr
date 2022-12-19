// server.js
const path = require('path')
const express = require('express')
const fs = require('fs')
const { renderToString } = require('@vue/server-renderer')

const server = express()

const appPath = path.join(__dirname, './dist', 'server', 'server.bundle.js')
const createApp = require(appPath).default

const handleRouter = async (req, res) => {
    const { app, router } = createApp()
    await router.push(req.url)
    await router.isReady()

    const appContent = await renderToString(app);
    let html = fs.readFileSync(path.join(__dirname, './dist/client/index.html'))
    // 替换内容
    html = html.toString().replace('<!-- SSR_APP_CONTENT -->', `${appContent}`)
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
}

// 同构
// 这个得配置 如果不配置的话 走的是下方静态资源中间件 - index.html
// 有利于首页 seo 优化
server.get('/', async (req, res) => {
    await handleRouter(req, res)
})

// 静态资源中间件 处理 index.html 里面引入的 client.bundle.js
// 默认 use 的路径是 /，请求的是 index.html 里面的资源走的也是这个路径
server.use(express.static(path.join(__dirname, 'dist/client')))

// 其他 url
server.get('*', async (req, res) => {
    await handleRouter(req, res)
})

server.listen(3000)