<template>
  <div class="DriverAvatar">
    <Avatar :size="size" :name="name" cursor bordered />
  </div>
</template>

<script>
import Avatar from '@/components/Common/Avatar'

export default {
  name: "th-driver-avatar",

  components: {
    Avatar
  },

  props: {
    size: {
      type: Number,
      default: 44
    },
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang='scss' scoped>
.DriverAvatar {
  width: fit-content;
}
</style>
