<template>
    <div id="#app">
        <top-bar></top-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import store from 'renderer/vuex/store'
    import TopBar from 'components/UI/TopBar'
    export default {
        store,
        components: {
            TopBar
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import '../../node_modules/basscss/css/basscss.css';
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    * {
        margin: 0;
        padding: 0;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html,
    body {
        height: 100%;
        font-family: 'Roboto', sans-serif;
    }
</style>
