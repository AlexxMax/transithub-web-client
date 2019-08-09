<template>
  <div class="PQWarehousesAvatar">

    <Avatar
      :size="size"
      :name="name"
      square
    />

  </div>
</template>

<script>
import Avatar from '@/components/Common/Avatar'

export default {
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
.PQWarehousesAvatar {
  width: fit-content;
}
</style>
