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

        <div class="file-editor-toolbar flex items-center">
            <ui-icon icon="format_bold"></ui-icon>
            <ui-icon icon="format_italic"></ui-icon>
            <ui-icon icon="insert_link"></ui-icon>
            <ui-icon icon="insert_photo"></ui-icon>
        </div>
        <VueCodeMirror :options="editorOption" :value="file.content" v-on:changed="(e) => {file.content = e}"></VueCodeMirror>
    </div>
</template>

<script type="text/babel">
    import CodeMirrorMeta from 'vue-codemirror/metas'
    import VueCodeMirror from 'vue-codemirror/codemirror.vue'
    import { mapGetters } from 'vuex'
    import UiButton from 'keen-ui/lib/UiButton'
    import UiIconButton from 'keen-ui/lib/UiIconButton'
    import CurrentPage from './LandingPageView/CurrentPage'
    export default {
        name: 'file-editor-page',
        components: {
            UiButton,
            UiIconButton,
            CurrentPage,
            VueCodeMirror
        },
        data () {
            return {
                editorOption: {
                    tabSize: 4,
                    styleActiveLine: true,
                    lineNumbers: true,
                    foldGutter: true,
                    line: true,
                    mode: {name: 'markdown'},
                    theme: 'solarized light',
                    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
                },
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
                    let collection = _vm.currentWorkspace.collections.items[_vm.$route.params.collection]
                    let ext = collection.split('.')
                    ext = ext[ext.length - 1]
                    let mode = CodeMirrorMeta.findModeByExtension(ext)
                    if (mode) {
                        _vm.editorOption.mode.name = mode.mode
                    }
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

<style rel="stylesheet/scss" lang="scss">
    input.title{
        height: 3rem;
        width: 100%;
        border: none;
        color: #505050;
        border-bottom: 1px solid rgba(76, 126, 189, 0.49);
    }
    .file-editor-toolbar{
        background: #f3f3f3;
        height: 33px;
        border-bottom: 1px solid #e4e4e4;
        color: #505050;
        padding: 0 0.3rem;
        span.ui-icon{
            margin-right: 0.5rem
        }
    }
</style>
