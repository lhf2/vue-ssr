// 客户端入口
import { createAppInstance } from "./createApp.js";
import { createRouterInstance } from "./router/index";
const { app } = createAppInstance()
const router = createRouterInstance('client')
app.use(router)
// 挂载
router.isReady().then(() => {
    app.mount('#app')
})