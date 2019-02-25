<template>
  <Tooltip class="item" :content="tooltip" placement="top">
    <th-button
      type="text"
      :icon="icon"
      :disabled="disabled"
      :style="`padding: 10px; font-size: 16px; color: ${color};`"
      @click="$emit('click')">
      <slot />
    </th-button>
  </Tooltip>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Tooltip from '@/components/Common/Tooltip'

export default {
  components: {
    "th-button": Button,
    Tooltip
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
