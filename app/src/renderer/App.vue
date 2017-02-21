<template>
    <div id="app" class="app-container with--top-bar with--bottom-bar">
        <top-bar></top-bar>
        <main>
            <router-view></router-view>
        </main>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
    import store from 'renderer/vuex/store'
    import TopBar from 'components/UI/TopBar'
    import BottomBar from 'components/UI/BottomBar'
    export default {
        store,
        components: {
            TopBar,
            BottomBar
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
        color: #505050;
    }

    .bg-black{
        background: #121212;
    }
    .white{
        color: #F9F9F9;
    }

    .app-container.with--top-bar.with--bottom-bar main{
        height: calc(100vh - 91px);
    }
</style>
