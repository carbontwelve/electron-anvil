const types = {
    ADD_WORKSPACE: 'ADD_WORKSPACE',
    SET_WORKSPACE: 'SET_WORKSPACE',
    UPDATE_WORKSPACE: 'UPDATE_WORKSPACE'
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
            items: []
        }
    },
    items: []
}

const mutations = {
    [types.ADD_WORKSPACE] (state, payload) {
        state.items.push(payload)
    },
    [types.SET_WORKSPACE] (state, payload) {
        // state.current.item = state.items.find((v) => {
        //     return v.name === payload.name
        // })
        state.current.name = payload
    },
    [types.UPDATE_WORKSPACE] (state, payload) {
        let currentWorkspace = state.items.find((v) => {
            return v.name === state.current.name
        })
        console.log(currentWorkspace)
    }
}

const actions = {
    addWorkspace ({state, dispatch, commit}, payload) {
        return new Promise((resolve, reject) => {
            commit(types.ADD_WORKSPACE, payload)
            resolve()
        })
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
    currentWorkspaceName: (state) => {
        return (state.current.name) ? state.current.name : ''
    },
    currentWorkspace: (state, getters) => {
        return getters.getWorkspace(getters.currentWorkspaceName)
        // return state.items.find((v) => {
        //     return v.name === getters.currentWorkspaceName
        // })
    },
    getWorkspace: (state) => (name) => {
        return state.items.find((v) => {
            return v.name === name
        })
    }
}

export function getDefaultWorkspace () {
    console.log('getDefaultWorkspace')
    return JSON.parse(JSON.stringify(defaultWorkspace))
}

export default {state, mutations, actions, getters, types}
