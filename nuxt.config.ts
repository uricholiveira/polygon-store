// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // @ts-ignore
    runtimeConfig: {
        backend: {
            url: process.env.NUXT_BACKEND_URL || 'http://localhost:5000/api'
        }
    },
    devtools: {enabled: true},
    modules: ['@nuxthq/ui'],
    ui: {
        prefix: 'u',
        global: true,
        icons: ['heroicons'],
    }
})
