<template>
    <div id="app" class="app-container with--top-bar with--bottom-bar">
        <div class="project-switcher">
            <ul class="list-reset">
                <li>
                    <a href="#" class="selected">Ph</a>
                    <span>Ctrl + 1</span>
                <li>
                    <a href="#">He</a>
                    <span>Ctrl + 2</span>
                </li>
                <li>
                    <a href="#"><i class="material-icons">library_add</i></a>
                </li>
            </ul>
        </div>
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

    .project-switcher{
        background: #121212;
        color: #616161;
        width: 62px;
        height: 100vh;
        overflow: hidden;
        transition-duration: 300ms;
        position: relative;
        left:0;

        ul{
            padding: 6px;
            li{
                margin-bottom: 18px;
                a{
                    position: relative;
                    display:block;
                    margin: 5px;
                    background: #505050;
                    border: 3px solid #505050;
                    border-radius: 3px;
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    line-height: 35px;
                    color: #c7c7c7;
                    text-decoration: none;
                    transition: border-color 0.2s;
                    i{
                        line-height: inherit;
                    }
                    &.selected:before{
                        content: '';
                        position: absolute;
                        width: 7px;
                        height: 30px;
                        background: #c7c7c7;
                        border-radius: 0 3px 3px 0;
                        left: -16px;
                        top:0px;
                    }
                }
                span{
                    font-size: 0.6rem;
                    text-align: center;
                    display: block;
                    margin: 0 5px;
                    transition: color 0.2s;
                }

                &:hover{
                    a{
                        border-color: rgba(255, 255, 255, 0.38);
                    }
                    span{
                        color: #c7c7c7;
                    }
                }
            }
        }
    }
</style>
