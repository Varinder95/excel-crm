export default {
  head: {
    title: "BootstrapVue Nuxt.js Frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },
  buildModules: [
    // https://go.nuxtjs.dev/apollo
    '@nuxtjs/apollo',
  ],
  modules: [
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/apollo
    '@nuxtjs/apollo',
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://127.0.0.1:4000'
      }
    }
  },
};
