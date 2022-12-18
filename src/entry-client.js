// 客户端入口
import { createAppInstance } from "./createApp.js";
const {app} = createAppInstance()
// 挂载
app.mount('#app')