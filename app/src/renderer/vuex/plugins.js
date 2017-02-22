import fs from 'fs-jetpack'
import Workspace from './modules/workspace.js'

const localStoragePlugin = store => {
    store.subscribe((mutation, { workspaces }) => {
        // window.localStorage.setItem(API_STORAGE_KEY, JSON.stringify(api))
        // window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(app))
        // window.localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects.selected))
    })
}

const fsStoragePlugin = store => {
    let init = function () {
        return new Promise((resolve, reject) => {
            console.log('fsStoragePlugin init')
            if (!fs.exists('./workspaces')) {
                fs.dir('./workspaces')
            }
            let ls = fs.find('./workspaces', { matching: ['*'], files: false, directories: true })
            let len = ls.length
            for (let i = 0; i < len; i++) {
                let filePath = './' + ls[i] + '/anvil.json'
                if (!fs.exists(filePath)) {
                    continue
                }
                store.commit(Workspace.types.ADD_WORKSPACE, fs.read(filePath, 'json'))
            }

            if (len === 1 && store.state.workspace.items[0]) {
                store.commit(Workspace.types.SET_WORKSPACE, store.state.workspace.items[0].name)
            }
            if (len > 1) {
                let selectedWorkspace = window.localStorage.getItem('selectedWorkspace')
                if (selectedWorkspace) {
                    store.commit(Workspace.types.SET_WORKSPACE, selectedWorkspace)
                } else if (store.state.workspace.items[0]) {
                    store.commit(Workspace.types.SET_WORKSPACE, store.state.workspace.items[0].name)
                } else {
                    return reject('No selected workspace could be found')
                }
            }
            resolve()
        })
    }

    init().then(() => {
        store.subscribe((mutation, { workspace }) => {
            if (mutation.type === 'ADD_WORKSPACE' || mutation.type === 'UPDATE_WORKSPACE') {
                let len = workspace.items.length
                for (let i = 0; i < len; i++) {
                    let ws = workspace.items[i]
                    if (!fs.exists('./workspaces/' + ws.name)) {
                        fs.dir('./workspaces/' + ws.name)
                    }
                    fs.write('./workspaces/' + ws.name + '/anvil.json', ws)
                }
            }

            if (mutation.type === 'SET_WORKSPACE') {
                window.localStorage.setItem('selectedWorkspace', store.state.workspace.current.name)
            }
        })
    })
}
export default [localStoragePlugin, fsStoragePlugin]
