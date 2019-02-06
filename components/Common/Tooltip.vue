<template>
  <el-tooltip
    effect="dark"
    :content="content"
    placement="top"
    :open-delay="500"
    :disabled="$_smallDeviceMixin_isDeviceSmall"
  >
    <slot/>
  </el-tooltip>
</template>

<script>
import { screen } from '@/mixins/smallDevice'

export default {
  name: 'th-tooltip',

  mixins: [ screen() ],

  props: {
    content: String
  }
}
</script>
