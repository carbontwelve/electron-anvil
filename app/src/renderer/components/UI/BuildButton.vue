<template>
    <div>
        <ui-button size="small" raised v-on:click="runWorkspace" :loading="isLoading">Build</ui-button>
    </div>
</template>

<script type="text/babel">
    import { execFile } from 'child_process'
    import { mapGetters } from 'vuex'
    export default {
        name: 'build-button',
        data () {
            return {
                isLoading: false
            }
        },
        methods: {
            ...mapGetters(['getWorkspacePath']),
            buildWorkspace () {
                this.isLoading = true
                let _vm = this

                console.log(this.getWorkspacePath().cwd())

                // --prefix --silent
                const npmVersion = execFile(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install'], {cwd: this.getWorkspacePath().cwd()})
                npmVersion.on('error', () => {
                    console.log('Failed to start child process.')
                })
                npmVersion.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`)
                })
                npmVersion.stderr.on('data', (data) => {
                    console.log(`stderr: ${data}`)
                })
                npmVersion.on('close', (code) => {
                    console.log(`child process exited with code ${code}`)
                    _vm.isLoading = false
                })
            },
            runWorkspace () {
                this.isLoading = true
                let _vm = this
                const nodeRun = execFile('node', ['index.js'], {cwd: this.getWorkspacePath().cwd()})
                nodeRun.on('error', () => {
                    console.log('Failed to start child process.')
                })
                nodeRun.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`)
                })
                nodeRun.stderr.on('data', (data) => {
                    console.log(`stderr: ${data}`)
                })
                nodeRun.on('close', (code) => {
                    console.log(`child process exited with code ${code}`)
                    _vm.isLoading = false
                })

                // require(this.getWorkspacePath().path('index.js'))
            }
        }
    }
</script>
