<template>
  <el-dialog
    :title="$t('forms.common.passwordChange')"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
  >

    <el-form
      v-loading="loadingPasswordChangeForm"
      :model="changePasswordWithPinModel"
      :rules="formRules"
      ref="formChangeUserPasswordWithPhone"
      label-width="120px"
      size="mini"
      label-position="top"
      style="text-align: center"
    >

      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-col :xs="24" :sm="16" :md="16" :lg="16">
          <div>
            {{ passwordChangeConfirmationPinText }}
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="24">
          <el-form-item
            :label="$t('forms.common.smsPinCode')"
            prop="pin"
          >
            <input
              class="DialogChangeUserPassword__change-phone_pin"
              type="text"
              ref="pin"
              v-mask="'#  #  #  #'"
              v-model="changePasswordWithPinModel.pin"
              @keyup.enter.prevent="handleConfirm"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" style="margin-top: -20px; margin-bottom: 20px;">
        <el-col :span="24">
          <Button @click="sendPinToChangePassword">
            {{ $t('forms.user.login.repeatMessage') }}
          </Button>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" style="margin-bottom: 20px">
        <el-col :xs="24" :sm="16" :md="16" :lg="16">
          <div>
            {{ $t('forms.common.enterNewPassword') }}
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center" style="margin-bottom: 30px">
        <el-col :xs="24" :sm="16" :md="12" :lg="8">
          <el-form-item
            :label="$t('forms.user.profile.newPassword')"
            prop="newPassword"
          >
            <InputPassword
              v-model="changePasswordWithPinModel.newPassword"
              @validation="handlePasswordValidation"
            />
            <!-- <el-input
              v-model="passwordMixin_password"
              type="password"
              :maxlength="500"
              autocomplete="new-password"
              show-password
              @input="$_passwordMixin_handleChange"
            >
              <i class="el-icon-edit el-input__icon" slot="suffix"></i>
            </el-input> -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="24">
          <Button
            type="primary"
            round
            :loading="loadingChangePasswordRequestPin"
            style="width: 100%;"
            @click="handlePinPasswordSubmit"
          >
            {{ $t('forms.common.changePassword') }}
          </Button>
        </el-col>
      </el-row>

    </el-form>

  </el-dialog>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import InputPassword from '@/components/Common/InputPassword'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { VALIDATION_TRIGGER } from '@/utils/constants'
import { showErrorMessage, showSuccessMessage } from '@/utils/messages'

export default {
  name: 'th-dialog-change-user-password',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: { Button, InputPassword },

  props: {
    userGuid: {
      type: String
    },
    userEmail: {
      type: String
    },
    userPhone: {
      type: String
    }
  },

  data() {
    const validation = {
      pin: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t('forms.user.validation.pin')))
        }
        cb()
      },
      newPassword: (rule, value, cb) => {
        if (!this.passwordValidation.valid) {
          cb(new Error(this.passwordValidation.validationMessage))
        }
        cb()
      }
    }

    return {
      loadingChangePasswordRequestPin: false,
      loadingPasswordChangeForm: false,
      changePasswordWithPinModel: {
        pin: '',
        newPassword: ''
      },
      passwordValidation: {
        valid: false,
        validationMessage: null
      },
      usedGuid: '',
      usedPhone: '',

      dialogVisible: false,

      formRules: {
        pin: [{
          required: true,
          validator: validation.pin,
          trigger: VALIDATION_TRIGGER
        }],
        newPassword: [{
          required: true,
          validator: validation.newPassword,
          trigger: VALIDATION_TRIGGER,
          max: 500
        }],
      },
    }
  },

  computed: {
    phone() {
      if (this.userPhone && this.userPhone.pValidPhone()) {
        return this.userPhone.pNormalizePhone()
      }
      return this.usedPhone.pNormalizePhone()
    },
    passwordChangeConfirmationPinText() {
      return this.$t('forms.common.pinCodeConfirmation')
        .replace(
          '<b>%1</b>',
          this.phone.pHidePhonePart()
        )
    }
  },

  methods: {
    handlePasswordValidation(valid, validationMessage) {
      this.passwordValidation.valid = valid
      this.passwordValidation.validationMessage = validationMessage
    },
    async sendPinToChangePassword() {
      this.loadingPasswordChangeForm = true

      try {
        // if (!this.phone || !this.phone.pValidPhone()) {
        //   throw new Error(this.$t('messages.userNeedToEnterPhoneNumberInProfile'))
        // }

        let sendPhone
        if (this.userPhone && this.userPhone.pValidPhone()) {
          sendPhone = this.userPhone.pUnmaskPhone()
        }

        const { status, phone, guid } = await this.$api.users.changePasswordSendPin(this.userGuid, this.userEmail, sendPhone)
        if (status) {
          this.usedGuid = guid
          this.usedPhone = phone
          this.dialogVisible = true
        } else {
          throw new Error(this.$t('messages.errorOnServer'))
        }
      } catch ({ message }) {
        showErrorMessage(message)
      }

      this.loadingPasswordChangeForm = false
    },
    async handlePinPasswordSubmit() {
      this.loadingChangePasswordRequestPin = true

      try {
        const userGuid = this.userGuid || this.usedGuid
        if (!userGuid) {
          throw new Error(this.$t('messages.errorOnServer'))
        }

        const { status } = await this.$api.users.changePasswordConfirm(userGuid, this.changePasswordWithPinModel.pin.trimPin(), this.changePasswordWithPinModel.newPassword)
        if (status) {
          showSuccessMessage(this.$t('messages.savePasswordSuccess'))
          this.dialogVisible = false
        } else {
          throw new Error(this.$t('messages.errorOnServer'))
        }
      } catch ({ message }) {
        showErrorMessage(message)
      }

      this.loadingChangePasswordRequestPin = false
    }
  },

  watch: {
    dialogVisible() {
      if (!this.dialogVisible) {
        this.changePasswordWithPinModel = {
          pin: '',
          newPassword: ''
        }
        this.usedGuid = ''
        this.usedPhone = ''
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.DialogChangeUserPassword__change-phone_pin {
  margin: auto;
  text-align: center;
  width: 150px;
  font-size: 34px;
  font-weight: bold;
  border: 1px solid rgb(220, 223, 230);
  border-radius: 5px;
  color: #606266;
  padding: 8px;

  &:focus {
    outline: none;
    border: 1px solid #FFD74D;
  }
}
</style>
