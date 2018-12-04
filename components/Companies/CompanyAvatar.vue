<template>
  <th-avatar :name="name" :size="size" :cursor="false" radius5px />
</template>

<script>
import Avatar from "@/components/Common/Avatar.vue"

export default {
  name: 'th-company-avatar',

  components: {
    "th-avatar": Avatar
  },

  props: {
    name: {
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
