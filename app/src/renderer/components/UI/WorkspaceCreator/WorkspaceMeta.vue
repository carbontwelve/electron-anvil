<template>
    <div class="workspace-meta-fields">
        <p>Now, I need to know this workspace's meta data:</p>
        <div class="py4">
            <template v-for="(value, name) in metaConfiguration">
                <ui-textbox
                        :label="name"
                        v-model="metaConfiguration[name]"
                        class="pb3"
                        dark
                ></ui-textbox>
            </template>
        </div>
        <div class="py2 right-align">
            <ui-button raised size="large" v-on:click.once="prevStage">Back</ui-button>
            <ui-button raised size="large" v-on:click.once="nextStage">Continue</ui-button>
        </div>
    </div>
</template>

<script>
    import UiTextbox from '../../Keen/UiTextbox'
    export default {
        name: 'workspace-meta',
        props: {
            meta: Object
        },
        data () {
            return {
                metaConfiguration: this.meta
            }
        },
        components: {
            UiTextbox
        },
        methods: {
            nextStage () {
                this.$emit('nextStage', this.metaConfiguration)
            },
            prevStage () {
                this.$emit('prevStage')
            }
        }
    }
</script>
