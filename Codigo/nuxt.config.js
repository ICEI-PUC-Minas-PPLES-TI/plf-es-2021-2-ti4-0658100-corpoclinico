
export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'CadastroCorpoClínico',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '~/plugins/vueYoutube.js' },
    { src: '~/plugins/axios.js', ssr: true },
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],

  vuetify: {
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: '01BAF2',
          success: '25BAAE',
          warning: 'F8A51B',
          error: 'EE5A74',
          accent: '01BAF2',
          main: '007970',
          sub: '71BF45',
          fundoclaro: 'F2F2F2',
        },
      },
    },
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxtjs/axios'
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: `http://localhost:${process.env.PORT}/api`,
    timeout: 5000
  },

  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api'
  },

  /*
  ** For deployment you might want to edit host and port
  */
  server: {
    port: process.env.PORT, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }
}
