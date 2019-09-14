<template>
  <div class="ChangePassword">

    <div class="ChangePassword__header-wrapper">
      <div class="ChangePassword__header-wrapper__content">

        <div class="ChangePassword__header-wrapper__content__header">
          <ButtonBack
            id="left-position"
            style="margin-bottom: 0;"
            :before-click="handleBeforeClose"
            :to="$i18n.path('driver/settings')"
          />

          <span class="ChangePassword__header-wrapper__content__header-title">{{ $t('forms.common.passwordChange') }}</span>
        </div>
      </div>
    </div>

    <AuthChangePassword
      ref="AuthChangePassword"
      class="ChangePassword__body-wrapper"
      :component="component"
      :user="user"
      :size-button="size"
      :font-size-button="fontSize"
      :width-button="widthButton"
      :margin-button="marginButton"
    />
  </div>
</template>

<script>
import ButtonBack from '@/components/Common/FormElements/Constituents/ButtonBack'
import AuthChangePassword from '@/components/Auth/AuthChangePassword'

import closeDialog from '@/mixins/closeDialog'
import { VALIDATION_TRIGGER } from '@/utils/constants'

export default {
  name: "th-drivers-change-password",

  mixins: [closeDialog('password')],

  components: {
    ButtonBack,
    AuthChangePassword
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data() {
    const validation = {
      oldPassword: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.oldPassword")));
        }
        cb();
      },

      newPassword: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.newPassword")));
        }
        cb();
      },

      newPasswordCheck: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.newPasswordCheck")));
        } else if (value !== this.password.newPassword) {
          cb(new Error(this.$t("forms.user.validation.newPasswordCheckDiff")));
        }
        cb();
      }
    }

    return {
      component: 'div',
      size: 'default',
      fontSize: '16px',
      widthButton: '100%',
      marginButton: '0 auto',

      password: {
        oldPassword: "",
        newPassword: "",
        newPasswordCheck: ""
      },

      rulesPassword: {
        oldPassword: [
          {
            required: true,
            validator: validation.oldPassword,
            trigger: VALIDATION_TRIGGER,
            max: 500
          }
        ],
        newPassword: [
          {
            required: true,
            validator: validation.newPassword,
            trigger: VALIDATION_TRIGGER,
            max: 500
          }
        ],
        newPasswordCheck: [
          {
            required: true,
            validator: validation.newPasswordCheck,
            trigger: VALIDATION_TRIGGER,
            max: 500
          }
        ]
      }
    }
  },

  methods: {
    handleBeforeClose(cb) {
      this.$refs.AuthChangePassword.handleBeforeClose(() => cb(false))
    },

    onUpdatePassword: function() {
      this.$refs.formPassword.validate(async valid => {
        if (valid) {
          const { oldPassword, newPassword } = this.password;
          try {
            const {
              userExist,
              status,
              msg
            } = await this.$api.users.changePassword({
              oldPassword,
              newPassword
            });
            if (msg) {
              throw new Error(msg);
            } else if (userExist && status) {
              notify.success(this.$t("forms.user.messages.savePasswordSuccess"))
            } else {
              throw new Error(this.$t("forms.user.messages.savePasswordError"));
            }
          } catch (e) {
            notify.error(e.message);
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ChangePassword {
  background-color: #fff;

  &__header-wrapper {
    border-top: 0;
    color: $--main-text-color;

    &__content {
      display: flex;
      flex-direction: column;
      padding: {
        top: $--driver-workspace-padding;
        right: $--driver-workspace-padding;
        bottom: 30px;
        left: $--driver-workspace-padding;
      }

      &__header {
        display: flex;
        flex-direction: row;

        #left-position {
          flex: 1;
        }

        &::after {
          content: '';
          flex: 1;
        }

        &-title {
          font-size: 13px;
          font-weight: bold;
        }
      }
    }
  }

  &__body-wrapper {
    padding: {
      top: 0;
      right: $--driver-workspace-padding;
      bottom: $--driver-workspace-padding;
      left: $--driver-workspace-padding;
    }
  }
}

.el-form-item {
  margin-bottom: 20px !important;
}

.el-button {
  font-size: 16px !important;
}
</style>
