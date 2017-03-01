<template>
    <div class="general-settings">
        <div class="workspace-header-bar flex items-center clearfix">
            <p class="h3 flex-auto">General Settings</p>
        </div>
        <div class="p3">
            <h1>Hello world!</h1>
            <current-page></current-page>
        </div>
    </div>
</template>

<script>
    import CurrentPage from './LandingPageView/CurrentPage'
    import { mapGetters } from 'vuex'
    export default {
        name: 'general-settings-page',
        components: {
            CurrentPage
        },
        computed: {
            ...mapGetters([
                'currentWorkspace'
            ])
        }
    }
</script>
