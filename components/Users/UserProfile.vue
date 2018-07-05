<template>
  <div class="th-user-profile-wrapper">
    <div class="th-user-profile">

      <!-- HEADER -->
      <div class="th-user-profile-header-wrapper">
        <div class="th-user-profile-header">
          <th-user-avatar slot="reference" :name="username" class="th-user-avatar" :size="100" />
          <div class="th-user-profile-header-titles">
            <span class="th-user-profile-header-title">{{ username }}</span>
            <span class="th-user-profile-header-subtitle">{{ user.email }}</span>
          </div>
        </div>
      </div>

      <!-- BODY -->
      <el-tabs v-model="activeTab">

        <!-- MAIN TAB -->
        <el-tab-pane label="Main" name="main">

          <div class="th-user-profile-body-wrapper">
            <div class="th-user-profile-body">
              <el-form :model="user" label-width="120px" size="mini" label-position="top">
                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item :label="$t('forms.user.common.firstname')">
                      <el-input
                        v-model="user.firstname"
                        :placeholder="$t('forms.user.placeholdes.firstname')">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item :label="$t('forms.user.common.lastname')">
                      <el-input
                        v-model="user.lastname"
                        :placeholder="$t('forms.user.placeholdes.lastname')">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item :label="$t('forms.common.email')">
                      <el-input
                        v-model="user.email"
                        type="email"
                        :placeholder="$t('forms.user.placeholdes.email')">
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
                    <th-button style="width: 100%; margin-top: 15px" type="primary">Save</th-button>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>

        </el-tab-pane>

        <!-- COMPANIES TAB -->
        <el-tab-pane label="Companies" name="companies">
          <div class="th-user-profile-body-wrapper">
            <div class="th-user-profile-body">

            </div>
          </div>
        </el-tab-pane>

        <!-- PASSWORD TAB -->
        <el-tab-pane label="Pasword" name="password">

          <div class="th-user-profile-body-wrapper">
            <div class="th-user-profile-body">
              <el-form :model="user" label-width="120px" size="mini" label-position="top">
                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item :label="$t('forms.user.profile.oldPassword')">
                      <el-input
                        v-model="user.oldPassword"
                        type="password">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item :label="$t('forms.user.profile.newPassword')">
                      <el-input
                        v-model="user.newPassword"
                        type="password">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <el-form-item :label="$t('forms.user.profile.newPasswordCheck')">
                      <el-input
                        v-model="user.newPasswordCheck"
                        type="password">
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <th-button style="width: 100%; margin-top: 15px" type="danger">Save</th-button>
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
import Button from '@/components/Common/Buttons/Button'

export default {
  components: {
    "th-user-avatar": Avatar,
    "th-button": Button
  },

  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        language: ''
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

      activeTab: 'main'
    }
  },

  created() {
    const { firstname, lastname, email, language } = this.$store.state.user
    this.user.firstname = firstname
    this.user.lastname = lastname
    this.user.email = email
    this.user.language = language || this.$store.state.locale
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
  max-width: 800px;
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
        // display: flex;
        // flex-direction: row;
      }
    }
  }
}
</style>
