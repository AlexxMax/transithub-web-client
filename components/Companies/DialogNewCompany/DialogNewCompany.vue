<template>
  <el-dialog
    :title="$t('forms.company.newCompanyDialog.formTitle')"
    :visible="visible"
    width="80%"
    top="50px"
    @close="$emit('close')">

    <div class="th-dialog-new-company">
      <div class="th-dialog-new-company-header">
        <el-steps :active="activePage" align-center>
          <el-step
            :title="$t('forms.company.newCompanyDialog.pageRequisites')"
            :description="$t('forms.company.newCompanyDialog.pageRequisitesDesc')">
          </el-step>
          <el-step
            :title="$t('forms.company.newCompanyDialog.pageContacts')"
            :description="$t('forms.company.newCompanyDialog.pageContactsDesc')">
          </el-step>
          <el-step
            :title="$t('forms.company.newCompanyDialog.pageUsers')"
            :description="$t('forms.company.newCompanyDialog.pageUsersDesc')">
          </el-step>
          <el-step
            :title="$t('forms.company.newCompanyDialog.pageInfo')"
            :description="$t('forms.company.newCompanyDialog.pageInfoDesc')">
          </el-step>
          <el-step
            :title="$t('forms.company.newCompanyDialog.pageDone')">
          </el-step>
        </el-steps>
      </div>

      <div class="th-dialog-new-company-body">
        <th-dialog-new-company-requisites :company="company" v-if="activePage === 0" />
        <th-dialog-new-company-contacts :company="company" v-if="activePage === 1" />
        <th-dialog-new-company-users :users="users" v-if="activePage === 2" />
        <th-dialog-new-company-info :company="company" v-if="activePage === 3" />
        <th-dialog-new-company-done v-if="activePage === 4" />
      </div>

      <div class="th-dialog-new-company-footer">
        <th-button v-if="activePage !== 4" type="primary" @click="activePage++">{{ $t('forms.common.next') }}</th-button>
        <th-button v-if="activePage === 4" type="primary" @click="onSubmit">{{ $t('forms.company.newCompanyDialog.submit') }}</th-button>
        <th-button v-if="activePage > 0" style="margin-top: 10px" type="text" @click="activePage--">{{ $t('forms.common.prev') }}</th-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Requisites from '@/components/Companies/DialogNewCompany/DialogNewCompanyRequisites'
import Contacts from '@/components/Companies/DialogNewCompany/DialogNewCompanyContacts'
import Users from '@/components/Companies/DialogNewCompany/DialogNewCompanyUsers'
import Info from '@/components/Companies/DialogNewCompany/DialogNewCompanyInfo'
import Done from '@/components/Companies/DialogNewCompany/DialogNewCompanyDone'

import API from '@/utils/api'
import { resetData } from '@/utils/componentsCommonMethods'

export default {
  components: {
    "th-button": Button,
    "th-dialog-new-company-requisites": Requisites,
    "th-dialog-new-company-contacts": Contacts,
    "th-dialog-new-company-users": Users,
    "th-dialog-new-company-info": Info,
    "th-dialog-new-company-done": Done
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      company: {
        name: '',
        organisationForm: null,
        taxScheme: null,
        description: '',
        edrpou: '',
        inn: ''
      },
      users: { list: [], count: 0 },

      activePage: 0
    }
  },

  async created() {
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
      invitationAccepted: true
    })
    this.users.count = 1


  },

  methods: {
    onSubmit: async function() {
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
              } = await API.users.create({
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
                sendInvitation: user.sendInvitation
              })
            } catch (e) {
              showErrorMessage(e.message)
            }
          }
        }
      }
      resetData(this)
      this.$store.dispatch('companies/showCreateNewDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.th-dialog-new-company {

  .th-dialog-new-company-header {
    margin-bottom: 20px;
  }

  .th-dialog-new-company-footer {
    margin-top: 20px;
    width: 100%;

    button {
      width: 100%;
      margin-left: 0;
    }
  }
}
</style>
