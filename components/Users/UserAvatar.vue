<template>
  <th-avatar :name="username" :size="40" :cursor="false" />
</template>

<script>
import Avatar from "@/components/Common/Avatar.vue"

export default {
  components: {
    "th-avatar": Avatar
  },

  props: {
    username: {
      type: String,
      required: true
    }
  }
}
</script>
