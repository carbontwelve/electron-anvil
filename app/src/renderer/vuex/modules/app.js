const types = {
    TOGGLE_WORKSPACE_CREATOR: 'TOGGLE_WORKSPACE_CREATOR',
    TOGGLE_WORKSPACE_SWITCHER: 'TOGGLE_WORKSPACE_SWITCHER'
}

const state = {
    displayWorkspaceCreator: false,
    displayWorkspaceSwitcher: true
}

const mutations = {
    [types.TOGGLE_WORKSPACE_CREATOR] (state, payload) {
        state.displayWorkspaceCreator = !state.displayWorkspaceCreator
    },
    [types.TOGGLE_WORKSPACE_SWITCHER] (state, payload) {
        state.displayWorkspaceSwitcher = !state.displayWorkspaceSwitcher
    }
}

const actions = {
    toggleWorkspaceCreatorVisibility ({state, dispatch, commit}, payload) {
        commit(types.TOGGLE_WORKSPACE_CREATOR)
    },
    toggleWorkspaceSwitcherVisibility ({state, dispatch, commit}, payload) {
        commit(types.TOGGLE_WORKSPACE_SWITCHER)
    }
}

const getters = {
    workspaceCreatorVisible: (state) => {
        return state.displayWorkspaceCreator
    },
    workspaceSwitcherVisible: (state) => {
        return state.displayWorkspaceSwitcher
    }
}

export default {state, mutations, actions, getters, types}
