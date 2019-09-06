import extend from '@/utils/extend-vue-app'

export default async function ({ app }) {
  extend(app, {
    data: () => ({
      window: null,
      windowSize: {
        x: 0,
        y: 0
      }
    }),

    computed: {
      $windowSize() {
        return process.client ? this.windowSize : null
      },

      $breakpoints() {
        const screenWidth = this.windowSize.x
        // Vuetify system
        // -16px (1904 + 16 = 1920) 16px - scrollbar
        return process.client ? {
          isExtraSmallAndLess: screenWidth < 600,
          isMoreExtraSmall: screenWidth >= 600,
          isOnlyExtraSmall: screenWidth < 600,

          isSmallAndLess: screenWidth < 960,
          isMoreSmall: screenWidth >= 960,
          isOnlySmall: screenWidth >= 600 && screenWidth < 960,

          isMediumAndLess: screenWidth <= 1264,
          isMoreMedium: screenWidth > 1264,
          isOnlyMedium: screenWidth >= 960 && screenWidth <= 1264,

          isLargeAndLess: screenWidth < 1904,
          isMoreLarge: screenWidth >= 1904,
          isOnlyLarge: screenWidth > 1264 && screenWidth < 1904,

          isExtraLargeAndMore: screenWidth >= 1904,
          isMoreExtraLarge: screenWidth >= 1904,
          isOnlyExtraLarge: screenWidth >= 1904,
        } : {}
        // return {
        //   isSmallPhoneAndLess: screenWidth <= 375,
        //   isSmallPhone: screenWidth <= 375,
        //
        //   isPhoneAndLess: screenWidth <= 667,
        //   isPhone: screenWidth > 375 && screenWidth <= 667,
        //
        //   isTabletAndLess: screenWidth <= 1024,
        //   isTablet: screenWidth > 667 && screenWidth <= 1024,
        //
        //   isLaptopAndLess: screenWidth <= 1440,
        //   isLaptop: screenWidth > 1024 && screenWidth <= 1440,
        //
        //   isDesktopAndLess: screenWidth <= 1680,
        //   isDesktop: screenWidth > 1440 && screenWidth <= 1680,
        //
        //   isBigDesktopAndLess: screenWidth <= 1920,
        //   isBigDesktop: screenWidth > 1680 && screenWidth <= 1920,
        //
        //   isLargeDesktopAndMore: screenWidth >= 1921,
        //   isLargeDesktop: screenWidth >= 1921
        // }
      }
    },

    created() {
      if (process.client) {
        this.window = window
        this.window.addEventListener('resize', this.handleResize)
        this.handleResize()
      }
    },

    destroyed() {
      this.window.removeEventListener('resize', this.handleResize)
    },

    methods: {
      handleResize() {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      }
    }
  })
}