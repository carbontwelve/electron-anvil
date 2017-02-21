<template>
    <div class="overflow-auto" style="height: 100%;">
        <div class="table" style="height: 100%; width:100%;">
            <div class="table-cell align-middle">
                <div class="card sm-col-6 md-col-5 lg-col-4 mx-auto">
                    <div class="p3 px4 center">
                        <img src="./LandingPageView/assets/anvil.png" alt="anvil" style="width:64px;">
                        <h3 class="p0 pb2 m0">Welcome to Anvil!</h3>
                        <p>Before we begin please tell me what your first project is called:</p>
                    </div>
                    <div class="px4">
                        <ui-textbox
                                error="The project name may not be more than 65 characters"
                                help="Pick a project name not more than 65 characters"
                                label="Project Name"
                                placeholder="Enter a project name"
                                :maxlength="65"
                                :invalid="projectName.length > 65"
                                v-model="projectName"
                        ></ui-textbox>
                    </div>
                    <div class="px4 pb3 center">
                        <ui-button v-on:click="saveProject" color="primary" raised size="large" :disabled="!canContinue">Add Project</ui-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import UiTextbox from 'keen-ui/lib/UiTextbox'
    import UiButton from 'keen-ui/lib/UiButton'
    export default {
        name: 'install-page',
        data () {
            return {
                projectName: '',
                isSaving: false
            }
        },
        computed: {
            canContinue () {
                return this.projectName.length > 0 && this.projectName.length <= 65 && !this.isSaving
            }
        },
        methods: {
            saveProject () {
                let _vm = this
                this.isSaving = true
                this.$store.dispatch('addWorkspace', {
                    name: this.projectName,
                    setDefault: true
                }).then(() => {
                    _vm.$router.replace('dashboard-page')
                })
            }
        },
        components: {
            UiTextbox,
            UiButton
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .card{
        border: 1px solid #c7c7c7;
    }
</style>
