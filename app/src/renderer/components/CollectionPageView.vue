<template>
    <div class="site-page">
        <div class="workspace-header-bar flex items-center clearfix">
            <p class="h3 flex-auto">Content / {{ $route.params.collection }}</p>
            <ui-button color="green" raised>New post</ui-button>
        </div>
        <div class="flex workspace-content">
            <div class="col-3 flex-auto content-list">
                <ul class="list-reset">
                    <li v-for="item in getWorkspaceFiles.items">
                        <a href="#" class="p1 block" @click="setCurrentFile(item, $event)" :class="{'is-selected': currentFile === item}">
                            <span class="h3">{{ getWorkspaceFiles.loaded[item].title }}</span><br>
                            <small class="muted">Draft Post, least edited 6 days ago.</small>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-9 flex-auto p3">
                <ui-icon-button color="primary" size="large" icon="edit" class="right" v-if="currentFile !== null" @click="editCurrentFile"></ui-icon-button>
                <div v-html="currentPreview"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    // import CurrentPage from './LandingPageView/CurrentPage'
    // import fs from 'fs-jetpack'
    import WorkspaceMenu from './UI/WorkspaceMenu'
    import UiButton from 'keen-ui/lib/UiButton'
    import UiIconButton from 'keen-ui/lib/UiIconButton'
    import { mapGetters } from 'vuex'
    export default {
        name: 'collection-page',
        components: {
            UiButton,
            UiIconButton,
            WorkspaceMenu
        },
        data () {
            return {
                currentFile: null,
                currentPreview: ''
            }
        },
        computed: {
            ...mapGetters([
                'currentWorkspace',
                'getWorkspaceFiles'
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
                // Sync all files and order by date
                this.$store.dispatch('syncWorkspaceFiles', {
                    fileSystem: this.getWorkspacePath(),
                    collection: collection
                })
            },
            setCurrentFile (file, e) {
                e.preventDefault()
                this.currentFile = file
                let f = this.getWorkspaceFiles.loaded[file]
                this.currentPreview = '<h1>' + f.title + '</h1><br>' + f.content
            },
            editCurrentFile () {
                // ...
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

    .workspace-content{
        height: calc(100vh - 68px);
        .content-list{
            height: 100%;
            border-right: 1px solid #e2e2e2;
            li{
                border-bottom: 1px solid #e2e2e2;
                a{
                    text-decoration: none;
                    color: #505050;
                    border-left: 0px solid #cccccc;
                    transition-duration: 150ms;

                    &:hover{
                        color: #121212;
                        border-left: 6px solid #cccccc;
                    }
                    &.is-selected{
                        border-left: 6px solid #121212;
                    }
                    .muted{
                        color: #828282;
                    }
                }
            }
        }
    }
</style>
