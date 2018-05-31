<template>
  <div>
    <avatar fullname="sdfsf asdadf" size="55"></avatar>
  </div>
</template>

<script>
import Avatar from "vue-avatar-component";

export default {
  components: {
    Avatar
  },

  computed: {
    username: function() {
      return this.$store.getters["user/username"];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
