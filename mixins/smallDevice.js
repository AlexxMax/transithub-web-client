export const SCREEN_TRIGGER_SIZES = {
  list: 600,
  element: 1200
}

export const screen = (minWidth = SCREEN_TRIGGER_SIZES.element) => ({
  data() {
    return {
      smallDeviceMixin_windowWidth: 0
    }
  },

  mounted() {
    if (process.browser) {
      this.smallDeviceMixin_windowWidth = window.innerWidth
      window.addEventListener('resize', this.$_smallDeviceMixin_handleWindowResize)
    }
  },

  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', this.$_smallDeviceMixin_handleWindowResize)
    }
  },

  methods: {
    $_smallDeviceMixin_handleWindowResize() {
      if (process.browser) {
        this.smallDeviceMixin_windowWidth = window.innerWidth
      }
    }
  },

  computed: {
    $_smallDeviceMixin_isDeviceSmall() {
      return this.smallDeviceMixin_windowWidth < minWidth
    }
  }
})