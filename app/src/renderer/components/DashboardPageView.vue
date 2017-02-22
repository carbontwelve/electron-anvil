<template>
    <div class="p3">
        <h1>Hello world!</h1>
        <current-page></current-page>
        <a href="#" @click="test">Test</a>
        {{ workspace }}
    </div>
</template>

<script>
    import CurrentPage from './LandingPageView/CurrentPage'
    export default {
        name: 'dashboard-page',
        components: {
            CurrentPage
        },
        computed: {
            workspace () {
                return this.$store.getters.currentWorkspace
            }
        },
        methods: {
            test () {
                if (this.workspace.name === 'jane') {
                    this.$store.dispatch('setWorkspace', 'bob')
                } else {
                    this.$store.dispatch('setWorkspace', 'jane')
                }
            }
        }
    }
</script>
