<template>
  <el-tooltip
    effect="dark"
    :content="content"
    :placement="placement"
    :open-delay="500"
    :disabled="$_smallDeviceMixin_isDeviceSmall"
  >
    <slot/>

    <div slot="content" v-if="slotContent" v-html="slotContent"/>
  </el-tooltip>
</template>

<script>
import { screen } from '@/mixins/smallDevice'

export default {
  name: 'th-tooltip',

  mixins: [ screen() ],

  props: {
    content: {
      type: String,
      default: null
    },
    slotContent: String,
    placement: {
      type: String,
      default: 'top'
    }
  }
}
</script>
