<template>
    <div class="workspace-switcher flex-none" :class="{ 'off-screen': displayOnScreen }">
        <ul class="list-reset">
            <template v-if="isInstalled" v-for="(workspace, index) in workspaces">
            <li>
                <a href="#" :class="{selected: (currentWorkspace.name === workspace.name)}" @click="switchWorkspace(workspace, $event)">{{ workspace.name.charAt(0).toUpperCase() + workspace.name.slice(-1) }}</a>
                <span>Ctrl + {{ index }}</span>
            </li>
            </template>
            <li>
                <a href="#" @click="showWorkspaceCreator"><i class="material-icons">library_add</i></a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'workspace-switcher',
        computed: {
            ...mapGetters([
                'isInstalled',
                'workspaces',
                'currentWorkspace',
                'workspaceSwitcherVisible'
            ]),
            displayOnScreen () {
                if (!this.isInstalled) {
                    return true
                }
                return !this.workspaceSwitcherVisible
            }
        },
        methods: {
            switchWorkspace (w, e) {
                e.preventDefault()
                if (this.currentWorkspace.name === w.name) {
                    return
                }
                this.$store.dispatch('setWorkspace', w.name)
                this.$router.push({ name: 'dashboard-page' })
            },
            showWorkspaceCreator (e) {
                e.preventDefault()
                this.$store.dispatch('toggleWorkspaceCreatorVisibility')
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .workspace-switcher{
        background: #121212;
        color: #616161;
        width: 62px;
        height: 100vh;
        overflow: hidden;
        transition-duration: 300ms;
        position: relative;
        z-index:1;
        left:0;

        &.off-screen{
            width: 0;
        }

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
