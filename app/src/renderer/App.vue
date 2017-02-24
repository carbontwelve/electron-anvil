<template>
    <div id="app" class="flex">
        <workspace-creator></workspace-creator>
        <workspace-switcher></workspace-switcher>
        <main class="app-container flex-auto">
            <top-bar></top-bar>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import store from 'renderer/vuex/store'
    import TopBar from 'components/UI/TopBar'
    import BottomBar from 'components/UI/BottomBar'
    import WorkspaceSwitcher from 'components/UI/WorkspaceSwitcher'
    import WorkspaceCreator from 'components/UI/WorkspaceCreator'
    export default {
        store,
        components: {
            TopBar,
            BottomBar,
            WorkspaceSwitcher,
            WorkspaceCreator
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

    .app-container{
        z-index:1;
    }
</style>
