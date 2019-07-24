<template>
  <div class="th-user-profile-wrapper">
    <div class="th-user-profile">
      <!-- HEADER -->
      <div class="th-user-profile-header-wrapper">
        <div class="th-user-profile-header">
          <th-user-avatar
            slot="reference"
            :name="username"
            class="th-user-avatar"
            :size="100"
            :cursor="false"
          />
          <div class="th-user-profile-header-titles">
            <span class="th-user-profile-header-title">{{ username }}</span>
            <span class="th-user-profile-header-subtitle">{{ user.email }}</span>
          </div>
        </div>
      </div>

      <!-- BODY -->
      <el-tabs v-model="activeTab">
        <!-- MAIN TAB -->
        <el-tab-pane name="main">
          <span slot="label">{{ $t('forms.user.profile.tabMain') }}</span>

          <div class="th-user-profile-body-wrapper">
            <div class="th-user-profile-body">
              <el-form
                v-loading="loading"
                :model="user"
                :rules="rulesMain"
                ref="formMain"
                label-width="120px"
                size="mini"
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
                      round
                      @click="submit"
                    >{{ $t('forms.common.save') }}</Button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </el-tab-pane>

        <!-- COMPANIES TAB -->
        <!-- <el-tab-pane name="companies">
          <span slot="label">
            {{ $t('forms.user.profile.tabCompanies') }}
          </span>

          <div class="th-user-profile-body-wrapper">
            <div class="th-user-profile-body">
              <div v-for="(company, index) of companies" :key="index">
                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="16" :lg="16">
                    <div class="th-user-profile-company-widget-wrapper">
                      <div class="th-user-profile-company-widget">
                        <div class="th-user-profile-company-widget-header">
                          <th-company-avatar :name="company.name" />
                          <div class="th-user-profile-company-widget-header-titles">
                            <span class="th-user-profile-company-widget-header-main-title">
                              {{ company.workname }}
                              <fa v-if="getUserActive(company)" icon="check-circle" style="color: #67C23A" />
                            </span>
                            <span class="th-user-profile-company-widget-header-main-subtitle">{{ company.description || company.fullname }}</span>
                            <span class="th-user-profile-company-widget-header-subtitle">{{ getUserRoleName(company) }}</span>
                          </div>
                        </div>
                        <div class="th-user-profile-company-widget-btns">
                          <Button
                            style="width: 120px"
                            :type="getUserActive(company) === true ? 'info' : 'success'"
                            @click="onCompanyActivation(company, index)">
                            {{ getUserActive(company) === true ? $t('forms.user.profile.deactivateCompany') : $t('forms.user.profile.activateCompany')}}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-tab-pane>-->

        <!-- PASSWORD TAB -->
        <el-tab-pane name="password">
          <span slot="label">{{ $t('forms.user.profile.tabPassword') }}</span>

          <div class="th-user-profile-body-wrapper">
            <div class="th-user-profile-body">
              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <div class="UserProfile__changePassword">
                    <span>{{ $t('forms.common.forgetPassOrWantToChange') }}</span>
                    <Button
                      type="primary"
                      round
                      @click="handleChangePassword"
                    >{{ $t('forms.common.changePassword') }}</Button>
                    <!-- :loading="loadingChangePasswordRequestPin" -->
                  </div>
                </el-col>
              </el-row>

              <!-- <el-form
                :model="password"
                :rules="rulesPassword"
                ref="formPassword"
                label-width="120px"
                size="mini"
                label-position="top">
                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item
                      :label="$t('forms.user.profile.oldPassword')"
                      prop="oldPassword">
                      <el-input
                        v-model="password.oldPassword"
                        type="password"
                        :maxlength="500">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item
                      :label="$t('forms.user.profile.newPassword')"
                      prop="newPassword">
                      <el-input
                        v-model="password.newPassword"
                        type="password"
                        :maxlength="500">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item
                      :label="$t('forms.user.profile.newPasswordCheck')"
                      prop="newPasswordCheck">
                      <el-input
                        v-model="password.newPasswordCheck"
                        type="password"
                        :maxlength="500">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <Button
                      style="width: 100%; margin-top: 15px"
                      type="danger"
                      @click="onUpdatePassword">
                      {{ $t('forms.common.update') }}
                    </Button>
                  </el-col>
                </el-row>
              </el-form>-->
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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

    <DialogChangeUserPassword
      ref="dialog-change-user-password"
      :user-guid="user.guid"
      :user-email="user.email"
      :user-phone="user.phone"
    />
  </div>
</template>

<script>
import Avatar from "@/components/Common/Avatar";
// import CompanyAvatar from '@/components/Companies/CompanyAvatar'
import Button from "@/components/Common/Buttons/Button";
import UserPhoneConfirmation from "@/components/Users/UserPhoneConfirmation";
import DialogChangeUserPassword from "@/components/Users/DialogChangeUserPassword";

import { showErrorMessage, showSuccessMessage } from "@/utils/messages";
import { VALIDATION_TRIGGER, PHONE_MASK } from "@/utils/constants";
import { getLangFromRoute } from "@/utils/locale";
import { userPhoneIsUnique } from "@/utils/user";

export default {
  name: "th-user-profile",

  components: {
    "th-user-avatar": Avatar,
    // "th-company-avatar": CompanyAvatar,
    Button,
    UserPhoneConfirmation,
    DialogChangeUserPassword
  },

  props: {
    user: {
      type: Object,
      required: true
    }

    // companies: {
    //   type: Array,
    //   default: () => ([])
    // }
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
      },
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
    };

    return {
      password: {
        oldPassword: "",
        newPassword: "",
        newPasswordCheck: ""
      },

      phone: "",
      phoneMask: PHONE_MASK,
      oldPhone: "",
      loading: false,
      phoneChecked: false,

      langs: [
        {
          value: "ua",
          label: "Українська"
        },
        {
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
      },

      loadingChangePasswordRequestPin: false,

      activeTab: "main"
    };
  },

  // mounted() {
  //   this.$nextTick(async () => {
  //   this.$nuxt.$loading.start()

  //     const promises = []
  //     for (const {guid: companyGuid} of this.companies) {
  //       promises.push(this.$api.companies.getUsers({
  //         companyGuid,
  //         userGuid: this.user.guid
  //       }))
  //     }

  //     try {
  //       const results = await Promise.all(promises)
  //       for (const { status, item } of results) {
  //         if (status) {
  //           const company = this.companies.find(elem => elem.guid === item.companyGuid)
  //           company.user = item
  //         }
  //       }
  //     } catch (e) {
  //       showErrorMessage(e.message)
  //     }

  //     this.$nuxt.$loading.finish()
  //   })
  // },

  methods: {
    handlePhoneDelete(e) {
      if (this.user.phone.length < 4) {
        e.preventDefault();
      }
    },
    getUserRoleName: function(company) {
      const user = company.user || {};
      return this.$store.state.locale === "ru"
        ? user.roleNameRu
        : user.roleNameUa;
    },
    getUserActive: function(company) {
      const user = company.user || {};
      return user.active === 1;
    },
    handleInputChange() {
      this.$emit("changed", true);
    },
    async phoneIsUnique(phone) {
      return await userPhoneIsUnique.call(this, phone);
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
          showErrorMessage(
            this.$t("messages.phoneIsNotUnique").replace("%1", this.user.phone)
          );
        }
      } else if (this.user.phone === this.oldPhone) {
        this.phoneChecked = true;
      }
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
        showErrorMessage(this.$t("messages.cantSendPinCodeByPhone"));
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
      });
    },
    async updateUser() {
      const updated = await this.$store.dispatch("user/userUpdate", {
        ...this.user,
        phone: this.user.phone.pUnmaskPhone(),
        phoneChecked: this.phoneChecked
      });

      if (updated) {
        showSuccessMessage(
          this.$t("forms.user.messages.saveMainSuccess", this.user.language)
        );

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
    submit: function(done) {
      this.validate(valid => {
        if (valid) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start();

            const success = await this.updateUser();

            this.$nuxt.$loading.finish();

            if (done) {
              done(success);
            }
          });
        } else if (done) {
          done(false);
        }
      });
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
        showErrorMessage(message);
      }
    },
    handlePhoneConfirmationClose() {
      if (!this.phoneChecked) {
        this.user.phone = this.oldPhone.pMaskPhone();
      }
    },
    validationEmail() {
      if (!this.user.email.pEmailValid()) {
        showErrorMessage(this.$t("forms.user.validation.incorrectEmail"));
        return false;
      }
      return true;
    },
    validationPhone() {
      if (!this.user.phone.pValidPhone()) {
        showErrorMessage(this.$t("forms.user.validation.incorrectPhone"));
        return false;
      }
      return true;
    },
    // onCompanyActivation: async function(company, index) {
    //   try {
    //     const result = await this.$api.companies.updateUser({
    //       companyGuid: company.guid,
    //       userGuid: this.$store.state.user.guid,
    //       roleGuid: company.user.roleGuid,
    //       active: !company.user.active
    //     })

    //     if (result.status === true) {
    //       company.user.active =  company.user.active === 1 ? 0 : 1

    //       this.$set(this.companies, index, company)
    //     } else {
    //       throw new Error(result.msg)
    //     }
    //   } catch (e) {
    //     showErrorMessage(e.message)
    //   }
    // },
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
              showSuccessMessage(
                this.$t("forms.user.messages.savePasswordSuccess")
              );
            } else {
              throw new Error(this.$t("forms.user.messages.savePasswordError"));
            }
          } catch (e) {
            showErrorMessage(e.message);
          }
        }
      });
    },

    handleChangePassword() {
      this.$refs['dialog-change-user-password']._data.dialogVisible = true
    }
  },

  computed: {
    username: function() {
      return `${this.user.firstname} ${this.user.lastname}` || "";
    }
  },

  created() {
    this.oldPhone = this.user.phone;
    this.phoneChecked = this.user.phoneChecked;
  }
};
</script>

<style lang="scss" scoped>
.th-user-profile-wrapper {
  margin: auto;
  max-width: 1000px;
  margin-top: -20px;

  .th-user-profile {
    // overflow-y: auto;
    // height: calc(100vh - 20px);

    .th-user-profile-header-wrapper {
      background-color: #fff;
      height: 100px;
      padding: 40px;
      border: 1px solid #ebeef5;
      border-radius: 0px 0px 5px 5px;
      border-top: 0;
      margin-bottom: 20px;

      .th-user-profile-header {
        display: flex;
        flex-direction: row;

        .th-user-avatar {
          font: 24px/0 Helvetica, Arial, sans-serif !important;
        }

        .th-user-profile-header-titles {
          margin-top: 35px;
          padding-left: 20px;
          display: flex;
          flex-direction: column;

          .th-user-profile-header-title {
            font-size: 16px;
            font-weight: bold;
          }

          .th-user-profile-header-subtitle {
            margin-top: 5px;
            font-size: 12px;
            color: #909399;
          }
        }
      }
    }

    .th-user-profile-body-wrapper {
      background-color: #fff;
      border: 1px solid #ebeef5;
      border-radius: 5px;
      padding: 40px;

      .th-user-profile-body {
        .th-user-profile-company-widget-wrapper {
          margin: 15px 0;

          .th-user-profile-company-widget {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .th-user-profile-company-widget-header {
              display: flex;
              flex-direction: row;

              .th-user-profile-company-widget-header-titles {
                display: flex;
                flex-direction: column;
                margin-left: 15px;

                .th-user-profile-company-widget-header-main-title {
                  font-size: 14px;
                  font-weight: 500;
                }

                .th-user-profile-company-widget-header-main-subtitle {
                  margin-top: 3px;
                  font-size: 12px;
                  color: #909399;
                }

                .th-user-profile-company-widget-header-subtitle {
                  margin-top: 8px;
                  font-size: 13px;
                  color: #606266;
                  font-weight: 500;
                }
              }
            }

            .th-user-profile-company-widget-btns {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}

.UserProfile__changePassword {
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    margin-bottom: 20px;
  }
}
</style>
