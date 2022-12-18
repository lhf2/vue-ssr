// 共用的创建 app 实例
import { createSSRApp } from "vue";
import App from './App.vue'
export function createAppInstance() {
    const app = createSSRApp(App)
    return {
        app
    }
}