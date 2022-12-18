const express = require('express')
const path = require('path')
const fs = require('fs')
const { renderToString } = require('vue/server-renderer')
const createApp = require('./dist/server.bundle.js').default

const app = express()

app.get('/', (req, res) => {
    const {app} = createApp()
    renderToString(app).then(appContent => {
        let htmlStr = fs.readFileSync('./dist/index.html', 'utf-8')
        htmlStr = htmlStr.replace('<div id="app">', `<div id="app">${appContent}`)
        res.send(htmlStr)
    })
})

// 为了支持 html 文件中引入 client.bundle.js
app.use(express.static(path.join(__dirname,'dist')))
app.listen('3000')