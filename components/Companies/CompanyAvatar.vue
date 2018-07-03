<template>
  <th-avatar :name="name" :size="40" :shadow=false :cursor=false :rounded=false />
</template>

<script>
import Avatar from "@/components/Common/Avatar.vue"

export default {
  components: {
    "th-avatar": Avatar
  },

  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
