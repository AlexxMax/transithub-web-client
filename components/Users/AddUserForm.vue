<template>
  <div class="th-add-user-form-wrapper">
    <div class="th-add-user-form" v-loading="loading">
      <el-form :model="user" label-width="120px" size="mini" label-position="top">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('forms.common.email')">
              <el-input v-model="user.email" placeholder="example@at.com" @change="onEmailChange"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <div class="th-add-user-form-email-info">
              <th-hint :title="$t('info.title.findUserByEmail')" :text="$t('info.text.findUserByEmail')" />
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="$t('forms.user.common.firstname')">
              <el-input v-model="user.firstname" :placeholder="$t('forms.user.placeholdes.firstname')"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$t('forms.user.common.lastname')">
              <el-input v-model="user.lastname" :placeholder="$t('forms.user.placeholdes.lastname')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <th-role-select
              :value="user.role"
              @onSelect="onRoleSelect"
              />
          </el-col>

          <el-col :span="12">
            <el-checkbox style="marginTop: 40px;" v-model="user.sendInvitation">{{ $t('forms.user.common.sendInvitation') }}</el-checkbox>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span=24>
            <div class="th-add-user-form-footer">
              <th-button type="" @click="$emit('onCancel')">{{ $t('forms.company.users.addUserDiscard') }}</th-button>
              <th-button type="primary" @click="$emit('onAddUser', user)">{{ $t('forms.company.users.addUser') }}</th-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Toolbar from '@/components/Common/Toolbar'
import UsersRolesSelectFormField from '@/components/Users/UsersRolesSelectFormField'
import Hint from '@/components/Common/Hint'

import API from '@/utils/api'
import { showMessage } from '@/utils/messages'

export default {
  components: {
    "th-button": Button,
    "th-toolbar": Toolbar,
    "th-role-select": UsersRolesSelectFormField,
    "th-hint": Hint
  },

  data() {
    return {
      user: {
        guid: '',
        firstname: '',
        lastname: '',
        email: '',
        role: 'admin',
        sendInvitation: true
      },
      loading: false
    }
  },

  created() {
    this.role = this.$store.getters['usersRoles/getAdminRole'].guid || null
  },

  methods: {
    onRoleSelect: function(role) {
      this.user.role = role
    },
    onEmailChange: async function(value) {
      this.loading = true
      try {
        const {
          status,
          msg,
          guid,
          firstname,
          lastname
        } = await API.users.findByEmail(value)
        if (status) {
          this.user = { ...this.user, guid, firstname, lastname }
        } else {
          throw new Error(msg)
        }
      } catch (e) {
        showMessage(e.message)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.th-add-user-form-wrapper {
  margin: 0 -20px 20px;
  padding: 0 20px 20px;
  border-bottom: 1px solid #e7e8ec;

  .th-add-user-form {
    clear: both;

    .th-add-user-form-email-info {
      margin-top: 40px;
    }

    .th-add-user-form-footer {
      margin-top: 15px;
      float: right;
    }
  }
}
</style>
