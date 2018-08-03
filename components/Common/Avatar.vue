<template>
  <avatar :username="name" :size="size" :class="{ 'th-avatar': rounded, 'th-avatar-shadow': shadow, 'th-avatar-cursor': cursor }" :rounded="rounded" />
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  props: {
    size: {
      type: Number,
      default: 30
    },
    shadow: {
      type: Boolean,
      default: true
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
    rounded: {
      type: Boolean,
      default: true
    }
  },

  components: {
    Avatar
  }
};
</script>

<style lang="scss" scoped>
.th-avatar {
  border-radius: 50%;
}

.th-avatar-cursor {
  cursor: pointer;
}

.th-avatar-shadow {
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0 12px rgba(9, 30, 66, 0.42);
  }
}
</style>
