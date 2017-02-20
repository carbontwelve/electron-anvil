<template>
    <div id="#app">
        <router-view></router-view>
    </div>
</template>

<script>
    import store from 'renderer/vuex/store'
    export default {
        store
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Lato:300);

    * {
        margin: 0;
        padding: 0;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
    }

    html,
    body {
        height: 100%;
    }
</style>
