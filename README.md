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

    