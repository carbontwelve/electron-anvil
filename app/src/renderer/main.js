import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'
import KeenUI from 'keen-ui'

import App from './App'
import routes from './routes'

Vue.use(Electron)
Vue.use(Router)
Vue.use(KeenUI)
Vue.config.debug = true

const router = new Router({
    scrollBehavior: () => ({y: 0}),
    routes
})

router.beforeEach((to, from, next) => {
    // If the user is not yet installed, redirect to the installer
    if (!App.store.getters.isInstalled && to.name !== 'install-page') {
        return next('/i')
    }

    // If the user is attempting to visit the installer, and we are already installed, redirect to Projects page
    if (App.store.getters.isInstalled && to.name === 'install-page') {
        return next('/')
    }

    // Until the user has a selected project limit them to only accessing the Projects page
    // if (App.$store.getters.isInstalled && !store.getters.hasSelectedProject && to.name !== 'Projects') {
    //   return next('/')
    // }

    // Else continue
    return next()
})

/* eslint-disable no-new */
new Vue({
    router,
    ...App
}).$mount('#app')
