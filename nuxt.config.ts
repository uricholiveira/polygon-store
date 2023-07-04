// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // @ts-ignore
    runtimeConfig: {
        stripeSecret: 'sk_test_51NPtk1I4fRilgMQE4lL1nAPHaRuo313PWlQQF2SJwUsgE1QBYFJzTH55DJRx6aaLgy8qmWomN3kePYC7O0r5hAnl00DkbmZGKg',
        public: {
            backend: {
                url: ''
            },
            frontend: {
                url: ''
            }
        }
    },
    devtools: {enabled: false},
    modules: ['@nuxthq/ui'],
    ui: {
        prefix: 'u',
        global: true,
        icons: ['heroicons'],
    }
})
