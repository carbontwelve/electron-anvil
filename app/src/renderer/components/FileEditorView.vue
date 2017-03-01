<template>
    <div class="file-editor">
        <div class="workspace-header-bar flex items-center clearfix">
            <p class="h3 flex-auto">
                <input type="text" v-model="file.title" class="title h3" placeholder="Your post title">
            </p>
            <div class="ml2">
                <ul class="list-reset">
                    <li class="inline mr2">
                        <ui-icon-button type="primary" icon="more_vert" class="m3"></ui-icon-button>
                    </li>
                    <li class="inline">
                        <ui-button color="green" :disabled="!isModified" raised v-on:click="saveChanges">Save</ui-button>
                    </li>
                </ul>
            </div>
        </div>
        <current-page></current-page>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import UiButton from 'keen-ui/lib/UiButton'
    import UiIconButton from 'keen-ui/lib/UiIconButton'
    import CurrentPage from './LandingPageView/CurrentPage'
    export default {
        name: 'file-editor-page',
        components: {
            UiButton,
            UiIconButton,
            CurrentPage
        },
        data () {
            return {
                file: {},
                isModified: false
            }
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
                // Sync all files and order by date
                this.$store.dispatch('syncWorkspaceFiles', {
                    fileSystem: this.getWorkspacePath(),
                    collection: collection
                })
                let _vm = this
                // Load file into state
                this.$store.dispatch('getWorkspaceFile', this.$route.params.file || '').then((f) => {
                    _vm.file = JSON.parse(JSON.stringify(f))
                }).then(() => {
                    _vm.$watch('file', () => {
                        _vm.isModified = true
                    }, {deep: true})
                })
            },
            saveChanges () {
                let _vm = this
                this.$store.dispatch('setWorkspaceFile', this.file).then((f) => {
                    _vm.file = JSON.parse(JSON.stringify(f))
                    _vm.isModified = false
                })
            }
        }
    }
</script>

<style>
    input.title{
        height: 3rem;
        width: 100%;
        border: none;
        color: #505050;
    }
</style>
