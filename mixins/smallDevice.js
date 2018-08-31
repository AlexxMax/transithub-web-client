export const SCREEN_TRIGGER_SIZES = {
  list: 600,
  element: 1200
}

export const screen = minWidth => ({
  data() {
    return {
      windowWidth: 0
    }
  },

  mounted() {
    if (process.browser) {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', this.__handleWindowResize)
    }
  },

  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', this.__handleWindowResize)
    }
  },

  methods: {
    __handleWindowResize() {
      if (process.browser) {
        this.windowWidth = window.innerWidth
      }
    }
  },

  computed: {
    smallDevice() {
      return this.windowWidth < minWidth
    }
  }
})
