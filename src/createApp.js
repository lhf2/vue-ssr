// 共用的创建 app 实例
import { createSSRApp } from "vue";
import App from './App.vue'
import { createStoreInstance } from './store/index'
export function createAppInstance() {
    const app = createSSRApp(App)
    // 集成 store
    const store = createStoreInstance()
    app.use(store)
    return {
        app,
        store
    }
}