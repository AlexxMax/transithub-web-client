<template>
  <div class="th-company-profile-wrapper">
    <div class="th-company-profile">

      <!-- HEADER -->
      <div class="th-company-profile-header-wrapper">
        <div class="th-company-profile-header">
          <div class="th-company-profile-header-top">
            <th-company-avatar
              slot="reference"
              :name="company.name"
              :size="100"
              :cursor="false"
              radius5px/>
            <div class="th-company-profile-header-titles">
              <span class="th-company-profile-header-title">{{ company.name }}</span>
              <span class="th-company-profile-header-subtitle">{{ company.description }}</span>
            </div>
          </div>
          <div class="th-company-profile-header-bottom">
            <el-row :gutter="20" style="width: 100%">
              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="th-company-profile-header-bottom-col">
                  <span class="th-company-profile-header-bottom-col-title">
                    {{ $t('forms.company.profile.fullname') }}
                  </span>
                  <span>{{ company.fullname }}</span>
                </div>
              </el-col>

              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="th-company-profile-header-bottom-col">
                  <span class="th-company-profile-header-bottom-col-title">
                    {{ $t('forms.company.profile.shortname') }}
                  </span>
                  <span>{{ company.shortname }}</span>
                </div>
              </el-col>

              <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="th-company-profile-header-bottom-col">
                  <span class="th-company-profile-header-bottom-col-title">
                    {{ $t('forms.company.profile.workname') }}
                  </span>
                  <span>{{ company.workname }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <!-- BODY -->
      <el-tabs v-model="activeTab">
        <!-- MAIN TAB -->
        <el-tab-pane name="main">
          <span slot="label">
            <fa icon="home" style="padding-right: 5px" />
            {{ $t('forms.company.profile.tabMain') }}
          </span>

          <div class="th-company-profile-container">
            <el-form
              :model="company"
              :rules="rulesMain"
              ref="formMain"
              label-width="120px"
              size="mini"
              label-position="top">
              <el-row>
                <el-col :span="24">
                  <th-organisationo-form-select
                    no-init
                    :value="company.organisationFormGuid"
                    @onSelect="onOrganisationFormSelect"/>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item
                    :label="$t('forms.company.profile.name')"
                    prop="name">
                    <el-input
                      v-model="company.name"
                      :placeholder="$t('forms.company.profile.name')"
                      :maxlength="100"
                      clearable
                      @change="onNameChange">
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <div class="th-company-profile-part">
                <el-row type="flex" justify="center">
                  <el-col :xs="24" :sm="20" :md="12" :lg="8">
                    <th-button
                      type="primary"
                      style="width: 100%; margin-top: 15px"
                      @click="submit">
                      {{ $t('forms.common.save') }}
                    </th-button>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </el-tab-pane>

        <!-- CONTACTS TAB -->
        <el-tab-pane name="contacts">
          <span slot="label">
            <fa icon="address-book" style="padding-right: 5px" />
            {{ $t('forms.company.profile.tabContacts') }}
          </span>

          <div class="th-company-profile-container">
            <el-form
              :model="company"
              ref="formContacts"
              label-width="120px"
              size="mini"
              label-position="top">

              <el-row type="flex" align="middle" style="flex-direction: column;">
                <!-- <el-col :xs="24" :sm="18" :md="12">
                  <el-form-item
                    prop="phone">
                    <el-input
                      v-mask="phoneMask"
                      v-model="company.phone"
                      :placeholder="$t('forms.company.profile.phone')"
                      type="phone"
                      @keydown.delete.native="handlePhoneDelete"
                      @change="submit">
                      <fa class="input-internal-icon" icon="phone" slot="prefix" />
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="18" :md="12">
                  <el-form-item
                    prop="email">
                    <el-input
                      v-model="company.email"
                      :placeholder="$t('forms.company.profile.email')"
                      :maxlength="50"
                      type="email"
                      clearable
                      @change="submit">
                      <fa class="input-internal-icon" icon="envelope" slot="prefix" />
                    </el-input>
                  </el-form-item>
                </el-col> -->

                <el-col :xs="24" :sm="18" :md="12">
                  <el-form-item>
                    <el-input
                      v-model="company.webpage"
                      :placeholder="$t('forms.company.profile.webpage')"
                      :maxlength="50"
                      type="text"
                      clearable
                      @change="handleInputChange">
                      <fa class="input-internal-icon" icon="globe" slot="prefix" />
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="18" :md="12">
                  <el-form-item>
                    <el-input
                      v-model="company.facebook"
                      :placeholder="$t('forms.company.profile.facebook')"
                      :maxlength="50"
                      type="text"
                      clearable
                      @change="handleInputChange">
                      <fa class="input-internal-icon" :icon="['fab', 'facebook-square']" slot="prefix" />
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :sm="18" :md="12">
                  <el-form-item>
                    <el-input
                      v-model="company.telegram"
                      :placeholder="$t('forms.company.profile.telegram')"
                      :maxlength="50"
                      type="text"
                      clearable
                      @change="handleInputChange">
                      <span slot="prefix">
                        <fa class="input-internal-icon" :icon="['fab', 'telegram-plane']"/>
                      </span>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="18" :md="12" :lg="8">
                  <th-button
                    type="primary"
                    style="width: 100%; margin-top: 15px"
                    @click="submit">
                    {{ $t('forms.common.save') }}
                  </th-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>

        <!-- REQUISITES TAB -->
        <el-tab-pane name="requisites">
          <span slot="label">
            <fa icon="list-alt" style="padding-right: 5px" />
            {{ $t('forms.company.profile.tabRequisites') }}
          </span>

          <div class="th-company-profile-container">
            <el-form
              :model="company"
              ref="formRequisites"
              label-width="120px"
              size="mini"
              label-position="top">

              <el-row type="flex" justify="center">
                <el-col :span="24">
                  <th-tax-schemes-select
                    no-init
                    :value="company.taxSchemeGuid"
                    @onSelect="onTaxSchemesSelect"/>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :md="5" v-if="!isFiz">
                  <el-form-item :label="$t('forms.company.profile.edrpou')">
                    <el-input
                      v-model="company.edrpou"
                      :placeholder="$t('forms.company.profile.edrpou')"
                      :maxlength="8"
                      clearable
                      style="width: 120px"
                      @change="handleInputChange">
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="7">
                  <el-form-item :label="$t('forms.company.profile.inn')">
                    <el-input
                      v-model="company.inn"
                      :placeholder="$t('forms.company.profile.inn')"
                      :maxlength="12"
                      clearable
                      style="width: 160px"
                      @change="handleInputChange">
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <th-button
                    type="primary"
                    style="width: 100%; margin-top: 15px"
                    @click="submit">
                    {{ $t('forms.common.save') }}
                  </th-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>

        <!-- USERS TAB -->
        <el-tab-pane name="users">
          <span slot="label">
            <fa icon="user" style="padding-right: 5px" />
            {{ $t('forms.company.profile.tabUsers') }}
          </span>

          <div class="th-company-profile-container">

            <el-row :gutter="20">
              <el-col :span="24">
                <th-toolbar v-if="!visibleAddUserForm">
                  <th-button type="primary" @click="visibleAddUserForm = true">{{ $t('forms.company.users.newUser') }}</th-button>
                </th-toolbar>
              </el-col>
            </el-row>

            <transition name="fade">
              <th-add-user-form v-if="visibleAddUserForm"
                @onCancel="visibleAddUserForm = false"
                @onAddUser="onAddUser"/>
            </transition>

            <el-row :gutter="20">
              <el-col :span="24">
                <th-user-widget
                  v-loading="loaderAddUser"
                  v-for="(user, index) of users.list"
                  :key="index"
                  :username="getUserName(user)"
                  :email="user.userEmail"
                  :role="$store.state.locale === 'ru' ? user.nameRu : user.nameUa"
                  :active="user.active"
                  :pending="!!user.pendingKey"
                  :invitationAccepted="!!user.invitationAccepted"
                  @onOpenUserRole="currentUserGuid = user.guid; visibleDialogRoleSelect = true"
                  @onUserActivation="onUserActivation(user)"
                  @onSendInvitation="onSendInvitation(user)" />
              </el-col>
            </el-row>

          </div>
        </el-tab-pane>

        <!-- ACCRED COMPANIES TAB -->
        <!-- <el-tab-pane name="accredCompanies">
          <span slot="label">
            <fa icon="building" style="padding-right: 5px" />
            {{ $t('forms.company.profile.tabAccredCompanies') }}
          </span>

          <div class="th-company-profile-container">
            <el-row :gutter="20">
              <el-col :span="24">
                <div style="width: inherit; text-align: center;">
                  <span v-if="accredCompanies.list.length === 0">
                    {{ $t('forms.company.profile.noAccredCompanies') }}
                  </span>
                </div>

                <th-company-widget
                  v-if="accredCompanies.list.length !== 0"
                  v-for="(company, index) of accredCompanies.list"
                  :key="index"
                  :name="company.opponentWorkName"
                  :description="company.description"
                  :active="!!company.active"
                  :date="company.accredDateUtc"
                  :period="company.accredPeriod"
                  @onCompanyActivation="company.active = !company.active" />
              </el-col>
            </el-row>
          </div>
        </el-tab-pane> -->

        <!-- DEVELOPER TAB -->
        <!-- <el-tab-pane name="developer">
          <span slot="label">
            <fa icon="code" style="padding-right: 5px" />
            {{ $t('forms.company.profile.tabDeveloper') }}
          </span>

          <div class="th-company-profile-container">
            <el-form
              :model="company"
              size="mini">
              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <div style="color: #606266; text-align: center; margin-bottom: 15px">API Token</div>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :span="24">
                  <el-input
                    ref="companyApiToken"
                    size="mini"
                    type="text"
                    :value="$store.state.companies.currentCompany.apiToken"
                    readonly>
                    <el-button
                      slot="prepend"
                      @click="generateApiToken">
                      {{ $t('forms.company.profile.generate') }}
                    </el-button>
                    <el-tooltip
                      slot="append"
                      effect="dark"
                      :content="$t('forms.common.copy')"
                      placement="top">
                      <el-button
                        v-if="$store.state.companies.currentCompany.apiToken"
                        @click="onCopyApiToken">
                        <fa icon="copy"/>
                      </el-button>
                    </el-tooltip>
                  </el-input>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>

    <th-dialog-role-select
      :title="$t('forms.user.dialog.selectRole')"
      :visible="visibleDialogRoleSelect"
      @close="visibleDialogRoleSelect = false"
      @onSelect="onSelectUserRole"/>
  </div>
</template>

<script>
import S from 'string'

import Button from '@/components/Common/Buttons/Button'
import Avatar from '@/components/Common/Avatar'
import OrganisationFormSelect from '@/components/OrganisationForms/SelectFormField'
import TaxSchemesSelect from '@/components/TaxSchemes/SelectFormField'
import Toolbar from '@/components/Common/Toolbar'
import UserWidget from '@/components/Users/UserWidget'
import DialogRoleSelect from '@/components/Users/DialogRoleSelect'
import AddUserForm from '@/components/Users/AddUserForm'
import CompanyWidget from '@/components/Companies/CompanyWidget'

import { showErrorMessage, showSuccessMessage } from '@/utils/messages'
import { VALIDATION_TRIGGER, PHONE_MASK } from '@/utils/constants'

export default {
  name: 'th-company-profile',

  components: {
    "th-button": Button,
    "th-company-avatar": Avatar,
    "th-organisationo-form-select": OrganisationFormSelect,
    "th-tax-schemes-select": TaxSchemesSelect,
    "th-toolbar": Toolbar,
    "th-user-widget": UserWidget,
    "th-dialog-role-select": DialogRoleSelect,
    "th-add-user-form": AddUserForm,
    "th-company-widget": CompanyWidget
  },

  data() {
    const validation = {
      name: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.company.validation.name')))
        }
        cb()
      },
      phone: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.company.validation.phone')))
        }
        cb()
      },
      phoneValid: (rule, value, cb) => {
        if (!value.pValidPhone()) {
          cb(new Error(this.$t('forms.company.validation.incorrectPhone')))
        }
        cd()
      },
      email: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.company.validation.email')))
        }
        cb()
      }
    }

    return {
      company: {},

      users: { list: [], count: 0 },
      accredCompanies: { list: [], count: 0 },

      phoneMask: PHONE_MASK,

      rulesMain: {
        name: [{
          required: true,
          validator: validation.name,
          trigger: VALIDATION_TRIGGER,
          max: 100
        }],
        // phone: [{
        //   required: true,
        //   validator: validation.phone,
        //   trigger: VALIDATION_TRIGGER,
        //   max: 13
        // }, {
        //   type: 'string',
        //   validator: validation.phoneValid,
        //   trigger: ['blur', 'change']
        // }],
        // email: [{
        //   required: true,
        //   validator: validation.email,
        //   trigger: VALIDATION_TRIGGER,
        //   max: 50
        // }, {
        //   type: 'email',
        //   message: this.$t('forms.company.validation.incorrectEmail'),
        //   trigger: ['blur', 'change']
        // }]
      },

      activeTab: 'main',
      visibleDialogRoleSelect: false,
      visibleAddUserForm: false,

      loaderAddUser: false
    }
  },

  computed: {
    isFiz() {
      const item = this.$store.state.organisationForms.list.find(elem => elem.guid === this.company.organisationFormGuid)
      if (!item) {
        return false
      }
      return (item.type || '').toUpperCase().replace(' ', '') === ('fiz').toUpperCase()
    }
  },

  methods: {
    handlePhoneDelete(e) {
      if (this.company.phone.length < 4) {
        e.preventDefault()
      }
    },
    handleInputChange() {
      this.$emit('changed', true)
    },
    onOrganisationFormSelect: function(value) {
      this.company.organisationFormGuid = value
      this.onNameChange()
      this.handleInputChange()
    },
    onTaxSchemesSelect: function(value) {
      this.company.taxSchemeGuid = value
      this.handleInputChange()
    },
    onNameChange: function() {
      const { name } = this.company
      const { nameUa: ofNameUa, abbrUa } = this.$store.getters['organisationForms/getOrganisationForm'](this.company.organisationFormGuid)
      this.company.fullname = `${ofNameUa} "${name}"`
      this.company.shortname = `${abbrUa} "${name}"`
      this.company.workname = `${name}, ${abbrUa}`
      this.handleInputChange()
    },
    fetchAndUpdateUsers: async function(refresh = false) {
      if (refresh) {
        await this.$store.dispatch('companies/loadCompanyUsers')
      }
      this.users.list = []
      for (const user of this.$store.state.companies.users.list) {
        this.users.list.push({ ...user })
      }
      this.users.count = this.$store.state.companies.users.count || 0
    },
    getUserName: function(user) {
      return `${user.firstname} ${user.lastname}` || ''
    },
    getUserByGuid: function(guid) {
      return this.users.list.find(elem => elem.guid === guid)
    },
    onSelectUserRole: async function(userRole) {
      const user = this.getUserByGuid(this.currentUserGuid)

      if (user) {
        const userUpdated = await this.$store.dispatch('companies/updateUser', {
          companyGuid: this.$store.state.companies.currentCompany.guid,
          userGuid: user.guid,
          roleGuid: userRole.guid,
          active: user.active
        })

        if (userUpdated) {
          user.roleGuid = userRole.guid
          user.nameUa = userRole.nameUa
          user.nameRu = userRole.nameRu
        }
      }

      this.visibleDialogRoleSelect = false
    },
    onUserActivation: async function(user) {
      const userUpdated = await this.$store.dispatch('companies/updateUser', {
        companyGuid: this.$store.state.companies.currentCompany.guid,
        userGuid: user.guid,
        roleGuid: user.roleGuid,
        active: !user.active
      })

      if (userUpdated) {
        user.active = !user.active
      }
    },
    onSendInvitation: async function(user) {
      const invitationSended = await this.$store.dispatch('companies/sendInvitationToUser', {
        companyGuid: this.$store.state.companies.currentCompany.guid,
        userGuid: user.guid,
      })

      if (invitationSended) {
        const elem = this.$store.state.companies.users.list.find(elem => elem.guid === user.guid)
        user.pendingKey = elem.pendingKey
        user.invitationAccepted = elem.invitationAccepted
      }
    },
    onAddUser: async function(user) {
      this.loaderAddUser = true
      this.visibleAddUserForm = false

      let fine = !!!this.users.list.find(elem => elem.userEmail === user.email)
      const userData = user
      let message

      if (!fine) {
        message = S(this.$t('messages.userIsInTheListAllReady')).replaceAll('%1', `${userData.firstname} ${userData.lastname}`).s
        showErrorMessage(message)
      }

      if (!userData.guid && fine) {
        // create user
        try {
          const {
            guid,
            firstname,
            lastname,
            email
          } = await this.$api.users.createUser({
            ...user,
            language: this.$store.state.locale,
            need_reg: 1
          })
          userData.guid = guid
          userData.firstname = firstname
          userData.lastname = lastname
          userData.email = email
        } catch (e) {
          fine = false
          showErrorMessage(e.message)
        }
      }

      if (userData.guid && fine) {
        // adding user to company
        let userAdded = false
        try {
          const companyGuid = this.$store.state.companies.currentCompany.guid
          userAdded = await this.$store.dispatch('companies/addUserToCompany', {
            companyGuid,
            userGuid: userData.guid,
            roleGuid: user.role,
            needInvitation: user.sendInvitation ? 1 : 0
          })
        } catch (e) {
          fine = false
          showErrorMessage(e.message)
        }

        if (fine && userAdded) {
          await this.fetchAndUpdateUsers(true)
        }
      }

      if (fine) {
        message = S(this.$t('messages.userInvitedToCompany')).replaceAll('%1', `${userData.firstname} ${userData.lastname}`).s
        showSuccessMessage(message)
      }

      this.loaderAddUser = false
    },
    async fetchCompanyAccredCompanies(refresh = false) {
      if (refresh) {
        await this.$store.dispatch('companies/loadCompanyAccredCompanies')
      }
      this.accredCompanies.list = []
      for (const company of this.$store.state.companies.accredCompanies.list) {
        this.accredCompanies.list.push({ ...company })
      }
      this.accredCompanies.count = this.$store.state.companies.accredCompanies.count || 0
    },
    async generateApiToken() {
      await this.$store.dispatch('companies/generateApiToken')
    },
    onCopyApiToken: function() {
      const companyApiToken = this.$refs.companyApiToken.value
      if (companyApiToken) {
        const temporaryEl = document.createElement('textarea')
        temporaryEl.value = companyApiToken
        document.body.appendChild(temporaryEl)
        temporaryEl.select()
        document.execCommand('copy')
        document.body.removeChild(temporaryEl)
      }
    },
    submit: function(done) {
      this.$refs.formMain.validate(valid => {
        // const validEmail = this.validationEmail()
        // const validPhone = this.validationPhone()
        if (valid) {
          this.$nextTick(async () => {
            this.$nuxt.$loading.start()

            await this.$store.dispatch('companies/updateCompany', this.company)
            this.$emit('changed', false)

            this.$nuxt.$loading.finish()

            if (done) {
              done(true)
            }
          })
        } else if (done) {
          done(false)
        }
      })
    },
    validationEmail() {
      if (!this.company.email.pEmailValid()) {
        showErrorMessage(this.$t('forms.company.validation.incorrectEmail'))
        return false
      }
      return true
    },
    validationPhone() {
      if (!this.company.phone.pValidPhone()) {
        showErrorMessage(this.$t('forms.company.validation.incorrectPhone'))
        return false
      }
      return true
    },
    initCompany() {
      this.company = this.$copyObjectWithoutReactivity(this.$store.state.companies.currentCompany)
    }
  },

  watch: {
    isFiz() {
      if (this.isFiz) {
        this.company.edrpou = ''
      }
    }
  },

  async created() {
    this.initCompany()

    await this.fetchAndUpdateUsers()
    await this.fetchCompanyAccredCompanies()
  }
}
</script>

<style lang="scss" scoped>
.th-company-profile-wrapper {
  margin: auto;
  max-width: 1000px;
  margin-top: -20px;

  .th-company-profile {
    overflow-y: auto;
    height: calc(100vh - 20px);

    .th-company-profile-header-wrapper {
      background-color: #fff;
      padding: 40px;
      border: 1px solid #EBEEF5;
      border-radius: 0px 0px 5px 5px;
      border-top: 0;
      margin-bottom: 20px;

      .th-company-profile-header {
        display: flex;
        flex-direction: column;

        .th-company-profile-header-top {
          display: flex;
          flex-direction: row;
          margin-right: 100px;

          .th-company-profile-header-titles {
            margin-top: 35px;
            padding-left: 20px;
            display: flex;
            flex-direction: column;

            .th-company-profile-header-title {
              font-size: 16px;
              font-weight: bold;
            }

            .th-company-profile-header-subtitle {
              margin-top: 5px;
              font-size: 12px;
              color: #909399;
            }
          }
        }

        .th-company-profile-header-bottom {
          display: flex;
          flex-direction: row;
          margin-left: 100px;
          margin-right: 100px;
          margin-top: 50px;

          .th-company-profile-header-bottom-col {
            display: flex;
            flex-direction: column;
            margin-left: 20px;

            .th-company-profile-header-bottom-col-title {
              color: #909399;
              margin-bottom: 8px;
            }
          }
        }
      }
    }
  }
}

.th-company-profile-container {
  background-color: #fff;
  border: 1px solid #EBEEF5;
  border-radius: 5px;
  padding: 40px 160px;
  margin-bottom: 15px;
}

.th-company-profile-part {
  margin-top: 30px;
}

@media only screen and (max-width: 720px) {
  .th-company-profile-container {
    padding: 40px;
  }
}

@media only screen and (max-width: 991px) {
  .th-company-profile-wrapper .th-company-profile .th-company-profile-header-wrapper .th-company-profile-header .th-company-profile-header-bottom {
    margin-left: 0;
    margin-right: 0;

    .th-company-profile-header-bottom-col {
      margin-left: 5px;
      margin-bottom: 15px;
    }
  }
}
</style>
