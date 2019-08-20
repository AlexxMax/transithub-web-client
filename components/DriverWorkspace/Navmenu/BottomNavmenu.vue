<template>
  <div class="BottomNavmenu">
    <div class="BottomNavmenu__footer mobile-driver-workspace__container" v-if="bottomNavbarVisible">

      <div class="BottomNavmenu__footer__home">
        <nuxt-link
          :to="$i18n.path(`driver`)"
          exact-active-class="is-active"
          exact
          class="link"
        >
          <fa class="icon" icon="home" />
          <span>{{ $t('links.system.home') }}</span>
        </nuxt-link>
      </div>

      <div class="BottomNavmenu__footer__add">
        <div id="half-circle-wrapper"></div>

        <Button circle>
          <fa class="icon" id="add-icon" icon="plus" />
        </Button>
        <span>{{ $t('forms.common.createRace') }}</span>
      </div>

      <div class="BottomNavmenu__footer__settings">
        <nuxt-link
          :to="$i18n.path(`driver/profile`)"
          exact-active-class="is-active"
          exact
          class="link"
        >
          <fa class="icon" icon="cog" />
          <span>{{ $t('links.system.settings') }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

export default {
  components: {
    Button
  },

  computed: {
    bottomNavbarVisible() {
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
#half-circle-wrapper {
  height: 20px;
  width: 48px;
  border-radius: 50px 50px 0 0;
  background: white;
  border-top: 2px solid #EBEEF5;
  box-shadow: 0px -1px 9px rgba(0, 0, 0, 0.03);
  margin-top: -6px;
}

.BottomNavmenu {
  position: fixed !important;
  height: 55px;
  background-color: white;
  z-index: 5;
  border-top: 1px solid #EBEEF5;
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 0px -1px 9px rgba(0, 0, 0, 0.03);
  bottom: 0;
  left: 0;
  right: 0;



  &__footer {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-around;
    padding: 0 20px;

    .icon {
      font-size: 19px;
    }

    #add-icon {
      font-size: 25px;
    }

    &__add {
      margin: {
        top: -20px;
        left: 30px;
      }
    }

    .link {
      margin-top: 5px;

      &:hover,
      &:focus,
      &.nuxt-link-active {
        color: $--color-primary;
      }
    }

    .link, &__add {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $--main-text-color;

      span {
        font-size: 8px;
        margin-top: 5px;
      }
    }

    &__home, &__add, &__settings {
      cursor: pointer;
    }
  }
}

.el-button {
  border: none;
  font-size: 15px;
  padding: 8px 10px !important;
  background: $--color-primary;
  color: white;
  margin-top: -15px;
}

.is-active {
  color: $--color-primary !important;
}

.el-button--text:hover, .el-button--text:focus {
  background: $--color-primary;
  color: white;
}

@media screen and (max-width: 359px) {
  .BottomNavmenu__footer {
    padding: 0 30px;
  }
}
</style>
