<template>
  <div class="VehicleAvatar">
    <Avatar
      :size="size"
      :name="name"
      bordered
    />
  </div>
</template>

<script>
import Avatar from '@/components/Common/Avatar'

export default {
  name: 'th-vehicle-avatar',

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
}
</script>

<style lang='scss' scoped>
.VehicleAvatar {
  width: fit-content;
}
</style>
