// 服务端入口
import { createAppInstance } from "./createApp.js";

// 每个服务端都要生成一个实例
export default ()=>{
    const { app } = createAppInstance()
    return {
        app
    }
}