<template>
  <el-button
    size="small"
    :type="type"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :autofocus="autofocus"
    :native-type="nativeType"
    @click="$emit('click')">
    <slot />
  </el-button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    nativeType: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<style>

</style>
