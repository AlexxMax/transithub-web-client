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
            :cursor="false" />
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
          <span slot="label"><fa icon="home" style="padding-right: 5px" />
            {{ $t('forms.user.profile.tabMain') }}
          </span>

          <div class="th-user-profile-body-wrapper">
            <div class="th-user-profile-body">
              <el-form
                :model="user"
                :rules="rulesMain"
                ref="formMain"
                label-width="120px"
                size="mini"
                label-position="top">
                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item
                      :label="$t('forms.user.common.firstname')"
                      prop="firstname">
                      <el-input
                        v-model="user.firstname"
                        :placeholder="$t('forms.user.placeholdes.firstname')"
                        :maxlength="100">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item
                      :label="$t('forms.user.common.lastname')"
                      prop="lastname">
                      <el-input
                        v-model="user.lastname"
                        :placeholder="$t('forms.user.placeholdes.lastname')"
                        :maxlength="100">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item
                      :label="$t('forms.common.email')"
                      prop="email">
                      <el-input
                        v-model="user.email"
                        type="email"
                        :placeholder="$t('forms.user.placeholdes.email')"
                        :maxlength="500">
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
                        placeholder="Select">
                        <el-option v-for="(lang, index) in langs" :key="index" :label="lang.label" :value="lang.value">
                          {{lang.label}}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <th-button
                      style="width: 100%; margin-top: 15px"
                      type="primary"
                      @click="onSaveMain">
                      {{ $t('forms.common.save') }}
                    </th-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>

        </el-tab-pane>

        <!-- COMPANIES TAB -->
        <el-tab-pane name="companies">
          <span slot="label"><fa icon="building" style="padding-right: 5px" />
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
                          <th-button
                            style="width: 120px"
                            :type="getUserActive(company) === true ? 'info' : 'success'"
                            @click="onCompanyActivation(company, index)">
                            {{ getUserActive(company) === true ? $t('forms.user.profile.deactivateCompany') : $t('forms.user.profile.activateCompany')}}
                          </th-button>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- PASSWORD TAB -->
        <el-tab-pane name="password">
          <span slot="label"><fa icon="key" style="padding-right: 5px" />
            {{ $t('forms.user.profile.tabPassword') }}
          </span>

          <div class="th-user-profile-body-wrapper">
            <div class="th-user-profile-body">
              <el-form
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
                    <th-button
                      style="width: 100%; margin-top: 15px"
                      type="danger"
                      @click="onSavePassword">
                      {{ $t('forms.common.save') }}
                    </th-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>

        </el-tab-pane>

      </el-tabs>

    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Common/Avatar'
import CompanyAvatar from '@/components/Companies/CompanyAvatar'
import Button from '@/components/Common/Buttons/Button'

import { showErrorMessage, showSuccessMessage } from '@/utils/messages'
import { VALIDATION_TRIGGER } from '@/utils/forms/constants'
import { getLangFromRoute } from "@/utils/locale"

export default {
  name: 'th-user-profile',

  components: {
    "th-user-avatar": Avatar,
    "th-company-avatar": CompanyAvatar,
    "th-button": Button
  },

  props: {
    user: {
      type: Object,
      required: true
    },

    companies: {
      type: Array,
      default: () => ([])
    }
  },

  data() {
    const validation = {
      firstname: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.firstname')))
        }
        cb()
      },
      lastname: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.lastname')))
        }
        cb()
      },
      email: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.email')))
        }
        cb()
      },
      oldPassword: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.oldPassword')))
        }
        cb()
      },
      newPassword: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.newPassword')))
        }
        cb()
      },
      newPasswordCheck: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.newPasswordCheck')))
        } else if (value !== this.password.newPassword) {
          cb(new Error(this.$t('forms.user.validation.newPasswordCheckDiff')));
        }
        cb()
      }
    }

    return {
      password: {
        oldPassword: '',
        newPassword: '',
        newPasswordCheck: ''
      },

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
        firstname: [{
          required: true,
          validator: validation.firstname,
          trigger: VALIDATION_TRIGGER,
          max: 100
        }],
        lastname: [{
          required: true,
          validator: validation.lastname,
          trigger: VALIDATION_TRIGGER,
          max: 100
        }],
        email: [{
          required: true,
          validator: validation.email,
          trigger: VALIDATION_TRIGGER,
          max: 500
        }],
      },

      rulesPassword: {
        oldPassword: [{
          required: true,
          validator: validation.oldPassword,
          trigger: VALIDATION_TRIGGER,
          max: 500
        }],
        newPassword: [{
          required: true,
          validator: validation.newPassword,
          trigger: VALIDATION_TRIGGER,
          max: 500
        }],
        newPasswordCheck: [{
          required: true,
          validator: validation.newPasswordCheck,
          trigger: VALIDATION_TRIGGER,
          max: 500
        }]
      },

      activeTab: 'main'
    }
  },

  mounted() {
    this.$nextTick(async () => {
      this.$nuxt.$loading.start()

      const promises = []
      for (const {guid: companyGuid} of this.companies) {
        promises.push(this.$api.companies.getUsers({
          companyGuid,
          userGuid: this.user.guid
        }))
      }

      try {
        const results = await Promise.all(promises)
        for (const { status, item } of results) {
          if (status) {
            const company = this.companies.find(elem => elem.guid === item.companyGuid)
            company.user = item
          }
        }
      } catch (e) {
        showErrorMessage(e.message)
      }

      this.$nuxt.$loading.finish()
    })
  },

  methods: {
    getUserRoleName: function(company) {
      const user = company.user || {}
      return this.$store.state.locale === 'ru' ? user.roleNameRu : user.roleNameUa
    },
    getUserActive: function(company) {
      const user = company.user || {}
      return user.active === 1
    },
    onSaveMain: function() {
      this.$refs.formMain.validate(valid => {
        if (valid) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start()

            const updated = await this.$store.dispatch(
              "user/userUpdate",
              this.user
            )

            if (updated) {
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
            }

            this.$nuxt.$loading.finish()
          })
        }
      })
    },
    onCompanyActivation: async function(company, index) {
      try {
        const result = await this.$api.companies.updateUser({
          companyGuid: company.guid,
          userGuid: this.$store.state.user.guid,
          roleGuid: company.user.roleGuid,
          active: !company.user.active
        })

        if (result.status === true) {
          company.user.active =  company.user.active === 1 ? 0 : 1

          this.$set(this.companies, index, company)
        } else {
          throw new Error(result.msg)
        }
      } catch (e) {
        showErrorMessage(e.message)
      }
    },
    onSavePassword: function() {
      this.$refs.formPassword.validate(async valid => {
        if (valid) {
          const { oldPassword, newPassword } = this.password
          try {
            const { userExist, status, msg } = await this.$api.users.changePassword({ oldPassword, newPassword })
            if (msg) {
              throw new Error(msg)
            } else if (userExist && status) {
              showSuccessMessage(this.$t('forms.user.messages.savePasswordSuccess'))
            } else {
              throw new Error(this.$t('forms.user.messages.savePasswordError'))
            }
          } catch (e) {
            showErrorMessage(e.message)
          }
        }
      })
    }
  },

  computed: {
    username: function() {
      return `${this.user.firstname} ${this.user.lastname}` || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.th-user-profile-wrapper {
  margin: auto;
  max-width: 1000px;
  margin-top: -20px;

  .th-user-profile {
    overflow-y: auto;
    height: calc(100vh - 20px);

    .th-user-profile-header-wrapper {
      background-color: #fff;
      height: 100px;
      padding: 40px;
      border: 1px solid #EBEEF5;
      border-radius: 0px 0px 5px 5px;
      border-top: 0;
      margin-bottom: 20px;

      .th-user-profile-header {
        display: flex;
        flex-direction: row;

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
      border: 1px solid #EBEEF5;
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
</style>
