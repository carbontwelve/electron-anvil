<template>
    <div class="workspace-menu sm-col-4 md-col-3 lg-col-2">
        <div class="p2 workspace-ident">
            <p class="h5"><strong>{{ currentWorkspace.metadata.siteName }}</strong></p>
            <small>{{ currentWorkspace.metadata.siteUrl }}</small>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'workspace-menu',
        computed: {
            ...mapGetters([
                'currentWorkspace'
            ])
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
</style>
