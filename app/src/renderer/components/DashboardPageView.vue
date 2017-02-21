<template>
    <div class="p3">
        <h1>Hello world!</h1>
        <current-page></current-page>
    </div>
</template>

<script>
    import CurrentPage from './LandingPageView/CurrentPage'
    export default {
        name: 'dashboard-page',
        components: {
            CurrentPage
        }
    }
</script>
