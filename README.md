# CSR、SSR 以及同构渲染
## SSR
传统的服务端渲染技术有 PHP/JSP 等
### 服务端渲染的工作流程：
![image](https://github.com/lhf2/vue-ssr/blob/main/images/ssr.png)
(1) 用户通过浏览器请求站点。
(2) 服务器请求 API 获取数据。
(3) 接口返回数据给服务器。
(4) 服务器根据模板和获取的数据拼接出最终的 HTML 字符串。
(5) 服务器将 HTML 字符串发送给浏览器，浏览器解析 HTML 内容并渲染。
当用户再次通过超链接进行页面跳转，会重复上述 5 个步骤。可以看到，传统的服务端渲染的用户体验非常差，任何一个微小的操作都可能导致页面刷新。

## CSR
后来 ajax 问世，CSR 是在浏览器中完成模板与数据的融合，并渲染出最终的 HTML 页面。
### 客户端渲染的工作流程：
![image](https://github.com/lhf2/vue-ssr/blob/main/images/csr.png)
（1）客户端向服务器或 CDN 发送请求，获取静态的 HTML 页面。注意，此时获取的 HTML 页面通常是空页面。在 HTML 页面中，会包含 <style>、<link> 和 <script> 等标签。
（2）虽然 HTML 页面是空的，但浏览器仍然会解析 HTML 内容。由于HTML 页面中存在 ```<link rel="stylesheet">``` 和 ```<script>``` 等标签，所以浏览器会加载 HTML 中引用的资源，例如 app.css和 app.js。接着，服务器或 CDN 会将相应的资源返回给浏览器，浏览器对 CSS 和 JavaScript 代码进行解释和执行。因为页面的渲染任务是由 JavaScript 来完成的，所以当 JavaScript被解释和执行后，才会渲染出页面内容，即“白屏”结束。但初始渲染出来的内容通常是一个“骨架”，因为还没有请求 API 获取数据。
（3）客户端再通过 AJAX 技术请求 API 获取数据，一旦接口返回数据，客户端就会完成动态内容的渲染，并呈现完整的页面。
当用户再次通过点击“跳转”到其他页面时，浏览器并不会真正的进行跳转动作，即不会进行刷新，而是通过前端路由的方式动态地渲染页面，这对用户的交互体验会非常友好。但是会出现白屏问题；

## SSR VS CSR
SSR：SEO 友好、无白屏问题、占用服务器资源多、用户体验差
CSR：SEO 不友好、有白屏问题、占用服务器资源少、用户体验好

## 同构
同构渲染分为首次渲染（即首次访问或刷新页面）ssr 以及非首次渲染 csr（页面交互）。
同构渲染的“同构”一词的含义是，同样一套代码既可以在服务端运行，也可以在客户端运行。所以需要两个入口分别进行打包；
![image](https://github.com/lhf2/vue-ssr/blob/main/images/同构.jpeg)
每次调用 render 函数进行服务端渲染时，都会为当前请求调用 createSSRApp 函数来创建一个新的应用实例。这是为了避免不同请求共用同一个应用实例所导致的状态污染。
```
// 每个服务端都要生成一个实例
export default ()=>{
    const { app } = createAppInstance()
    const router = createRouterInstance('server')
    app.use(router)
    return {
        app,
        router
    }
}
```
### 执行流程
在服务端，组件会被渲染为静态的 HTML 字符串，并发送给浏览器。浏览器则会渲染由服务端返回的静态的 HTML 内容，并下载打包在静态资源中的组件代码。当下载完毕后，浏览器会解释并执行该组件代码。
当组件代码在客户端执行时，由于页面中已经存在对应的 DOM 元素，所以渲染器并不会执行创建 DOM 元素的逻辑，而是会执行激活操作（引入客户端的脚本文件进行激活）。


### 注意事项
1. 注意组件的生命周期。beforeUpdate、updated、beforeMount、mounted、beforeUnmount、unmounted 等生命周期钩子函数不会在服务端执行。
2. 编写组件代码时，要额外注意代码的跨平台性。通常我们在选择第三方库的时候，会选择支持跨平台的库，例如使用 Axios 作为网络请求库。
3. 特定端的实现。无论在客户端还是在服务端，都应该保证功能的一致性。例如，组件需要读取 cookie 信息。在客户端，我们可以通过 document.cookie 来实现读取；而在服务端，则需要根据请求头来实现读取。所以，很多功能模块需要我们为客户端和服务端分别实现。
4. 避免交叉请求引起的状态污染。状态污染既可以是应用级的，也可以是模块级的。对于应用，我们应该为每一个请求创建一个独立的应用实例。对于模块，我们应该避免使用模块级的全局变量。这是因为在不做特殊处理的情况下，多个请求会共用模块级的全局变量，造成请求间的交叉污染。
5. 仅在客户端渲染组件中的部分内容。这需要我们自行封装<ClientOnly> 组件，被该组件包裹的内容仅在客户端才会被渲染。


# 出现的问题
## 1. Node 端不支持 vue 里面的 style
```
var element = document.createElement("style");
                ^
ReferenceError: document is not defined
```

解决办法：使用 vue-style-loader 代替 style-loader

## 2. 集成路由的时候报错
```
webpack://vue-ssr/./node_modules/vue-router/dist/vue-router.mjs?:503
    const { history, location } = window;
                                  ^
ReferenceError: window is not defined
```

解决办法：使用不同的 history 模式
Client: createWebHistory()
Server: createMemoryHistory()

## 3. 同构要注意路由相关的处理
   /（seo）、静态资源中间件（引用的资源）、*(其他路由)
   老是报错 Hydration completed but contains mismatches. 但不影响项目运行；

    