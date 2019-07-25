import isEqual from 'lodash.isequal'
import { isObject } from '@/utils/common'

const Z_INDEX = 6000

export default (dataKey, dialogVisibleKey) => ({
  data: () => ({
    closeDialogMixin_modified: false,
    closeDialogMixin_reset: true,
    closeDialogMixin_initData: null
  }),

  methods: {
    $_closeDialogMixin_handleBeforeDialogClose(next) {
      if (this.closeDialogMixin_modified) {
        this.$confirm(this.$t("forms.common.closeWindowWithoutChanges"), {
          confirmButtonText: this.$t("forms.common.close"),
          cancelButtonText: this.$t("forms.common.discard"),
          type: "warning",
          roundButton: true,
          zIndex: Z_INDEX
        }).then(() => { next() }).catch(() => {})
      } else { next() }
    },
    $_closeDialogMixin_reset() {
      this.closeDialogMixin_reset = true
      this.closeDialogMixin_modified = false
    }
  },

  watch: {
    [ `${dataKey}` ] : {
      deep: true,
      immediate: true,
      handler: function(value) {
        if (this.closeDialogMixin_reset) {
          this.closeDialogMixin_reset = false
          if (isObject(value)) {
            this.closeDialogMixin_initData = { ...value }
          } else {
            this.closeDialogMixin_initData = value
          }
        } else {
          this.closeDialogMixin_modified = !isEqual(value, this.closeDialogMixin_initData)
        }
      }
    }
  }
})
