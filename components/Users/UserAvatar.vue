<template>
  <th-avatar :name="name" :size="size" />
</template>

<script>
import Avatar from '@/components/Common/Avatar'

export default {
  name: 'th-user-avatar',

  components: {
    "th-avatar": Avatar
  },

  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: Number,
      default: 40
    }
  }
}
</script>
