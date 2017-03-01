// const PassThrough = {
//     name: 'PassThrough',
//     template: '<router-view></router-view>'
// }

export default [
    {
        path: '/i',
        name: 'install-page',
        component: require('components/InstallPageView'),
        meta: {
            name: 'Install'
        }
    },
    {
        path: '/',
        name: 'dashboard-page',
        component: require('components/DashboardPageView'),
        meta: {
            name: 'Dashboard'
        }
    },
    {
        path: '/collection/:collection',
        name: 'collection-page',
        component: require('components/CollectionPageView'),
        meta: {
            name: 'Site'
        }
    },
    {
        path: '/collection/:collection/taxonomy',
        name: 'collection-taxonomy-page',
        component: require('components/CollectionPageView'),
        meta: {
            name: 'Site'
        }
    },
    {
        path: '/collection/:collection/edit/:file?',
        name: 'edit-file-page',
        component: require('components/FileEditorView'),
        meta: {
            name: 'Site'
        }
    },
    {
        path: '/system',
        name: 'system-page',
        component: require('components/SystemPageView'),
        meta: {
            name: 'System'
        }
    },
    {
        path: '*',
        redirect: '/'
    }
]
