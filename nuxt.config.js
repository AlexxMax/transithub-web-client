module.exports = {
  /*
   ** Router config
   */
  router: {
    middleware: 'i18n'
  },

  generate: {
    routes: ['/', '/orders', '/ua', '/ua/orders']
  },

  /*
   ** Headers of the page
   */
  head: {
    title: 'transithub',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Web client for TransitHub'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: 'red'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  modules: [
    '@nuxtjs/axios'
  ],

  plugins: [
    '@/plugins/element-ui',
    '@/plugins/i18n.js'
  ],

  axios: {
    proxy: true
  },

  proxy: {
    '/api1': {
      target: 'https://dev.apex.rest/ords/kernel_logistic/v1',
      pathRewrite: {
        '^/api1': ''
      }
    }
  },

  css: [
    '@/assets/styles/main.scss',

    // Element UI
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css'
  ]
}
