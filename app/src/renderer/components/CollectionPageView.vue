<template>
    <div class="site-page">
        <div class="workspace-header-bar flex items-center clearfix">
            <p class="h3 flex-auto">Content / {{ $route.params.collection }}</p>
            <ui-button color="green" raised>New post</ui-button>
        </div>
        <p>Yo</p>
    </div>
</template>

<script type="text/babel">
    // import CurrentPage from './LandingPageView/CurrentPage'
    // import fs from 'fs-jetpack'
    import WorkspaceMenu from './UI/WorkspaceMenu'
    import UiButton from 'keen-ui/lib/UiButton'
    import { mapGetters } from 'vuex'
    export default {
        name: 'collection-page',
        components: {
            UiButton,
            WorkspaceMenu
        },
        computed: {
            ...mapGetters([
                'currentWorkspace'
            ])
        },
        watch: {
            '$route': 'syncFiles'
        },
        created () {
            this.syncFiles()
        },
        methods: {
            ...mapGetters(['getWorkspacePath']),
            syncFiles () {
                let collection = this.currentWorkspace.collections.items[this.$route.params.collection]
                let basePath = collection.split('*')[0]
                this.getWorkspacePath().dir(basePath)
                this.$store.dispatch('syncWorkspaceFiles', {
                    fileSystem: this.getWorkspacePath(),
                    collection: collection
                })
            }
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
