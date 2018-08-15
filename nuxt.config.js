module.exports = {
  /*
   ** Router config
   */
  router: {
    middleware: ['i18n', 'auth', 'workspace']
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
    script: [{
      src: 'https://use.fontawesome.com/releases/v5.0.10/js/all.js'
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Lato'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#FECD34'
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

        const svgRule = config.module.rules.find(rule => rule.loader === 'url-loader')
        svgRule.test = /\.(png|jpe?g|gif)$/

        config.module.rules.push({
          test: /\.svg$/,
          loader: 'vue-svg-loader',
          options: {
            svgo: {
              plugins: [{ removeDoctype: true }, { removeComments: true }]
            }
          }
        })
      }
    }
  },

  modules: [
    '@nuxtjs/axios',
    'nuxt-fontawesome'
  ],

  plugins: [
    '@/plugins/element-ui',
    '@/plugins/i18n.js',
    '@/plugins/scroll-to.js',
    {
      src: '@/plugins/localStorage.js',
      ssr: false
    }
  ],

  fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
    ],
  },

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
    // '@/assets/styles/fontawesome.min.css',

    // Element UI
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css'
  ]
}
