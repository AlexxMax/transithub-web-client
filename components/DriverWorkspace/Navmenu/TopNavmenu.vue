<template>
  <div>
    <div class="TopNavmenu__header">
      <div class="TopNavmenu__header__left">
        <MainLogo :to="$i18n.path('driver')"/>
      </div>

      <div class="TopNavmenu__header__right">
        <Avatar
          :name="username"
          :size="38"
          cursor
          hover
        />
      </div>
    </div>
  </div>
</template>

<script>
import MainLogo from "@/components/Navmenu/MainLogo"
import Avatar from '@/components/Common/Avatar'

export default {
  components: {
    MainLogo,
    Avatar
  },

  computed: {
    username: function() {
      return this.$store.getters["user/username"];
    }
  }
}
</script>

<style lang="scss" scoped>
.TopNavmenu__header {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  position: fixed !important;
  padding: 0 20px;
  height: 55px;
  background-color: white;
  z-index: 5;
  width: 90%;
  border-bottom: 1px solid #EBEEF5;

  &__left, &__right {
    cursor: pointer;
  }
}
</style>