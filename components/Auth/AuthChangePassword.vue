<template>
<el-dialog
  class="AuthChangePassword"
  :title="$t('forms.common.passwordChange')"
  :visible.sync="visible"
  :before-close="handleBeforeClose"
>

  <div
    v-show="!confirmPhone"
    class="AuthChangePassword__password"
  >
    <el-form
      ref="AuthChangePassword__form"
      size="mini"
      :model="form"
      :rules="rules"
      status-icon
    >
      <el-form-item
        prop="phone"
        :label="$t('forms.common.phone')"
        v-if="!$store.getters['user/isAuthenticated']"
      >
        <el-input
          v-mask="phoneMask"
          v-model="form.phone"
          :placeholder="$t('forms.user.validation.phone')"
          clearable
        />
      </el-form-item>

      <el-form-item
        prop="password"
        :label="$t('forms.user.profile.newPassword')"
      >
        <InputPassword
          :placeholder="$t('forms.user.validation.newPassword')"
          v-model="form.password"
        />
      </el-form-item>

      <el-form-item
        prop="confirm"
        :label="$t('forms.user.common.passwordCheck')"
      >
        <InputPassword
          :placeholder="$t('forms.user.validation.passwordCheck')"
          v-model="form.confirm"
        />
      </el-form-item>
    </el-form>

    <PasswordRules
      class="AuthChangePassword__rules"
      :password="form.password"
      :reset.sync="resetPasswordValidation"
      @validation="isValid => result = isValid"
    />

    <Button
      type="primary"
      round
      style="width: 100%; margin: 0 auto"
      @click="submitForm"
    >{{ $t('forms.user.profile.confirmBySMS') }}</Button>
  </div>

  <Fade>
    <AuthEnterPin
      v-if="confirmPhone"
      :buttonText="$t('forms.common.changePassword')"
      :user="user"
      :loading.sync="loading"
      @submit="handleChangePassword"
    />
  </Fade>

</el-dialog>
</template>

<script>
import { VALIDATION_TRIGGER, PHONE_MASK } from '@/utils/constants'
import { showErrorMessage, showSuccessMessage } from '@/utils/messages'

import Fade from '@/components/Common/Transitions/Fade'
import Button from '@/components/Common/Buttons/Button'
import InputPassword from '@/components/Common/InputPassword'
import PasswordRules from '@/components/Common/PasswordRules'
import AuthEnterPin from '@/components/Auth/AuthEnterPin'

export default {
  components: {
    Fade,
    Button,
    InputPassword,
    PasswordRules,
    AuthEnterPin
  },

  props: {
    user: {
      type: Object,
      required: true
    },

    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

      confirmPhone: false,
      phoneMask: PHONE_MASK,

      result: false,
      resetPasswordValidation: false,

      loading: false,

      usedGuid: null,

      form: {
        phone: '',
        password: '',
        confirm: '',
      },

      rules: {
        phone: [{
          max: 13,
          required: true,
          trigger: VALIDATION_TRIGGER,
          validator: (rule, value, cb) => {
            if (!value)
              cb(new Error(' '))
            else if (!value.pValidPhone())
              cb(new Error(this.$t('forms.user.validation.incorrectPhone')))
            else
              cb()
          }
        }],
        password: [{
          max: 100,
          required: true,
          trigger: VALIDATION_TRIGGER,
          validator: (rule, value, cb) => this.result ? cb() : cb(new Error(' ')),
        }],
        confirm: [{
          required: true,
          trigger: 'change',
          validator: (rule, value, cb) => {
            const { password, confirm } = this.form

            if (!confirm)
              cb(new Error(' '))
            else if (confirm !== password)
              cb(new Error(this.$t('forms.user.validation.passwordCheckDiff')))
            else
              cb()
          },
        }]
      }

    }
  },

  created() {
    this.confirmPhone = false
  },

  methods: {
    submitForm() {
      this.$refs['AuthChangePassword__form'].validate(valid => {

        if (!valid) return

        if (this.form.phone) this.user.phone = this.form.phone
        this.confirmPhone = valid

      })
    },

    async handleChangePassword(pin, userGuid) {

      try {

        if (!pin || !this.form.password) return

        this.loading = true

        const guid = this.user.guid || userGuid

        if (!guid)
          throw new Error(this.$t('messages.errorOnServer'))

        const { status } = await this.$api.users.changePasswordConfirm(
          guid,
          pin,
          this.form.password
        )

        if (status) {
          this.closeAndReset()
          showSuccessMessage(this.$t('messages.savePasswordSuccess'))
        }

      } catch ({ message }) {
        showErrorMessage(message)
      } finally {
        this.loading = false
      }

    },

    handleBeforeClose(done) {
      const message = this.$t('messages.interruptPasswordChange')
      const touched = this.form.password || this.form.confirm

      if (touched)
        this.$confirm(message).then(() => this.closeAndReset())
      else
        this.closeAndReset()
    },

    closeAndReset() {

      setTimeout(() => {
        this.confirmPhone = false
        this.form = { password: '', confirm: '' }
        this.resetPasswordValidation = true
      }, 500)

      this.$refs['AuthChangePassword__form'].resetFields()

      this.$emit('update:visible', false)

    }
  }
}
</script>

<style lang="scss" scoped>
.AuthChangePassword {

    &__rules {
        margin: 1rem 0;
    }

    &__button {
        margin: 0 auto;
    }
}
</style>
