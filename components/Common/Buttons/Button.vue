<template>
  <el-button
    :class="{ 'Button__simple': simple, 'Button__hover-underline': hoverUnderline }"
    size="small"
    :type="type"
    :round="round"
    :circle="circle"
    :loading="loading"
    :disabled="disabled"
    :icon="icon"
    :autofocus="autofocus"
    :native-type="nativeType"
    :plain="plain"
    @click="$emit('click')">
    <fa v-if=faIcon :icon="faIcon" class="Button__icon-fa"/>
    <slot />
    <fa v-if=faIconSuffix :icon="faIconSuffix" class="Button__icon-fa-suffix"/>
  </el-button>
</template>

<script>
export default {
  name: 'th-button',

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
    },
    plain: Boolean,
    simple: Boolean, // color: inherit
    faIcon: String,
    faIconSuffix: String,
    hoverUnderline: Boolean
  }
}
</script>

<style>
.Button__simple {
  color: inherit;
}

.Button__icon-fa {
  margin-right: 5px;
  width: 15px;
}

.Button__icon-fa-suffix {
  margin-left: 5px;
  width: 15px;
}

.Button__hover-underline:hover {
  text-decoration: underline;
}
</style>
