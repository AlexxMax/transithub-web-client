<template>
  <div>
    <el-dialog
      :gutter="20"
      :visible="visible"
      :title="$t('forms.company.dialog.users')"
      top="50px"
      width="60%"
      @close="$emit('close')">

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
            @onOpenUserRole="currentUserGuid = user.guid; visibleDialogRoleSelect = true"
            @onUserActivation="onUserActivation(user)"
            @onSendInvitation="onSendInvitation(user)" />
        </el-col>
      </el-row>
    </el-dialog>

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
import Toolbar from '@/components/Common/Toolbar'
import UserWidget from '@/components/Users/UserWidget'
import DialogRoleSelect from '@/components/Users/DialogRoleSelect'
import AddUserForm from '@/components/Users/AddUserForm'

import { showErrorMessage, showSuccessMessage } from '@/utils/messages'

export default {
  components: {
    "th-button": Button,
    "th-toolbar": Toolbar,
    "th-user-widget": UserWidget,
    "th-dialog-role-select": DialogRoleSelect,
    "th-add-user-form": AddUserForm
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      users: { list: [], count: 0 },

      currentUserGuid: null,
      visibleDialogRoleSelect: false,
      visibleAddUserForm: false
    }
  },

  async created() {
    await this.fetchAndUpdateUsers()
  },

  methods: {
    fetchAndUpdateUsers: async function() {
      await this.$store.dispatch('companies/loadCompanyUsers')

      this.users.list = []
      this.users.count = 0

      for (const user of this.$store.state.companies.users.list) {
        this.users.list.push({ ...user })
      }
      this.users.count = this.$store.state.companies.users.count
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
          } = await this.$api.users.create({
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
            needInvitation: user.sendInvitation
          })
        } catch (e) {
          fine = false
          showErrorMessage(e.message)
        }

        if (fine && userAdded) {
          await this.fetchAndUpdateUsers()
        }
      }

      if (fine) {
        message = S(this.$t('messages.userInvitedToCompany')).replaceAll('%1', `${userData.firstname} ${userData.lastname}`).s
        showSuccessMessage(message)
      }
    }
  }
}
</script>
