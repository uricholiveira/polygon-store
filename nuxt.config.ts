// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // @ts-ignore
    runtimeConfig: {
        public: {
            backend: {
                url: ''
            }
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
