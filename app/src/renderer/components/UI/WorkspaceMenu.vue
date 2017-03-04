<template>
    <div class="workspace-menu sm-col-4 md-col-3 lg-col-2 flex-none">
        <div class="p2 workspace-ident flex items-center">
            <div class="flex-auto">
                <p class="h5"><strong>{{ currentWorkspace.metadata.siteName }}</strong></p>
                <small>{{ currentWorkspace.metadata.siteUrl }}</small>
            </div>
            <build-button></build-button>
        </div>
        <ul class="list-reset workspace-nav py2">
            <template v-for="i in menuItems">
                <li>
                    <a href="#" class="bold">
                        {{ i.title }}
                        <i class="material-icons">arrow_drop_down</i>
                    </a>
                    <ul class="list-reset" v-if="i.children.length > 0">
                        <li v-for="c in i.children">
                            <router-link :to="c.route" exact>{{ c.title }}</router-link>
                        </li>
                    </ul>
                </li>
            </template>
            <li>
                <a href="" class="bold">
                    Layouts <i class="material-icons">arrow_drop_down</i>
                </a>
                <ul class="list-reset">
                    <li><router-link :to="{name: 'general-settings-page'}" exact>All Layouts</router-link></li>
                    <li><router-link :to="{name: 'collections-settings-page'}" exact>New Layout</router-link></li>
                </ul>
            </li>
            <li>
                <a href="" class="bold">
                    Settings <i class="material-icons">arrow_drop_down</i>
                </a>
                <ul class="list-reset">
                    <li><router-link :to="{name: 'general-settings-page'}" exact>General</router-link></li>
                    <li><router-link :to="{name: 'collections-settings-page'}" exact>Collections</router-link></li>
                    <li><router-link :to="{name: 'meta-data-settings-page'}" exact>Meta Data</router-link></li>
                    <li><router-link :to="{name: 'meta-data-settings-page'}" exact>Plugins</router-link></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import BuildButton from './BuildButton'
    export default {
        name: 'workspace-menu',
        data () {
            return {
                menuItems: []
            }
        },
        components: {
            BuildButton
        },
        computed: {
            ...mapGetters([
                'currentWorkspace'
            ])
        },
        watch: {
            '$route': 'buildMenu'
        },
        created () {
            this.buildMenu()
        },
        methods: {
            buildMenu () {
                this.menuItems = []
                Object.keys(this.currentWorkspace.collections.items).forEach((k) => {
                    this.menuItems.push({
                        title: k,
                        children: [
                            {title: 'All ' + k, route: {name: 'collection-page', params: {collection: k}}},
                            {title: 'New ' + k, route: {name: 'edit-file-page', params: {collection: k, page: ''}}},
                            {title: 'Taxonomy', route: {name: 'collection-taxonomy-page', params: {collection: k}}}
                        ]
                    })
                    console.log(k + ' => ' + this.currentWorkspace.collections.items[k])
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .workspace-menu{
        background: #efefef;
        border-right: 1px solid #cccccc;
        height: 100vh;
        overflow: auto;
        max-width: 250px;
    }

    .workspace-nav{
        li{
            margin-bottom: 1rem;
            a{
                position: relative;
                padding: 3px 0.7rem 3px 2rem;
                border-radius: 0 3px 3px 0;
                display: block;
                margin-right: 1rem;
                text-decoration: none;
                color: #121212;
                &.is-current{
                    background: #121212;
                    color: white;
                }
                i{
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
            ul{
                margin: .5rem 0.7rem .5rem 2rem;
                border-left: 1px solid #cccccc;
                padding-left: 10px;
                li{
                    margin-bottom: 0.3rem;
                }
                a{
                    padding: 0;
                    color: #828282;

                    &:hover{
                        color: inherit;
                    }
                    &.router-link-active{
                        color: inherit;
                        position: relative;
                        &::before{
                            position: absolute;
                            content: "";
                            width: 3px;
                            height: 100%;
                            border-radius: 10px;
                            background-color: rgb(226, 102, 74);
                            left: -13px;
                        }
                    }
                }
            }
        }
    }
</style>
