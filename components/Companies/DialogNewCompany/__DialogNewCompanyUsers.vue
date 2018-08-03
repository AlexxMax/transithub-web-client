<template>
  <div class="th-company-create-new-users-wrapper">
    <div class="th-company-create-new-users">

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
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Toolbar from '@/components/Common/Toolbar'
import UserWidget from '@/components/Users/UserWidget'
import DialogRoleSelect from '@/components/Users/DialogRoleSelect'
import AddUserForm from '@/components/Users/AddUserForm'

export default {
  components: {
    "th-button": Button,
    "th-toolbar": Toolbar,
    "th-user-widget": UserWidget,
    "th-dialog-role-select": DialogRoleSelect,
    "th-add-user-form": AddUserForm
  },

  props: {
    users: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      currentUserGuid: null,
      visibleDialogRoleSelect: false,
      visibleAddUserForm: false
    }
  },

  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.th-company-create-new-users-wrapper {

  .th-company-create-new-users {
    // display: flex;
    // flex-direction: row;
  }
}

.th-container {
  padding: 0px 160px;
  margin-bottom: 15px;
}
</style>
