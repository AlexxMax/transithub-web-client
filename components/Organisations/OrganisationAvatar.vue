<template>
  <div class="OrganisationAvatar">
    <Avatar :size="size" :name="name" :cursor="false" radius5px/>
  </div>
</template>

<script>
import Avatar from "@/components/Common/Avatar";

export default {
  name: "th-organisation-avatar",

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
.OrganisationAvatar {
  width: fit-content;
}
</style>
