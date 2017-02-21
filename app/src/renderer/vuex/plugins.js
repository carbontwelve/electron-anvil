import fs from 'fs-jetpack'

const localStoragePlugin = store => {
    store.subscribe((mutation, { workspaces }) => {
        // window.localStorage.setItem(API_STORAGE_KEY, JSON.stringify(api))
        // window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(app))
        // window.localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects.selected))
    })
}

const fsStoragePlugin = store => {
    store.subscribe((mutation, { workspace }) => {
        if (!fs.exists('./workspaces')) {
            fs.dir('./workspaces')
        }
        let len = workspace.items.length
        for (let i = 0; i < len; i++) {
            let ws = workspace.items[i]
            if (!fs.exists('./workspaces/' + ws.name)) {
                fs.dir('./workspaces/' + ws.name)
            }
            fs.write('./workspaces/' + ws.name + '/anvil.json', ws)
        }
    })
}
export default [localStoragePlugin, fsStoragePlugin]
