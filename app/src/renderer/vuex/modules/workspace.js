import fs from 'fs-jetpack'
// maybe import https://nodejs.org/api/path.html for linux/windows compatibility within getWorkspacePath ?
const types = {
    ADD_WORKSPACE: 'ADD_WORKSPACE',
    SET_WORKSPACE: 'SET_WORKSPACE',
    UPDATE_WORKSPACE: 'UPDATE_WORKSPACE',
    SET_CURRENT_FILES: 'SET_CURRENT_FILES',
    SET_CURRENT_FILES_TOTAL_PAGES: 'SET_CURRENT_FILES_TOTAL_PAGES'
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
            loaded: [],
            itemsPerPage: 15,
            totalPages: 0,
            currentPage: 1
        }
    },
    items: []
}

const mutations = {
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
    [types.SET_CURRENT_FILES_TOTAL_PAGES] (state, payload) {
        state.current.files.totalPages = payload
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

        let totalPages = Math.floor(state.current.files.items.length / state.current.files.itemsPerPage)
        if (totalPages < 1) {
            totalPages = 1
        }
        commit(types.SET_CURRENT_FILES_TOTAL_PAGES, totalPages)
        for (let i = 0; i < state.current.files.itemsPerPage; i++) {
            console.log(i + ' ' + state.current.files.items.length)
            let f = payload.fileSystem.path(state.current.files.items[i])
            let fC = fs.read(f)
            console.log(f + ':' + fC)
            if ((i + 1) >= state.current.files.items.length) {
                break
            }
        }
    },
    setWorkspace ({state, dispatch, commit}, payload) {
        commit(types.SET_WORKSPACE, payload)
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
    }
}

export function getDefaultWorkspace () {
    console.log('getDefaultWorkspace')
    return JSON.parse(JSON.stringify(defaultWorkspace))
}

export default {state, mutations, actions, getters, types}
