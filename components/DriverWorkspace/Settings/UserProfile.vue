<template>
  <div class="UserProfile">

    <div class="UserProfile__header-wrapper">
      <div class="UserProfile__header-wrapper__content">

        <div class="UserProfile__header-wrapper__content__header">
          <ButtonBack id="left-position" style="margin-bottom: 0;"/>

          <span class="UserProfile__header-wrapper__content__header-title">
            {{ $t('forms.driverWorkspace.personalInfo') }}
          </span>
        </div>

        <Avatar
          class="UserProfile__header-wrapper__content__user-avatar"
          :name="username"
          :size="80"
          hover
        />
      </div>
    </div>

    <div class="UserProfile__body-wrapper">
      <el-form
        v-loading="loading"
        :model="user"
        :rules="rulesMain"
        ref="formMain"
        label-width="120px"
        label-position="top"
      >
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-form-item :label="$t('forms.user.common.firstname')" prop="firstname">
              <el-input
                v-model="user.firstname"
                :placeholder="$t('forms.user.placeholdes.firstname')"
                :maxlength="100"
                @change="handleInputChange"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-form-item :label="$t('forms.user.common.lastname')" prop="lastname">
              <el-input
                v-model="user.lastname"
                :placeholder="$t('forms.user.placeholdes.lastname')"
                :maxlength="100"
                @change="handleInputChange"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-form-item :label="$t('forms.common.email')" prop="email">
              <el-input
                v-model="user.email"
                type="email"
                :placeholder="$t('forms.user.placeholdes.email')"
                :maxlength="500"
                @change="handleInputChange"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-form-item :label="$t('forms.common.phone')" prop="phone">
              <el-input
                v-mask="phoneMask"
                v-model="user.phone"
                type="phone"
                :placeholder="$t('forms.user.placeholdes.phone')"
                @keydown.delete.native="handlePhoneDelete"
                @change="handlePhoneChange"
              >
                <i
                  :class="{ 'el-icon-success': phoneChecked, 'el-icon-error': !phoneChecked, 'el-input__icon': true }"
                  slot="prefix"
                ></i>
                <i class="el-icon-edit el-input__icon" slot="suffix"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <el-form-item :label="$t('forms.common.uiLanguage')">
              <el-select
                style="width: 100%"
                v-model="user.language"
                placeholder="Select"
                @change="handleInputChange"
              >
                <el-option
                  v-for="(lang, index) in langs"
                  :key="index"
                  :label="lang.label"
                  :value="lang.value"
                >{{lang.label}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <Button
              style="width: 100%; margin-top: 15px"
              type="primary"
              size="default"
              round
              @click="submit"
            >{{ $t('forms.common.save') }}</Button>
          </el-col>
        </el-row>
              
      </el-form>
    </div>

    <UserPhoneConfirmation
      ref="pin-dialog"
      :phone="phone"
      :main-button-label="$t('forms.common.approvePhone')"
      emit-repeat
      @submit="handlePhoneConfirmation"
      @repeat="sendPinToUser"
      @close="handlePhoneConfirmationClose"
    />
  </div>
</template>

<script>
import ButtonBack from '@/components/Common/FormElements/Constituents/ButtonBack'
import Button from "@/components/Common/Buttons/Button"
import Avatar from '@/components/Common/Avatar'
import UserPhoneConfirmation from "@/components/Users/UserPhoneConfirmation"

import { VALIDATION_TRIGGER, PHONE_MASK } from "@/utils/constants"
import { getLangFromRoute } from '@/utils/locale'
import { userPhoneIsUnique } from '@/utils/user'

import * as notify from '@/utils/notifications'

export default {
  name: "th-drivers-user-profile",

  components: {
    ButtonBack,
    Button,
    Avatar,
    UserPhoneConfirmation
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data() {
    const validation = {
      firstname: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.firstname")));
        }
        cb();
      },

      lastname: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.lastname")));
        }
        cb();
      },

      email: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.email")));
        }
        cb();
      },

      phone: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.user.validation.phone")));
        }
        cb();
      },

      phoneValid: (rule, value, cb) => {
        if (!value.pValidPhone()) {
          cb(new Error(this.$t("forms.user.validation.incorrectPhone")));
        }
        cb();
      }
    };

    return {
      loading: false,

      phoneMask: PHONE_MASK,
      phone: "",
      oldPhone: "",
      phoneChecked: false,

      langs: [
        {
          value: "ua",
          label: "Українська"
        },{
          value: "ru",
          label: "Русский"
        }
      ],

      rulesMain: {
        firstname: [
          {
            required: true,
            validator: validation.firstname,
            trigger: VALIDATION_TRIGGER,
            max: 100
          }
        ],

        lastname: [
          {
            required: true,
            validator: validation.lastname,
            trigger: VALIDATION_TRIGGER,
            max: 100
          }
        ],

        email: [
          {
            required: true,
            validator: validation.email,
            trigger: VALIDATION_TRIGGER,
            max: 500
          },
          {
            type: "email",
            message: this.$t("forms.user.validation.incorrectEmail"),
            trigger: ["blur", "change"]
          }
        ],

        phone: [
          {
            required: true,
            validator: validation.phone,
            trigger: VALIDATION_TRIGGER,
            max: 13
          },
          {
            type: "string",
            validator: validation.phoneValid,
            trigger: ["blur", "change"]
          }
        ]
      }
    }
  },

  computed: {
     username() {
      return this.$store.getters["user/username"];
    }
  },

  methods: {
    handleInputChange() {
      this.$emit("changed", true);
    },

    submit: function(done) {
      this.validate(valid => {
        if (valid) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start();

            const success = await this.updateUser()

            this.$nuxt.$loading.finish();

            if (done) {
              done(success)
            }
          });
        } else if (done) {
          done(false);
        }
      })
    },

    async handlePhoneChange() {
      this.phoneChecked = false;
      if (
        this.user.phone !== this.oldPhone &&
        this.user.phone &&
        this.validationPhone()
      ) {
        this.loading = true;
        const phoneIsUnique = await this.phoneIsUnique(this.user.phone);
        this.loading = false;

        if (phoneIsUnique === 1) {
          if (this.sendPinToUser()) {
            this.$refs["pin-dialog"].show();
          }
        } else if (phoneIsUnique === 2) {
          notify.error(
            this.$t("messages.phoneIsNotUnique").replace("%1", this.user.phone)
          );
        }
      } else if (this.user.phone === this.oldPhone) {
        this.phoneChecked = true;
      }
    },

    handlePhoneDelete(e) {
      if (this.user.phone.length < 4) {
        e.preventDefault();
      }
    },

    async handlePhoneConfirmation() {
      const pinDialog = this.$refs["pin-dialog"];
      const pin = pinDialog.getPin();

      pinDialog.loading = true;

      try {
        const { status, valid } = await this.$api.users.checkPhoneByPin(
          this.phone,
          pin
        );

        if (status) {
          if (valid) {
            this.phoneChecked = true;
            this.$emit("changed", true);
            pinDialog.loading = false;
            pinDialog.hide();
          } else {
            throw new Error(this.$t("messages.inccorectPin"));
          }
        } else {
          throw new Error(this.$t("messages.errorOnServer"));
        }
      } catch ({ message }) {
        notify.error(message);
      }
    },

    handlePhoneConfirmationClose() {
      if (!this.phoneChecked) {
        this.user.phone = this.oldPhone.pMaskPhone();
      }
    },

    async phoneIsUnique(phone) {
      return await userPhoneIsUnique.call(this, phone);
    },

    async sendPinToUser() {
      this.loading = true;
      const formPhone = this.user.phone.pUnmaskPhone();
      const { status, pinSended, phone } = await this.$api.users.sendPinToUser(
        formPhone,
        null,
        true
      );
      this.loading = false;
      if (!status) {
        notify.error(this.$t("messages.cantSendPinCodeByPhone"));
      }

      if (status && pinSended) {
        this.phone = phone;
        return true;
      }
      return false;
    },

    validate(done) {
      this.$refs.formMain.validate(valid => {
        const validEmail = this.validationEmail();
        const validPhone = this.validationPhone();
        if (valid && validEmail && validPhone) {
          done(true);
        } else {
          done(false);
        }
      })
    },

    async updateUser() {
      const updated = await this.$store.dispatch("user/userUpdate", {
        ...this.user,
        phone: this.user.phone.pUnmaskPhone(),
        phoneChecked: this.phoneChecked
      });

      if (updated) {
        notify.success(this.$t("forms.user.messages.saveMainSuccess", this.user.language))

        this.$emit("changed", false);

        const currentLocale = getLangFromRoute(
          this.$store.state.locales,
          this.$route.fullPath
        );
        this.$router.push(
          this.$route.fullPath.replace(
            "/" + currentLocale + "/",
            "/" + this.user.language + "/"
          )
        );

        return true;
      }

      return false;
    },

    validationEmail() {
      if (!this.user.email.pEmailValid()) {
        notify.error(this.$t("forms.user.validation.incorrectEmail"));
        return false;
      }
      return true;
    },

    validationPhone() {
      if (!this.user.phone.pValidPhone()) {
        notify.error(this.$t("forms.user.validation.incorrectPhone"));
        return false;
      }
      return true;
    }
  },

  created() {
    this.oldPhone = this.user.phone;
    this.phoneChecked = this.user.phoneChecked;
  }
}
</script>

<style lang="scss" scoped>
.UserProfile {
  background-color: #fff;

  &__header-wrapper {
    border-top: 0;
    color: $--main-text-color;

    &__content {
      display: flex;
      flex-direction: column;
      padding: $--driver-workspace-padding;

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

      &__user-avatar {
        align-self: center;
        margin-top: 35px;
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

.el-avatar {
  font-size: 20px !important;
}

.el-form-item {
  margin-bottom: 20px !important;
}

.el-button {
  font-size: 16px !important;
}
</style>