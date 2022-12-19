<template>
    <div>APP.vue</div>
    <div>foo</div>
    <!-- 这里不能用 div 包裹，不然路由切换的时候会报错 -->
    <router-link to="/">Foo | </router-link>
    <router-link to="/bar"> Bar</router-link>
    <router-view></router-view>
</template>