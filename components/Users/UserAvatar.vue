<template>
  <th-avatar :name="username" :size="size" />
</template>

<script>
import Avatar from '@/components/Common/Avatar'

export default {
  name: 'th-user-avatar',

  components: {
    "th-avatar": Avatar
  },

  props: {
    username: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 40
    }
  }
}
</script>
