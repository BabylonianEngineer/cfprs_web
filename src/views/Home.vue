<template>
<div>
    <nav>
        <router-link to="/">文件解析</router-link>|
        <router-link to="/search">数据检索</router-link>
        <router-view />
    </nav>
</div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style>
</style>
