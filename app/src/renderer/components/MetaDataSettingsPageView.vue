<template>
    <div class="general-settings">
        <div class="workspace-header-bar flex items-center clearfix">
            <p class="h3 flex-auto">Meta Data</p>
        </div>
        <div class="p3">
            <h1>Hello world!</h1>
            <current-page></current-page>
        </div>
    </div>
</template>

<script>
    import CurrentPage from './LandingPageView/CurrentPage'
    export default {
        name: 'meta-data-settings-page',
        components: {
            CurrentPage
        }
    }
</script>
