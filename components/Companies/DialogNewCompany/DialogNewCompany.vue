<template>
  <el-dialog
    :title="$t('forms.company.newCompanyDialog.formTitle')"
    :visible="visible"
    width="80%"
    top="50px"
    @close="$emit('close')">

    <div class="th-dialog-new-company">
      <div class="th-dialog-new-company-header">
        <el-steps :active="activePage" align-center finish-status="success">
          <el-step
            :title="$t('forms.company.newCompanyDialog.pageRequisites')"
            :description="$t('forms.company.newCompanyDialog.pageRequisitesDesc')">
            <fa slot="icon" icon="align-justify" />
          </el-step>
          <el-step
            :title="$t('forms.company.newCompanyDialog.pageContacts')"
            :description="$t('forms.company.newCompanyDialog.pageContactsDesc')">
            <fa slot="icon" icon="phone" />
          </el-step>
          <el-step
            :title="$t('forms.company.newCompanyDialog.pageUsers')"
            :description="$t('forms.company.newCompanyDialog.pageUsersDesc')">
            <fa slot="icon" icon="users" />
          </el-step>
          <!-- <el-step
            :title="$t('forms.company.newCompanyDialog.pageInfo')"
            :description="$t('forms.company.newCompanyDialog.pageInfoDesc')">
          </el-step> -->
          <el-step
            :title="$t('forms.company.newCompanyDialog.pageDone')">
            <fa slot="icon" icon="check" />
          </el-step>
        </el-steps>

        <div style="border-bottom: 1px solid #EBEEF5; margin: 20px -20px 0;"></div>

        <div class="th-dialog-new-company-header-bottom">
          <el-row :gutter="20" style="width: 100%">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="th-dialog-new-company-header-bottom-col">
                <span class="th-dialog-new-company-header-bottom-col-title">
                  {{ $t('forms.company.profile.fullname') }}
                </span>
                <span>{{ company.fullname }}</span>
              </div>
            </el-col>

            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="th-dialog-new-company-header-bottom-col">
                <span class="th-dialog-new-company-header-bottom-col-title">
                  {{ $t('forms.company.profile.shortname') }}
                </span>
                <span>{{ company.shortname }}</span>
              </div>
            </el-col>

            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
              <div class="th-dialog-new-company-header-bottom-col">
                <span class="th-dialog-new-company-header-bottom-col-title">
                  {{ $t('forms.company.profile.workname') }}
                </span>
                <span>{{ company.workname }}</span>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- <div style="border-bottom: 1px solid #EBEEF5;"></div> -->
      </div>

      <div class="th-dialog-new-company-body">
        <!-- REQUISITES -->
        <div class="th-company-create-new-requisites-wrapper" v-if="activePage === 0">
          <div class="th-company-create-new-requisites">
            <el-form
              style="clear: both"
              ref="formMain"
              :model="company"
              :rules="rules.main"
              label-width="120px"
              size="mini"
              label-position="top">
              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <th-organisationo-form-select
                    :value="company.organisationForm"
                    @onSelect="onOrganisationFormSelect"/>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <el-form-item
                    :label="$t('forms.common.name')"
                    prop="name">
                    <el-input v-model="company.name" clearable @input="onNameChange">
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <th-tax-schemes-select
                    :value="company.taxScheme"
                    @onSelect="onTaxSchemesSelect"/>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <el-form-item :label="$t('forms.company.common.description')">
                    <el-input v-model="company.description" clearable>
                      <i class="el-icon-edit el-input__icon" slot="suffix"></i>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <!-- CONTACTS -->
        <div v-if="activePage === 1">
          <div>
            <el-form
              style="clear: both"
              ref="formContacts"
              :model="company"
              :rules="rules.contacts"
              label-width="120px"
              size="mini"
              label-position="top">
              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <el-tooltip class="item" effect="dark" :content="$t('forms.common.phone')" placement="top" :open-delay="500">
                    <el-form-item
                      prop="phone">
                      <el-input
                        v-model="company.phone"
                        :placeholder="$t('forms.company.profile.phone')"
                        :maxlength="50"
                        type="text"
                        clearable>
                        <fa class="input-internal-icon" icon="phone" slot="prefix" />
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <el-tooltip class="item" effect="dark" :content="$t('forms.common.email')" placement="top" :open-delay="500">
                    <el-form-item
                      prop="email">
                      <el-input
                        v-model="company.email"
                        :placeholder="$t('forms.company.profile.email')"
                        :maxlength="50"
                        type="text"
                        clearable>
                        <fa class="input-internal-icon" icon="envelope" slot="prefix" />
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <el-tooltip class="item" effect="dark" :content="$t('forms.common.webpage')" placement="top" :open-delay="500">
                    <el-form-item>
                      <el-input
                        v-model="company.webpage"
                        :placeholder="$t('forms.company.profile.webpage')"
                        :maxlength="50"
                        type="text"
                        clearable>
                        <fa class="input-internal-icon" icon="globe" slot="prefix" />
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <el-tooltip class="item" effect="dark" :content="$t('forms.common.facebook')" placement="top" :open-delay="500">
                    <el-form-item>
                      <el-input
                        v-model="company.facebook"
                        :placeholder="$t('forms.company.profile.facebook')"
                        :maxlength="50"
                        type="text"
                        clearable>
                        <fa class="input-internal-icon" :icon="['fab', 'facebook-square']" slot="prefix" />
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="12" :lg="8">
                  <el-tooltip class="item" effect="dark" :content="$t('forms.common.telegram')" placement="top" :open-delay="500">
                    <el-form-item>
                      <el-input
                        v-model="company.telegram"
                        :placeholder="$t('forms.company.profile.telegram')"
                        :maxlength="50"
                        type="text"
                        clearable>
                        <fa class="input-internal-icon" :icon="['fab', 'telegram-plane']" slot="prefix" />
                      </el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <!-- USERS -->
        <div v-if="activePage === 2">
          <div>

            <div class="th-container">
              <el-row :gutter="20">
                <el-col :span="24">
                  <th-toolbar v-if="!visibleAddUserForm">
                    <th-button type="primary" @click="visibleAddUserForm = true">{{ $t('forms.company.users.addUser') }}</th-button>
                  </th-toolbar>
                </el-col>
              </el-row>

              <transition name="fade">
                <th-add-user-form v-if="visibleAddUserForm"
                  @onCancel="visibleAddUserForm = false"
                  @onAddUser="onAddUser"
                  />
              </transition>

              <el-row :gutter="20">
                <el-col :span="24">
                  <th-user-widget
                    v-for="(user, index) of users.list"
                    :key="index"
                    :username="getUserName(user)"
                    :email="user.userEmail"
                    :role="$store.state.locale === 'ru' ? user.nameRu : user.nameUa"
                    :active="user.active"
                    :pending="!!user.pendingKey"
                    :invitationAccepted="!!user.invitationAccepted"
                    :showActivation="false"
                    :showRemoweButton="users.list.length > 1"
                    @onOpenUserRole="currentUserGuid = user.guid; visibleDialogRoleSelect = true"
                    @onUserActivation="user.active = !user.active"
                    @onUserRemove="users.list.splice(index, 1)" />
                </el-col>
              </el-row>
            </div>
          </div>

          <th-dialog-role-select
            title="Select Role"
            :visible="visibleDialogRoleSelect"
            @close="visibleDialogRoleSelect = false"
            @onSelect="onSelectUserRole"/>
        </div>

        <!-- DONE -->
        <div class="th-company-create-new-done-wrapper" v-if="activePage === LAST_PAGE">
          <div class="th-company-create-new-done">
            <span><th-done-img class="icon" /></span>
            <span>{{ $t('forms.company.newCompanyDialog.readyTitle') }}</span>
          </div>
        </div>
      </div>

      <div class="th-dialog-new-company-footer">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="12" :lg="8">
            <th-button v-if="activePage !== LAST_PAGE" type="primary" @click="goNext">{{ $t('forms.common.next') }}</th-button>
            <th-button v-if="activePage === LAST_PAGE" type="primary" @click="onSubmit">{{ $t('forms.company.newCompanyDialog.submit') }}</th-button>
            <th-button v-if="activePage > 0" style="margin-top: 10px" type="text" @click="activePage--">
              <fa icon="arrow-left"/>
            </th-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import OrganisationFormSelect from '@/components/OrganisationForms/SelectFormField'
import TaxSchemesSelect from '@/components/TaxSchemes/SelectFormField'
import Toolbar from '@/components/Common/Toolbar'
import UserWidget from '@/components/Users/UserWidget'
import DialogRoleSelect from '@/components/Users/DialogRoleSelect'
import AddUserForm from '@/components/Users/AddUserForm'
import SuccessOperation from '@/assets/images/success-operation.svg'

import { VALIDATION_TRIGGER } from '@/utils/constants'

export default {
  name: 'th-dialog-new-company',

  components: {
    "th-button": Button,
    "th-organisationo-form-select": OrganisationFormSelect,
    "th-tax-schemes-select": TaxSchemesSelect,
    "th-toolbar": Toolbar,
    "th-user-widget": UserWidget,
    "th-dialog-role-select": DialogRoleSelect,
    "th-add-user-form": AddUserForm,
    'th-done-img': SuccessOperation
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    }
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
      email: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.company.validation.email')))
        }
        cb()
      }
    }

    return {
      company: {
        name: '',
        fullname: '',
        shortname: '',
        workname: '',
        organisationForm: null,
        taxScheme: null,
        description: '',
        edrpou: '',
        inn: ''
      },
      users: { list: [], count: 0 },

      rules: {
        main: {
          name: [{
            required: true,
            validator: validation.name,
            trigger: VALIDATION_TRIGGER,
            max: 100
          }],
        },
        contacts: {
          phone: [{
            required: true,
            validator: validation.phone,
            trigger: VALIDATION_TRIGGER,
            max: 20
          }],
          email: [{
            required: true,
            validator: validation.email,
            trigger: VALIDATION_TRIGGER,
            max: 50
          }]
        }
      },

      activePage: 0,
      currentUserGuid: null,
      visibleDialogRoleSelect: false,
      visibleAddUserForm: false
    }
  },

  methods: {
    async reset() {
      const user = this.$store.state.user

      await this.$store.dispatch('usersRoles/load')
      const role = this.$store.getters['usersRoles/getAdminRole']
      this.users.list.push({
        guid: user.guid,
        userEmail: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        roleGuid: role.guid,
        nameUa: role.nameUa,
        nameRu: role.nameRu,
        active: true,
        pendingKey: '',
        invitationAccepted: true,
        sendInvitation: false
      })
      this.users.count = 1
    },
    goNext() {
      const ref = this.activePage === 0 ? 'formMain' : this.activePage === 1 ? 'formContacts' : null
      if (ref) {
        this.$refs[ref].validate(async valid => {
          if (valid) {
            this.activePage++
          }
        })
      } else {
        this.activePage++
      }
    },
    onOrganisationFormSelect: function(value) {
      this.company.organisationForm = value
      this.onNameChange()
    },
    onTaxSchemesSelect: function(value) {
      this.company.taxScheme = value
    },
    onNameChange: function(locale = null) {
      const { name } = this.company
      const { nameUa: ofNameUa, abbrUa } = this.$store.getters['organisationForms/getOrganisationForm'](this.company.organisationForm)
      this.company.fullname = `${ofNameUa} "${name}"`
      this.company.shortname = `${abbrUa} "${name}"`
      this.company.workname = `${name}, ${abbrUa}`
    },
    getUserName: function(user) {
      return `${user.firstname} ${user.lastname}` || ''
    },
    getUserByGuid: function(guid) {
      return this.users.list.find(elem => elem.guid === guid)
    },
    onSelectUserRole: function(userRole) {
      const user = this.getUserByGuid(this.currentUserGuid)
      if (user) {
        user.roleGuid = userRole.guid
        user.nameUa = userRole.nameUa
        user.nameRu = userRole.nameRu
      }
      this.visibleDialogRoleSelect = false
    },
    onAddUser: function({ firstname, lastname, guid, role: roleGuid, sendInvitation, email: userEmail }) {
      this.visibleAddUserForm = false

      const { nameUa, nameRu } = this.$store.getters['usersRoles/getRoleByGuid'](roleGuid)
      this.users.list.push({
        firstname,
        lastname,
        guid: guid || this.users.list.length * 100,
        roleGuid,
        nameUa,
        nameRu,
        userEmail,
        sendInvitation,
        new: !!!guid,
        active: true
      })
    },
    onSubmit: async function() {
      this.$nextTick(async () => {
        this.$nuxt.$loading.start()

        const companyCreated = await this.$store.dispatch('companies/companyRegister', this.company)
        if (companyCreated) {
          const companyGuid = this.$store.state.companies.currentCompany.guid
          for (const user of this.users.list) {
            const fine = true
            const userGuid = user.guid
            if (user.new) {
              try {
                const {
                  guid,
                  firstname,
                  lastname,
                } = await this.$api.users.createUser({
                  ...user,
                  email: user.userEmail,
                  language: this.$store.state.locale,
                  need_reg: 1
                })
                userGuid = guid
              } catch (e) {
                fine = false
                showErrorMessage(e.message)
              }
            }

            if (fine && userGuid) {
              try {
                await this.$store.dispatch('companies/addUserToCompany', {
                  companyGuid,
                  userGuid,
                  roleGuid: user.roleGuid,
                  //needInvitation: user.sendInvitation ? 1 : 0
                  needInvitation: 0 // we will accept all users for now TODO need to be changed to previos
                })
              } catch (e) {
                showErrorMessage(e.message)
              }
            }
          }
        }
        this.$resetData()
        this.$store.dispatch('companies/showCreateNewDialog', false)

        this.$nuxt.$loading.finish()
      })
    }
  },

  watch: {
    visible() {
      if (this.visible) {
        this.reset()
      }
    }
  },

  created() {
    this.LAST_PAGE = 3
  }
}
</script>

<style lang="scss" scoped>
.th-dialog-new-company {

  .th-dialog-new-company-header {
    margin-bottom: 20px;

    .th-dialog-new-company-header-bottom {
      display: flex;
      flex-direction: row;
      margin-left: 100px;
      margin-right: 100px;
      margin-top: 30px;
      margin-bottom: 20px;

      .th-dialog-new-company-header-bottom-col {
        display: flex;
        flex-direction: column;
        margin-left: 20px;

        .th-dialog-new-company-header-bottom-col-title {
          color: #909399;
          margin-bottom: 8px;
        }
      }
    }
  }

  .th-dialog-new-company-body {
    margin-top: 40px;

    .th-company-create-new-requisites-wrapper {

      .th-company-create-new-requisites {
        // display: flex;
        // flex-direction: row;

        .th-company-create-new-requisites-right-langs {
          float: right;
          margin: 0 0 15px;

          span {
            font-size: 13px;
            margin: 0 5px;
            padding: 0 5px;
            cursor: pointer;
            color: #409EFF;

            &:hover {
              text-decoration: underline;
            }

            &.active {
              font-weight: bold;
            }
          }
        }
      }
    }

    .th-company-create-new-done-wrapper {

      .th-company-create-new-done {
        text-align: center;
        display: flex;
        flex-direction: column;

        span:first-child {
          margin: auto;
          margin-bottom: 20px;

          .icon {
            width: 60px;
            height: 60px;
          }
        }

        span:last-child {
          margin: 10px 0 20px;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }

  .th-container {
    padding: 0px 160px;
    margin-bottom: 15px;
  }

  .th-dialog-new-company-footer {
    margin-top: 20px;

    button {
      width: 100%;
      margin-left: 0;
    }
  }
}
</style>
