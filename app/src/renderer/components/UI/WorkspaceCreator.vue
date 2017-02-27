<template>
    <div class="workspace-creator p4" :class="{ 'off-screen': !workspaceCreatorVisible }">
        <h1 class="mb3">Create new workspace</h1>
        <workspace-name v-if="stage === 'name'" v-bind:name="workspace.name" v-on:nextStage.once="nextStage" v-on:quit="quit"></workspace-name>
        <workspace-meta v-if="stage === 'meta'" v-bind:meta="workspace.metadata" v-on:nextStage.once="nextStage" v-on:prevStage.once="prevStage"></workspace-meta>
        <workspace-collections v-if="stage === 'collections'" v-bind:collections="workspace.collections.items" v-on:nextStage.once="nextStage" v-on:prevStage.once="prevStage"></workspace-collections>
    </div>
</template>

<script>
    import { getDefaultWorkspace } from '../../vuex/modules/workspace'
    import { mapGetters } from 'vuex'
    import WorkspaceName from './WorkspaceCreator/WorkspaceName'
    import WorkspaceMeta from './WorkspaceCreator/WorkspaceMeta'
    import WorkspaceCollections from './WorkspaceCreator/WorkspaceCollections'

    export default {
        name: 'workspace-creator',
        data () {
            return {
                workspace: {},
                stage: 'name'
            }
        },
        created () {
            this.workspace = getDefaultWorkspace()
        },
        components: {
            WorkspaceName,
            WorkspaceMeta,
            WorkspaceCollections
        },
        computed: {
            ...mapGetters([
                'isInstalled',
                'getWorkspace',
                'workspaceCreatorVisible'
            ])
        },
        methods: {
            nextStage (e) {
                switch (this.stage) {
                case 'name':
                    this.workspace.name = e
                    this.stage = 'meta'
                    break
                case 'meta':
                    this.workspace.metadata = e
                    this.stage = 'collections'
                    break
                case 'collections':
                    let _vm = this
                    this.workspace.collections.items = e
                    this.$store.dispatch('addWorkspace', this.workspace).then(() => {
                        _vm.quit()
                    })
                    break
                }
            },
            prevStage () {
                switch (this.stage) {
                case 'meta':
                    this.stage = 'name'
                    break
                case 'collections':
                    this.stage = 'meta'
                    break
                }
            },
            quit () {
                this.$store.dispatch('toggleWorkspaceCreatorVisibility')
                this.workspace = getDefaultWorkspace()
                this.stage = 'name'
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .workspace-creator{
        z-index: 4;
        position: absolute;
        height: 100vh;
        width: 100vw;
        background: #0a377b;
        top:0;
        left:0;
        color: white;
        transition-duration: 300ms;

        &.off-screen{
            left: -100vw;
        }
    }
</style>
