<template>
  <div class="Settings">
    
    <div class="Settings__card-wrapper">
      <div class="Settings__card-wrapper__content">

        <div class="Settings__card-wrapper__content__header">
          <span class="Settings__card-wrapper__content__header-title">
            {{ $t('links.system.settings') }}
          </span>
        </div>

        <div class="Settings__card-wrapper__content__user-info">
          <Avatar
            class="Settings__card-wrapper__content__user-info-avatar"
            :name="username"
            :size="80"
            hover
          />

          <span class="Settings__card-wrapper__content__user-info-fullname">{{ username }}</span>
          <span class="Settings__card-wrapper__content__user-info-phone">
            {{ phone }}
          </span>
        </div>
      </div>
    </div>

    <div class="Settings__personal-info-wrapper">
      <span class="Settings__personal-info-wrapper-title">
        {{ $t('forms.driverWorkspace.personalInfo') }}
      </span>

      <div class="Links">
        <RouteLink 
          class="Links__link"
          component="nuxt-link"
          v-for="(link, index) of personalInfoLinks"
          :key="index"
          :title="link.title"
          :fa-icon="link.icon"
          :to="link.to"
        />
      </div>
    </div>

    <div class="Settings__support-wrapper">
      <span class="Settings__support-wrapper-title">
        {{ $t('forms.driverWorkspace.support') }}
      </span>

      <div class="Links">
        <RouteLink 
          class="Links__link"
          component="a"
          v-for="(link, index) of supportLinks"
          :key="index"
          :title="link.title"
          :fa-icon="[ 'fab', 'telegram-plane' ]"
          :href="link.href"
          rel="noopener"
          target="_blank"
        />
      </div>
    </div>

    <div class="Settings__log-out-wrapper">

      <div class="Links">
        <RouteLink 
          class="Links__link"
          component="router-link"
          :title="$t('links.system.logout')"
          fa-icon="sign-out-alt"
          @click.native="logout"
          to="/"
          :log-out-color="logOutColor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Common/Avatar'
import RouteLink from '@/components/DriverWorkspace/Settings/RouteLink'

export default {
  name: "th-drivers-settings",

  components: {
    Avatar,
    RouteLink
  },

  data() {
    return {
      personalInfoLinks: [{
        to: this.$i18n.path(`driver/settings/user-profile`),
        title: this.$t('forms.driverWorkspace.editPersonalInfo'),
        icon: 'user'
      }, {
        to: this.$i18n.path(`driver`),
        title: this.$t('forms.driverWorkspace.editDriverInfo'),
        icon: 'address-card'
      }, {
        to: this.$i18n.path(`driver/settings/change-password`),
        title: this.$t('forms.common.changePassword'),
        icon: 'unlock-alt'
      }],

      supportLinks: [{
        href: "https://t.me/TH_support",
        title: 'Telegram'
      }, {
        href: "https://t.me/TrackCheckBot",
        title: 'TrackCheckBot'
      }],

      logOutColor: '#F56C6C'
    }
  },

  computed: {
    username() {
      return this.$store.getters["user/username"]
    },

    phone() {
      return this.$store.state.user.phone
    }
  },

  methods: {
    logout: async function() {
      this.$nuxt.layoutName = "public";
      this.$store.dispatch("user/userLogout");
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.Settings {
  background-color: #FAFCFF;
}

.Settings__card-wrapper {
  background-color: #fff;
  max-height: 250px;
  border-radius: 0px 0px 5px 5px;
  border-top: 0;
  margin-bottom: 30px;
  box-shadow: 0px -1px 9px rgba(0, 0, 0, 0.07);
  color: $--main-text-color;

  &__content {
    display: flex;
    flex-direction: column;
    padding: {
      top: 20px;
      right: 20px;
      bottom: 25px;
      left: 20px;
    }

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: center;

      &-title {
        font-size: 13px;
        font-weight: bold;
      }
    }

    &__user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 35px;

      &-fullname {
        margin-top: 15px;
        font-size: 20px;
        font-weight: bold;
        color: #000;
      }

      &-phone {
        margin-top: 5px;
        font-size: 13px;
      }
    }
  }
}

.Settings__personal-info-wrapper {
  &-title {
    font-size: 13px;
    color: #000;
    font-weight: bold;
    margin-left: 25px;
  }
}

.Settings__support-wrapper {
  margin-top: 30px;

  &-title {
    font-size: 13px;
    color: #000;
    font-weight: bold;
    margin-left: 25px;
  }
}

.Settings__log-out-wrapper {
  margin-top: 30px;
  padding-bottom: 20px;
}

.Links {
  margin-top: 10px;

  &__link {
    width: 100vw;

    &:not(:last-child) {
      border-bottom: 1px solid #EBEEF5;
    }

    &:nth-child(2) {
      margin-right: 5px;
    }
  }
}

.el-avatar {
  font-size: 20px !important;
}

@media screen and (max-width: 320px) {
  .Settings__card-wrapper {
    &__content {
      &__user-info {
        &-fullname {
          font-size: 18px;
        }

        &-phone {
          font-size: 12px;
        }
      }
    }
  }
}
</style>