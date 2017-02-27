<template>
    <div class="overflow-auto" style="height: 100%;">
        <div class="table" style="height: 100%; width:100%;">
            <div class="table-cell align-middle">
                <div class="card sm-col-6 md-col-5 lg-col-4 mx-auto">
                    <div class="p3 px4 center">
                        <img src="./LandingPageView/assets/anvil.png" alt="anvil" style="width:64px;">
                        <h3 class="p0 pb2 m0">Welcome to Anvil!</h3>
                    </div>
                    <div class="px4 pb3 center">
                        <ui-button v-on:click="continueInstalling" color="primary" raised size="large">Lets Begin</ui-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import UiButton from 'keen-ui/lib/UiButton'
    export default {
        name: 'install-page',
        components: {
            UiButton
        },
        methods: {
            continueInstalling () {
                this.$store.dispatch('toggleWorkspaceCreatorVisibility')
            }
        }
    }
</script>
