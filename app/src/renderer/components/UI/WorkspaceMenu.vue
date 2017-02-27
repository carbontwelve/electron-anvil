<template>
    <div class="workspace-menu sm-col-4 md-col-3 lg-col-2">
        <div class="p2 workspace-ident">
            <p class="h5"><strong>{{ currentWorkspace.metadata.siteName }}</strong></p>
            <small>{{ currentWorkspace.metadata.siteUrl }}</small>
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
                            <router-link :to="c.route">{{ c.title }}</router-link>
                        </li>
                    </ul>
                </li>
            </template>
            <li>
                <a href="" class="bold">
                    Settings <i class="material-icons">arrow_drop_down</i>
                </a>
                <ul class="list-reset">
                    <li><a href="#">General</a></li>
                    <li><a href="#">Collections</a></li>
                    <li><a href="#">Meta Data</a></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'workspace-menu',
        data () {
            return {
                menuItems: []
            }
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
                            {title: 'New ' + k, route: {name: ''}},
                            {title: 'Taxonomy', route: {name: ''}}
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
                }
            }
        }
    }
</style>
