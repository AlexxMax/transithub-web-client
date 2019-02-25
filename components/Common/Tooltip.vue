<template>
  <el-tooltip
    effect="dark"
    :open-delay="1000"
    :content="content"
    :placement="placement"
    :disabled="$_smallDeviceMixin_isDeviceSmall || disabled"
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
    },
    disabled: Boolean

  }
}
</script>
