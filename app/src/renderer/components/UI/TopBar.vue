<template>
    <ui-toolbar progress-position="top" text-color="white" type="colored" brand="Anvil">
        <div slot="actions">
            <ui-icon-button
                    color="white"
                    has-dropdown
                    icon="more_vert"
                    ref="dropdownButton5"
                    size="large"
                    type="secondary"
            >
                <ui-menu
                        contain-focus
                        has-icons
                        slot="dropdown"
                        :options="menuOptions"
                        @close="$refs.dropdownButton5.closeDropdown()"
                ></ui-menu>
            </ui-icon-button>
        </div>
        Dashboard
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
        }
    }
</script>
