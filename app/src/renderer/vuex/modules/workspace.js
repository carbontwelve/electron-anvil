const types = {}

const state = {
    files: {
        items: [],
        selected: null,
        default: '---\ntitle: Hello World!\ndraft: true\n---\nAn unfinished article...'
    },
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

const mutations = {}

const actions = {}

const getters = {}

export default {state, mutations, actions, getters, types}
