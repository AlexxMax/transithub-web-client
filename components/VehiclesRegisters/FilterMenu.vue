<template>
  <th-right-view
    :show="show"
    :title="$t('lists.filter')"
    @close="$emit('close')">
  </th-right-view>
</template>

<script>
import RightView from '@/components/Common/RightView'

export default {
  components: {
    'th-right-view': RightView
  },

  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
