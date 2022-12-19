<template>
    <div>APP.vue</div>
    <div>foo</div>

    <!-- 这里不能用 div 包裹，不然路由切换的时候会报错 -->
    <div>
        <router-link to="/">Foo | </router-link>
        <router-link to="/bar"> Bar</router-link>
        <router-view></router-view>
    </div>

    <div>
        <!-- store -->
        <div>{{ $store.state.name }}</div>
        <!-- <button @click="updateName">更新 name</button> -->
    </div>

</template>
<script setup>
    import { onMounted } from '@vue/runtime-core'
    import { useStore } from 'vuex'
    const store = useStore()
    // const updateName = () => {
    //     store.dispatch('set_user')
    // }
    onMounted(() => {
        store.dispatch('set_user')
    })

</script>