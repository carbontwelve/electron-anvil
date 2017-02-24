<template>
    <div class="workspace-name-field">
        <p>Before we begin please tell me what this workspace is called:</p>
        <div class="py4">
            <ui-textbox
                    :error="errorMessage"
                    help="Pick a workspace name not more than 65 characters"
                    label="Workspace Name"
                    placeholder="Enter a name for your workspace"
                    :maxlength="65"
                    :invalid="validate()"
                    v-model="projectName"
                    dark
            ></ui-textbox>
        </div>
        <div class="py2 right-align">
            <ul class="list-reset clear-fix">
                <li class="right">
                    <ui-button raised size="large" :disabled="!canContinue || projectName.length < 1" v-on:click.once="nextStage">Continue</ui-button>
                </li>
                <li class="right mr2">
                    <ui-button size="large" v-on:click="quit" icon="cancel" type="secondary" color="orange">Cancel</ui-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import UiTextbox from '../../Keen/UiTextbox'
    export default {
        name: 'workspace-name',
        props: {
            name: String
        },
        data () {
            return {
                projectName: this.name,
                canContinue: false,
                errorMessage: ''
            }
        },
        components: {
            UiTextbox
        },
        computed: {
            ...mapGetters([
                'getWorkspace'
            ])
        },
        methods: {
            validate () {
                let invalid = false
                if (this.projectName.length > 65) {
                    invalid = true
                    this.errorMessage = 'The workspace name may not be more than 65 characters'
                }
                if (this.getWorkspace(this.projectName)) {
                    invalid = true
                    this.errorMessage = 'A workspace with that name already exists'
                }
                this.canContinue = !invalid
                return invalid
            },
            nextStage () {
                if (this.canContinue) {
                    this.$emit('nextStage', this.projectName)
                }
            },
            quit () {
                this.$emit('quit')
            }
        }
    }
</script>

<style>
    .ui-button--type-secondary:hover:not(.is-disabled), .ui-button--type-secondary.has-dropdown-open, .ui-button--type-secondary.has-focus-ring:focus, body[modality="keyboard"] .ui-button--type-secondary:focus {
        background-color: transparent !important;
    }
</style>
