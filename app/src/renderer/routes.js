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
        path: '/site',
        name: 'site-page',
        component: require('components/SitePageView'),
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
