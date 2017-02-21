<template>
    <div class="fixed z2 bottom-0 left-0 right-0 p1 black bg-gray right-align">
        <small>Anvil, running in electron v{{ versions['atom-shell'] }} with node v{{ versions.node }} on the {{ platform }} platform</small>
    </div>
</template>

<script>
    import os from 'os'
    export default {
        name: 'bottom-bar',
        data () {
            return {
                platform: os.platform(),
                versions: process.versions
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .bg-gray{
        background: #c7c7c7;
    }
</style>
