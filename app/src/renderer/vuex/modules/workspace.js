import fs from 'fs-jetpack'
import matter from 'gray-matter'
// maybe import https://nodejs.org/api/path.html for linux/windows compatibility within getWorkspacePath ?

// https://gist.github.com/mathewbyrne/1280286
function slugify (text) {
    /* eslint-disable no-useless-escape */
    const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(p, c =>
            b.charAt(a.indexOf(c)))     // Replace special chars
        .replace(/&/g, '-and-')         // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')             // Trim - from end of text
    /* eslint-enable no-useless-escape */
}

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
            loaded: {},
            isLoaded: false
        },
        file: {}
    },
    items: []
}

const mutations = {
    [types.RESET_CURRENT_FILES] (state, payload) {
        state.current.files = {
            items: [],
            loaded: {},
            isLoaded: false
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
                    tmp.exists = true
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
    },
    getWorkspaceFile ({state, dispatch, commit}, name) {
        return new Promise((resolve, reject) => {
            // If this is a new file
            if (!name || (name && name.length < 1)) {
                let workspace = state.items.find((i) => {
                    return i.name === state.current.name
                })
                let parsedFileContent = matter(JSON.parse(JSON.stringify(workspace.files.template)))
                let f = parsedFileContent.data
                f.content = parsedFileContent.content
                f.stats = {}
                f.exists = false
                return resolve(f)
            } else {
                let f = state.current.files.loaded[name]
                if (f) {
                    return resolve(f)
                } else {
                    return reject('No file with the name [' + name + '] could be found.')
                }
            }
        })
    },
    setWorkspaceFile ({state, dispatch, commit}, payload) {
        return new Promise((resolve, reject) => {
            console.log('setWorkspaceFile')
            // This is a brand new file!
            if (payload.exists === false) {
                let fileName = slugify(payload.title) + '.md'
                let frontMatter = {}
                Object.keys(payload).forEach((key, pos) => {
                    if (key !== 'stats' && key !== 'exists' && key !== 'content') {
                        frontMatter[key] = payload[key]
                    }
                })
                let fileContent = matter.stringify(payload.content, frontMatter)
                let savePath = fs.cwd('workspaces/' + state.current.name + '/posts') // @todo posts shouldn't be hard coded...
                console.log('Saving to [' + fileName + '] the content:')
                console.log(fileContent)
                savePath.write(fileName, fileContent)
            }
        })
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
