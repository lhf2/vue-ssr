// 服务端入口
import { createAppInstance } from "./createApp.js";
import { createRouterInstance } from "./router/index";

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