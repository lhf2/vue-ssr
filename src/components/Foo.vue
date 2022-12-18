<template>
    Foo
    <button @click="clickMe">点我</button>
</template>
<script setup>
    const clickMe = ()=>{
        alert('点我')
    }
</script>