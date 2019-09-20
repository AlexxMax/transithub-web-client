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

        <div class="TopNavmenu__header__right__overlay">
          <nuxt-link
            :to="$i18n.path(`driver/settings`)"
            exact
            class="link"
          >
            <fa class="icon-settings" icon="cog" />
          </nuxt-link>
        </div>
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
  border-bottom: $--driver-workspace-border;
  width: 100%;
  display: flex;
  justify-content: center;

  @include for-extra-small {
    margin-top: -1px;
    border-bottom: 1px solid white;
  };

  &__header {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 $--driver-workspace-padding;

    &__left, &__right {
      cursor: pointer;
    }

    &__right {
      &__overlay {
        position: absolute;
        top: 15%;
        height: 38px;
        width: 38px;
        cursor: pointer;

        .icon-settings {
          color: $--main-text-color;
          font-size: 16px;
          position: absolute;
          bottom: -2px;
          right: 0;
        }
      }
    }
  }
}
</style>