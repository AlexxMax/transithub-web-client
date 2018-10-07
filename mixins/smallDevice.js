export const SCREEN_TRIGGER_SIZES = {
  list: 600,
  element: 1200
}

export const screen = minWidth => ({
  data() {
    return {
      smallDeviceMixin_windowWidth: 0
    }
  },

  mounted() {
    if (process.browser) {
      this.smallDeviceMixin_windowWidth = window.innerWidth
      window.addEventListener('resize', this.$_mallDeviceMixin_handleWindowResize)
    }
  },

  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', this.$_mallDeviceMixin_handleWindowResize)
    }
  },

  methods: {
    $_mallDeviceMixin_handleWindowResize() {
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
