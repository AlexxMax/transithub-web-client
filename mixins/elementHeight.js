export default {
  data() {
    return {
      elementHeightMixin_formElementsHeight: {}
    }
  },

  watch: {
    $_smallDeviceMixin_isDeviceSmall() {
      this.$_elementHeightMixin_updateElementsHeight()
    }
  },

  methods: {
    $_elementHeightMixin_updateElementsHeight() {
      for (const ref in this.$refs) {
        if (ref.includes('$_elementHeightMixin_ref_')) {
          this.elementHeightMixin_formElementsHeight[ref] = this.$refs[ref].$el.clientHeight
        }
      }
    }
  },

  mounted() {
    this.$_elementHeightMixin_updateElementsHeight()
  }
}
