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

let defaultFile = {
    name: null,
    ext: null,
    path: null,
    collection: null,
    raw: '---\ntitle: Hello World!\ndraft: true\n---\nAn unfinished article...',
    content: '',
    html: '',
    meta: {},
    stats: {},
    exists: false
}

let WorkspaceFile = (path) => {
    // @see http://stackoverflow.com/a/680982/1225977
    let splitFileName = (fN) => {
        return {
            name: fN.slice(0, -(fN.split('.').pop().length + 1)), // the + 1 on the ext length is to account for the .
            ext: fN.split('.').pop()
        }
    }

    let statFile = (p) => {
        pMethods.stats = fs.inspect(p, {checksum: 'sha256', times: true})
        let tmp = splitFileName(pMethods.stats.name)
        pMethods.name = tmp.name
        pMethods.ext = tmp.ext
    }

    let pMethods = {
        ...defaultFile,
        save (p, ext) {
            if (ext) {
                this.ext = ext
            }
            if (this.exists === false) {
                this.name = slugify(this.meta.title)
                let fileVersion = 1
                let baseFileName = this.name

                while (p.exists(this.name + '.' + ext) !== false) {
                    this.name = baseFileName + '-' + fileVersion
                    fileVersion++
                }
            }
            this.exists = true
            this.raw = matter.stringify(this.content, this.meta)
            console.log('Saving to [' + p.path(this.name + '.' + this.ext) + ']')
            p.write(this.name + '.' + this.ext, this.raw)
            statFile(p.path(this.name + '.' + this.ext))
        },
        load (p) {
            this.raw = fs.read(p)
            this.exists = true
            statFile(p)
        }
    }

    // path is passed if this is a file that exists
    if (path && fs.exists(path) !== false) {
        pMethods.load(path)
    }

    let parsedFileContent = matter(pMethods.raw)
    pMethods.content = parsedFileContent.content
    pMethods.meta = parsedFileContent.data

    return pMethods
}

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
                    commit(types.SET_CURRENT_FILES_LOADED, {key: state.current.files.items[i], value: new WorkspaceFile(f)})
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
                // let workspace = state.items.find((i) => {
                //     return i.name === state.current.name
                // })
                // let newFile = getDefaultFile()
                // let parsedFileContent = matter(newFile.raw)
                // newFile.meta = parsedFileContent.data
                // newFile.content = parsedFileContent.content
                // return resolve(newFile)
                return resolve(new WorkspaceFile())
            } else {
                let f = state.current.files.loaded[name]
                if (f) {
                    return resolve(f)
                } else {
                    return reject('No file with the name [' + name + '] could be found.')
                }
            }
        })
    }
    // setWorkspaceFile ({state, dispatch, commit}, payload) {
    //     return new Promise((resolve, reject) => {
    //         console.log('setWorkspaceFile')
    //         // This is a brand new file!
    //         if (payload.exists === false) {
    //             let fileName = slugify(payload.title)
    //             let frontMatter = {}
    //             Object.keys(payload).forEach((key, pos) => {
    //                 if (key !== 'stats' && key !== 'exists' && key !== 'content') {
    //                     frontMatter[key] = payload[key]
    //                 }
    //             })
    //             let fileContent = matter.stringify(payload.content, frontMatter)
    //             let savePath = fs.cwd('workspaces/' + state.current.name + '/posts') // @todo posts shouldn't be hard coded...
    //             let fileVersion = 1
    //             let baseFileName = fileName
    //             fileName += '.md'
    //             while (savePath.exists(fileName) !== false) {
    //                 fileName = baseFileName + '-' + fileVersion + '.md'
    //                 fileVersion++
    //             }
    //             console.log('Saving to [' + fileName + ']')
    //             savePath.write(fileName, fileContent)
    //         }
    //     })
    // }
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

let getDefaultWorkspace = function () {
    console.log('getDefaultWorkspace')
    return JSON.parse(JSON.stringify(defaultWorkspace))
}

let getDefaultFile = function () {
    console.log('getDefaultFilee')
    return JSON.parse(JSON.stringify(defaultFile))
}

export { getDefaultFile, getDefaultWorkspace }

export default {state, mutations, actions, getters, types}
