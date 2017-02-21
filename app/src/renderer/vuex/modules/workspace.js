const types = {
    ADD_WORKSPACE: 'ADD_WORKSPACE',
    SET_WORKSPACE: 'SET_WORKSPACE'
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
        items: [],
        selected: null,
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
        ...defaultWorkspace
    },
    items: []
}

const mutations = {
    [types.ADD_WORKSPACE] (state, payload) {
        let newWorkspace = defaultWorkspace
        newWorkspace.name = payload.name
        state.items.push(newWorkspace)
    },
    [types.SET_WORKSPACE] (state, payload) {
        state.current = state.items.find((v) => {
            return v.name === payload.name
        })
    }
}

const actions = {
    addWorkspace ({state, dispatch, commit}, payload) {
        return new Promise((resolve, reject) => {
            commit(types.ADD_WORKSPACE, payload)
            if (payload.setDefault) {
                commit(types.SET_WORKSPACE, payload)
            }
            resolve()
        })
    },
    setWorkspace ({state, dispatch, commit}, payload) {
        commit(types.SET_WORKSPACE, payload)
    }
}

const getters = {
    isInstalled: (state, getters) => {
        return state.items.length > 0
    },
    currentWorkspaceName: (state) => {
        return (state.current.name) ? state.current.name : ''
    }
}

export default {state, mutations, actions, getters, types}
