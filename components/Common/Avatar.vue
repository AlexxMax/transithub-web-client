<template>
  <el-avatar
    :class="['common-avatar', { 'common-avatar--hover': hover }, { 'common-avatar--bordered': bordered }]"
    :size="size"
    :shape="square ? 'square': 'circle'"
    :alt="name"
    :style="`cursor: ${cursor ? 'pointer' : 'default'}; min-width: ${size}px`"
  >{{ initial }}</el-avatar>
</template>

<script>

export default {
  props: {
    size: {
      type: [String, Number],
      default: 30
    },

    cursor: {
      type: Boolean,
      default: false
    },

    hover: {
      type: Boolean,
      default: false
    },

    bordered: {
      type: Boolean,
      default: false
    },

    square: {
      type: Boolean,
      default: false
    },

    name: {
      type: String,
      required: true,
      default: '+'
    }
  },

  computed: {
    initial() {
      let parts = this.name.split(/[ -]/)
      let initials = ''

      for (let i = 0; i < parts.length; i++)
      initials += parts[i].charAt(0)

      if (initials.length > 3 && initials.search(/[A-Z]/) !== -1)
      initials = initials.replace(/[a-z]+/g, '')

      initials = initials.substr(0, 2).toUpperCase()
      return initials
    }
  }

}
</script>

<style lang="scss" scoped>
.common-avatar {

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  &--hover {
      box-shadow: 0 0 1px 4px rgba(175, 176, 178, 0.1);
      transition: .2s;

      &:hover {
        box-shadow: 0 0 2px 4px rgba(175, 176, 178, 0.2);
      }
  }

  &--bordered {
      border-radius: 50%;
      box-shadow: 0 0 0 3px rgba(192, 196, 204, 0.25);
  }

}
</style>
