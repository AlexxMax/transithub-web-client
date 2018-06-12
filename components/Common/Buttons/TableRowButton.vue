<template>
  <el-tooltip class="item" effect="dark" :content="tooltip" placement="top" :open-delay="500">
    <th-button
      type="text"
      :icon="icon"
      :disabled="disabled"
      :style="`padding: 10px; font-size: 16px; color: ${color};`"
      @click="$emit('click')">
      <slot />
    </th-button>
  </el-tooltip>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

export default {
  components: {
    "th-button": Button
  },

  props: {
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
</style>
