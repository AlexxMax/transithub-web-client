<template>
  <el-dialog
    v-if="text"
    :title="title || $t('forms.common.more')"
    :visible="visible"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="$emit('close')">

    <p class="TextFullView">{{ text }}</p>

  </el-dialog>
</template>

<script>
import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

export default {
  name: 'th-text-full-view',

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  props: {
    title: {
      type: String,
      default: ''
    },
    text: String,
    visible: Boolean
  }
}
</script>

<style lang="scss" scoped>
.TextFullView {
  min-height: 50vh;
  width: 100%;
  word-wrap: break-word;
}
</style>
