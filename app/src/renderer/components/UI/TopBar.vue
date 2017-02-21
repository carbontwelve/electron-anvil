<template>
    <ui-toolbar progress-position="top" text-color="white" type="colored" :brand="$store.getters.currentWorkspaceName || 'Anvil'">
        <div slot="actions">
            <ui-icon-button color="white" has-dropdown icon="more_vert" ref="dropdownButton5" size="large" type="secondary">
                <ui-menu contain-focus has-icons slot="dropdown" :options="menuOptions" @close="$refs.dropdownButton5.closeDropdown()"></ui-menu>
            </ui-icon-button>
        </div>
        <div slot="icon">
            <ui-icon-button color="white" has-dropdown icon="menu" ref="dropdownButton51" size="large" type="secondary">
                <div class="p2 flex flex-wrap" slot="dropdown" style="max-width: 25.5rem;">
                    <div class="p1 flex-auto center">
                        <router-link :to="{ name: 'dashboard-page'}" class="main-nav--link" @click="$refs.dropdownButton51.closeDropdown()">
                            <i class="material-icons">dashboard</i><br>
                            Dashboard
                        </router-link>
                    </div>
                    <div class="p1 flex-auto center">
                        <router-link :to="{ name: 'site-page'}" class="main-nav--link" @click="$refs.dropdownButton51.closeDropdown()">
                            <i class="material-icons">folder</i><br>
                            Site
                        </router-link>
                    </div>
                    <div class="p1 flex-auto center">
                        <router-link :to="{ name: 'system-page'}" class="main-nav--link" @click="$refs.dropdownButton51.closeDropdown()">
                            <i class="material-icons">settings</i><br>
                            System
                        </router-link>
                    </div>
                </div>
            </ui-icon-button>
        </div>
        {{ ($route.meta.name) ? $route.meta.name : $route.name }}
    </ui-toolbar>
</template>

<script>
    import UiIconButton from 'keen-ui/lib/UiIconButton'
    import UiToolbar from 'keen-ui/lib/UiToolbar'
    import UiTabs from 'keen-ui/lib/UiTabs'
    import UiTab from 'keen-ui/lib/UiTab'
    import UiMenu from 'keen-ui/lib/UiMenu'
    const menuOptions = [
        {
            label: 'Settings'
        },
        {
            label: 'About'
        },
        {
            label: 'Help'
        }
    ]
    export default {
        name: 'top-bar',
        data () {
            return {
                menuOptions
            }
        },
        components: {
            UiIconButton,
            UiMenu,
            UiTab,
            UiTabs,
            UiToolbar
        },
        methods: {
            displayMenu () {
                // ...
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .main-nav--link{
        background: #F9F9F9;
        display: block;
        padding: 0.6rem;
        border-radius: 5px;
        text-decoration: none;
        color: #505050;
        min-width: 6rem;

        &:hover{
            background: #F3F3F3;
        }
    }
</style>
