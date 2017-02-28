import fs from 'fs-jetpack'
import matter from 'gray-matter'
// maybe import https://nodejs.org/api/path.html for linux/windows compatibility within getWorkspacePath ?
const types = {
    ADD_WORKSPACE: 'ADD_WORKSPACE',
    SET_WORKSPACE: 'SET_WORKSPACE',
    UPDATE_WORKSPACE: 'UPDATE_WORKSPACE',
    RESET_CURRENT_FILES: 'RESET_CURRENT_FILES',
    SET_CURRENT_FILES: 'SET_CURRENT_FILES',
    SET_CURRENT_FILES_LOADED: 'SET_CURRENT_FILES_LOADED'
}

// let defaultFile = {
//     name: 'untitled',
//     collection: 'posts',
//     raw: '---\ntitle: Hello World!\ndraft: true\n---\nAn unfinished article...',
//     content: '',
//     html: '',
//     meta: {}
// }

let defaultWorkspace = {
    name: '',
    files: {
        template: '---\ntitle: Hello World!\ndraft: true\n---\nAn unfinished article...'
    },
    uploads: [],
    collections: {
        items: {
            posts: 'posts/*.md'
        }
    },
    metadata: {
        siteName: 'My Static Site',
        siteUrl: '//example.com'
    },
    configuration: {
        metalSmith: {
            source: './src',
            destination: './build',
            clean: true,
            permalinks: {
                relative: false
            }
        }
    }
}

const state = {
    current: {
        name: '',
        files: {
            items: [],
            loaded: {}
        }
    },
    items: []
}

const mutations = {
    [types.RESET_CURRENT_FILES] (state, payload) {
        state.current.files = {
            items: [],
            loaded: {}
        }
    },
    [types.ADD_WORKSPACE] (state, payload) {
        state.items.push(payload)
    },
    [types.SET_WORKSPACE] (state, payload) {
        state.current.name = payload
    },
    [types.UPDATE_WORKSPACE] (state, payload) {
        let currentWorkspace = state.items.find((v) => {
            return v.name === state.current.name
        })
        console.log(currentWorkspace)
        // @todo finish...
    },
    [types.SET_CURRENT_FILES] (state, payload) {
        console.log('sync current files')
        state.current.files.items = payload
    },
    [types.SET_CURRENT_FILES_LOADED] (state, payload) {
        state.current.files.loaded[payload.key] = payload.value
    }
}

const actions = {
    addWorkspace ({state, dispatch, commit}, payload) {
        return new Promise((resolve, reject) => {
            commit(types.ADD_WORKSPACE, payload)
            if (state.items.length === 1) {
                commit(types.SET_WORKSPACE, payload.name)
            }
            resolve()
        })
    },
    syncWorkspaceFiles ({state, dispatch, commit}, payload) {
        let files = payload.fileSystem.find({matching: payload.collection})
        commit(types.SET_CURRENT_FILES, files)
        if (files.length > 0) {
            let len = files.length
            for (let i = 0; i < len; i++) {
                let f = payload.fileSystem.path(files[i])
                if (f) {
                    let parsedFileContent = matter(fs.read(f))
                    let tmp = parsedFileContent.data
                    tmp.content = parsedFileContent.content
                    tmp.stats = payload.fileSystem.inspect(f, {checksum: 'sha256', times: true})
                    commit(types.SET_CURRENT_FILES_LOADED, {key: state.current.files.items[i], value: tmp})
                }
            }
        }
    },
    setWorkspace ({state, dispatch, commit}, payload) {
        commit(types.SET_WORKSPACE, payload)
        commit(types.RESET_CURRENT_FILES)
    },
    updateWorkspace ({state, dispatch, commit}, payload) {
        // ...
    }
}

const getters = {
    isInstalled: (state, getters) => {
        return state.items.length > 0
    },
    workspaces: (state) => {
        return state.items
    },
    currentWorkspaceName: (state, getters) => {
        if (state.current.name === '' && getters.isInstalled) {
            return state.items[0]
        }
        return (state.current.name) ? state.current.name : ''
    },
    currentWorkspace: (state, getters) => {
        return getters.getWorkspace(getters.currentWorkspaceName)
    },
    getWorkspace: (state) => (name) => {
        return state.items.find((v) => {
            return v.name === name
        })
    },
    getWorkspacePath: (state, getters) => {
        return fs.cwd('workspaces/' + getters.currentWorkspace.name)
    },
    getWorkspaceFiles: (state, getters) => {
        return state.current.files
    }
}

export function getDefaultWorkspace () {
    console.log('getDefaultWorkspace')
    return JSON.parse(JSON.stringify(defaultWorkspace))
}

export default {state, mutations, actions, getters, types}
