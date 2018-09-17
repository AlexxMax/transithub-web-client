<template>
  <th-avatar :name="name" :size="40" :cursor="false" radius5px />
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
    }
  }
}
</script>
