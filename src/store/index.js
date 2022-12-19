import { createStore } from 'vuex'

const store = {
    state: {
        name: 'zhangsan'
    },
    mutations: {
        set_user(state) {
            state.name = 'lisi'
        }
    },
    actions: {
        set_user({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('set_user')
                    resolve()
                }, 2000)
            })
        }
    }

}
export const createStoreInstance = () => {
    return createStore(store)
}