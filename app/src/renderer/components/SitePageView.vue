<template>
    <div class="site-page">
        <div class="workspace-header-bar flex items-center clearfix">
            <p class="h3 flex-auto">Content</p>
            <ui-button color="green" raised>New post</ui-button>
        </div>
        <p>Yo</p>
    </div>
</template>

<script>
    // import CurrentPage from './LandingPageView/CurrentPage'
    // import fs from 'fs-jetpack'
    import WorkspaceMenu from './UI/WorkspaceMenu'
    import UiButton from 'keen-ui/lib/UiButton'
    export default {
        name: 'site-page',
        components: {
            UiButton,
            WorkspaceMenu
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .workspace-ident, .workspace-header-bar{
        border-bottom: 1px solid #e2e2e2;
        max-height: 68px;
        height: 68px;
    }
    .workspace-header-bar{
        padding: 12px;
    }
</style>
