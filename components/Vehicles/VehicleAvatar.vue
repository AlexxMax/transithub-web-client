<template>
  <div class="VehicleAvatar">
    <Avatar
      :size="size"
      :name="name"
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
  border-radius: 50%;
  border: 2px solid rgba(175, 176, 178, 0.25);
  width: fit-content;
}
</style>
