<template>
  <div class="DriverAvatar">
    <Avatar :size="size" :name="name"/>
  </div>
</template>

<script>
import Avatar from "@/components/Common/Avatar";

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
  border-radius: 50%;
  border: 2px solid rgba(175, 176, 178, 0.25);
  width: fit-content;
}
</style>
