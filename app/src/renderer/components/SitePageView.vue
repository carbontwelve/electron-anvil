<template>
    <div class="p3">
        <h1>Hello world!</h1>
        <current-page></current-page>
        <a href="#" @click="test">FS Test</a>
    </div>
</template>

<script>
    import CurrentPage from './LandingPageView/CurrentPage'
    import fs from 'fs-jetpack'
    export default {
        name: 'site-page',
        components: {
            CurrentPage
        },
        methods: {
            test () {
                if (!fs.exists('./workspaces')) {
                    fs.dir('./workspaces')
                }
                console.log(fs.list('.'))
            }
        }
    }
</script>
