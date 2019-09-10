<template>
<Scaffold
  title="Select location"
  :visible.sync="innerVisible"
>
  <div class="RaceFormSelectLocation">

    <CommonSelectKoatuu
      @select-settlement="handleSelectSettlement"
      :settlement="initValue"
    />

  </div>
</Scaffold>
</template>

<script>
import CommonSelectKoatuu from '@/components/Common/CommonSelectKoatuu'
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListScaffold'

export default {
  components: {
    Scaffold,
    CommonSelectKoatuu
  },

  props: {
    initValue: {
      type: [Number, String],
      required: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    localSettlement: null
  }),

  computed: {
    innerVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },

  methods: {
    handleSelectSettlement(settlement) {
      this.$emit('select', settlement)
      this.innerVisible = false
    }
  }
}
</script>

<style lang="scss">
.RaceFormSelectLocation {
    .el-form-item {
        margin-bottom: 0;
    }
}
</style>

<style lang="scss" scoped>
.RaceFormSelectLocation {
  overflow: hidden;
}
</style>
