let apiToken = process.env.TH_API_TOKEN || ''
let apiUrl = process.env.TH_API_URL || ''

if (!apiToken) {
  try {
    const secret = require('./.env.json')
    apiToken = secret.API_TOKEN
  } catch (error) {
    console.log(`Can\'t find env file`)
  }
}

if (!apiUrl) {
  try {
    const secret = require('./.env.json')
    apiUrl = secret.API_URL
  } catch (error) {
    console.log(`Can\'t find env file`)
  }
}

// const axiosProxyTarget = process.env.NODE_ENV === 'production'
//   ? 'https://prod.apex.rest/ords/kernel_logistic/v1'
//   : 'https://prod.apex.rest/ords/kernel_logistic_dev/v1'

const axiosProxyTarget = `${apiUrl}/v1`

// Google maps
let googleMapsApiToken = process.env.TH_GOOGLE_MAPS_API_TOKEN || ''
if (!googleMapsApiToken) {
  const secret = require('./.env.json')
  googleMapsApiToken = secret.GOOGLE_MAPS_API_TOKEN
}
const googleMapsSource = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiToken}&libraries=places&language=uk`

export default {
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
    middleware: ['external-redirect', 'i18n', 'auth', 'driver', 'workspace', 'companies']
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
      },
      {
        name: "apple-mobile-web-app-title",
        content: "Transithub"
      },
      {
        name: "application-name",
        content: "Transithub"
      },
      {
        name: "msapplication-TileColor",
        content: "#2b5797"
      },
      {
        name: "theme-color",
        content: "#ffffff"
      }
    ],
    script: [
      // {
      //   src: '/js/vendors/siteheart.js',
      //   body: true,
      //   async: true
      // },
      {
        src: '/js/vendors/sender.js',
        body: true,
        async: true
      },
      {
        src: '/js/vendors/hotjar.js',
        body: true,
        async: true
      },
      {
        src: googleMapsSource,
        async: true,
        defer: true
      }
    ],
    link: [
    //{
    //   rel: 'icon',
    //   type: 'image/x-icon',
    //   href: '/favicon.ico'
    // },
      {
        rel: 'apple-touch-icon',
        sizes: "180x180",
        href: '/apple-touch-icon.png'
    }, {
        rel: 'icon',
        type: "image/png",
        sizes: "32x32",
        href: '/favicon-32x32.png'
    }, {
        rel: 'icon',
        type: "image/png",
        sizes: "192x192",
        href: '/android-chrome-192x192.png'
    }, {
        rel: 'icon',
        type: "image/png",
        sizes: "16x16",
        href: '/favicon-16x16.png'
    },
    // {
    //   rel: 'manifest',
    //   href: '/site.webmanifest'
    // },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: "#eac443"
    }, {
        rel: 'preload',
        href: '/fonts/Montserrat-Bold.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous'
    }, {
        rel: 'preload',
        href: '/fonts/Montserrat-Medium.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous'
    }, {
        rel: 'preload',
        href: '/fonts/Montserrat-Regular.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous'
    }, {
        rel: 'preload',
        href: '/fonts/Montserrat-SemiBold.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous'
    },
    // {
    //   rel: 'preload',
    //   href: '/Lobster-Regular.woff2',
    //   as: 'font',
    //   type: 'font/woff2',
    //   crossorigin: 'anonymous'
    // },
      {
        rel: 'preload',
        href: '/fonts/DarkerGrotesque-ExtraBold.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  // loading: {
  //   color: '#FFD74D'
  // },
  loading: '@/components/System/Loader',
  /*
   ** Build configuration
   */
  build: {
    /*
     ** For PurgeCSS with mode 'webpack'
     */
    // extractCSS: true,

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
        // const svgRule = config.module.rules.find(rule => rule.loader === 'url-loader')
        // svgRule.test = /\.(png|jpe?g|gif)$/

        // For Nuxt.js 2
        const svgRule = config.module.rules.find(r => r.test.toString() === (/\.(png|jpe?g|gif|svg|webp)$/i).toString() && r.use && r.use[0].loader === 'url-loader')
        svgRule.test = /\.(png|jpe?g|gif|webp)$/

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

  /*
   ** Render configuration
   */
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    // 'nuxt-purgecss',
    'nuxt-fontawesome',
    'nuxt-vuex-router-sync',
    ['@nuxtjs/google-analytics', {
      id: 'UA-133679480-1'
    }],
    'nuxt-helmet'
  ],

  plugins: [
    '@/plugins/axios.js',
    '@/plugins/inject-combined.js',
    '@/plugins/inject-vue-instance.js',
    '@/plugins/element-ui',
    '@/plugins/i18n.js',
    '@/plugins/vue-scrollto.js',
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
    },
    {
      src: '@/plugins/vue-cookie-law.js',
      ssr: false
    },
    {
      src: '@/plugins/__forDev.js',
      ssr: false
    },
    {
      src: '@/plugins/back-to-top.js',
      ssr: false
    },
    {
      src: '@/plugins/window-size',
      ssr: false
    }
  ],

  axios: {
    progress: true,
    debug: true,
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

  // purgeCSS: {
  //   mode: 'webpack'
  // },

  css: [
    // Element UI
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/display.css',

    // Font Awesome
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  styleResources: {
    scss: [
      '@/assets/styles/main.scss',
      '@/assets/styles/vars.scss',
      '@/assets/styles/mixins.scss',
      '@/assets/styles/mobile-driver-workspace.scss',
      '@/assets/styles/sender',
      '@/assets/styles/siteheart',
      'element-ui/packages/theme-chalk/src/index'
    ]
  }
}
