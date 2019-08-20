<template>
  <div class="TopNavmenu">
    <div class="TopNavmenu__header mobile-driver-workspace__container">
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
.TopNavmenu {
  position: fixed !important;
  height: 55px;
  background-color: white;
  z-index: 5;
  border-bottom: 1px solid #EBEEF5;
  width: 100%;
  display: flex;
  justify-content: center;

  &__header {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;


    &__left, &__right {
      cursor: pointer;
    }
  }
}
</style>
