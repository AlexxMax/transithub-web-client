<template>
  <div>
    <avatar class="th-avatar" :fullname="username"></avatar>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar/Avatar";

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
.th-avatar {
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0 12px rgba(33, 33, 33, 0.315);
  }
}
</style>
