<template>
    <div class="workspace-meta-fields">
        <p>Almost finished, I just need to know this workspace's collections:</p>
        <div class="py4">
            <template v-for="(value, name) in collectionsConfiguration">
                <ui-textbox
                        :label="name"
                        v-model="collectionsConfiguration[name]"
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
        name: 'workspace-collections',
        props: {
            collections: Object
        },
        data () {
            return {
                collectionsConfiguration: this.collections
            }
        },
        components: {
            UiTextbox
        },
        methods: {
            nextStage () {
                this.$emit('nextStage', this.collectionsConfiguration)
            },
            prevStage () {
                this.$emit('prevStage')
            }
        }
    }
</script>
