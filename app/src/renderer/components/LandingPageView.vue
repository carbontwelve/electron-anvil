<template>
    <div class="p3">
        <div class="flex">
            <div>
                <ui-menu has-secondary-text :options="menuOptions"></ui-menu>
            </div>
            <div class="flex-auto pl3">
                <img src="./LandingPageView/assets/anvil.png" alt="electron-vue">
                <h1>Anvil.</h1>
                <current-page></current-page>
                <versions></versions>
                <links></links>
            </div>
        </div>
    </div>
</template>

<script>
    import CurrentPage from './LandingPageView/CurrentPage'
    import Links from './LandingPageView/Links'
    import Versions from './LandingPageView/Versions'
    import UiMenu from 'keen-ui/lib/UiMenu'
    const menuOptions = [
        {
            id: 'edit',
            label: 'Edit',
            icon: 'edit',
            secondaryText: 'Ctrl+E'
        },
        {
            id: 'duplicate',
            label: 'Duplicate',
            icon: 'content_copy',
            secondaryText: 'Ctrl+D'
        },
        {
            id: 'share',
            label: 'Share',
            icon: 'share',
            secondaryText: 'Ctrl+Shift+S',
            disabled: true
        },
        {
            type: 'divider'
        },
        {
            id: 'delete',
            label: 'Delete',
            icon: 'delete',
            secondaryText: 'Del'
        }
    ]
    export default {
        data () {
            return {
                menuOptions
            }
        },
        components: {
            CurrentPage,
            Links,
            Versions,
            UiMenu
        },
        name: 'landing-page'
    }
</script>
