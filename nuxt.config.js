let apiToken = process.env.API_TOKEN || ''

if (!apiToken) {
  try {
    const secret = require('./.env.json')
    apiToken = secret.API_TOKEN
  } catch (error) {
    console.log(`Can\'t find env file`)
  }
}

const axiosProxyTarget = process.env.NODE_ENV === 'production'
  ? 'https://prod.apex.rest/ords/kernel_logistic/v1'
  : 'https://prod.apex.rest/ords/kernel_logistic_dev/v1'

module.exports = {
  /*
  `** Environment
   */
  env: {
    apiToken
  },

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
        content: 'Driving agribusiness every day'
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
      href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700'
    }, {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Lobster'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  // loading: {
  //   color: '#FECD34'
  // },
  loading: '@/components/System/Loader',
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

        // For Nuxt.js 1
        const svgRule = config.module.rules.find(rule => rule.loader === 'url-loader')
        svgRule.test = /\.(png|jpe?g|gif)$/

        // For Nuxt.js 2
        /*
        const svgRule = config.module.rules.find(r => r.test.toString() === (/\.(png|jpe?g|gif|svg|webp)$/).toString() && r.use && r.use[0].loader === 'url-loader')
        svgRule.test = /\.(png|jpe?g|gif|webp)$/
        */

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

      if (isClient)
        config.devtool = 'eval-source-map'
      else
        config.devtool = "inline-source-map"
    }
  },

  modules: [
    '@nuxtjs/axios',
    'nuxt-fontawesome'
  ],

  plugins: [
    '@/plugins/axios.js',
    '@/plugins/inject-combined.js',
    '@/plugins/inject-vue-instance.js',
    '@/plugins/element-ui',
    '@/plugins/i18n.js',
    '@/plugins/scroll-to.js',
    '@/plugins/mask.js',
    {
      src: '@/plugins/local-storage.js',
      ssr: false
    },
    '@/plugins/string-methods.js',
    '@/plugins/date-methods.js',
    '@/plugins/vue2-transitions.js',
    '@/plugins/font-awesome.js',
    {
      src: '@/plugins/click-away.js',
      ssr: false
    }
  ],

  axios: {
    proxy: true
  },

  proxy: {
    '/api1': {
      target: axiosProxyTarget,
      pathRewrite: {
        '^/api1': ''
      }
    }
  },

  css: [
    '@/assets/styles/main.scss',

    // Element UI
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',

    // Font Awesome
    '@fortawesome/fontawesome-svg-core/styles.css'
  ]
}
