<template>
  <avatar
    :username="name"
    :size="size"
    :customStyle="{
      borderRadius: radius5px ? '5px' : '50%',
      cursor: cursor ? 'pointer' : '',
      minWidth: size + 'px'
    }"/>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  props: {
    size: {
      type: Number,
      default: 30
    },
    cursor: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      required: true,
      default: '+'
    },
    radius5px: {
      type: Boolean,
      default: false
    }
  },

  components: {
    Avatar
  }
};
</script>
