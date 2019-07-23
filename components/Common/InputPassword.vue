<template>
  <div class="InputPassword">
    <el-input
      v-model="password"
      type="password"
      :maxlength="500"
      :placeholder="$t('forms.user.validation.password')"
      autocomplete="new-password"
      show-password
      clearable
      @input="handleInput"
    />

    <div class="InputPassword__help">
      <el-popover
        placement="top-start"
        trigger="click"
        width="300"
        :title="$t('forms.common.passwordRulesTitle')"
      >
        <p style="word-break: normal;">{{ $t('forms.common.passwordRulesContent') }}</p>
        <div slot="reference">
          <fa icon="question-circle"/>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-input-password',

  props: {
    value: {
      type: String,
      required: true
    },
    minLength: {
      type: Number,
      default: 8
    },
    checkLength: {
      type: Boolean,
      default: true
    },
    checkLowercase: {
      type: Boolean,
      default: true
    },
    checkUpppercase: {
      type: Boolean,
      default: true
    },
    checkNumber: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    password: null,
    validPasswordLength: false,
    containsLowercase: false,
    containsNumber: false,
    containsUppercase: false,
    valid: false,
    validationMessage: null
  }),

  created() {
    this.handleInput()
  },

  methods: {
    handleInput() {
      this.valid = true
      this.validationMessage = null

      this.validPasswordLength = this.password.length >= this.minLength
      this.containsLowercase = /[a-z]/.test(this.password)
      this.containsNumber = /\d/.test(this.password)
      this.containsUppercase = /[A-Z]/.test(this.password)

      if (this.checkLength && !this.validPasswordLength) {
        this.valid = false
        this.validationMessage = this.$t('forms.common.incorrectPasswordLength')
      }

      if (this.valid && this.checkLowercase && !this.containsLowercase) {
        this.valid = false
        this.validationMessage = this.$t('forms.common.passwordMustContainLowercase')
      }

      if (this.valid && this.checkUpppercase && !this.containsUppercase) {
        this.valid = false
        this.validationMessage = this.$t('forms.common.passwordMustContainUppercase')
      }

      if (this.valid && this.checkNumber && !this.containsNumber) {
        this.valid = false
        this.validationMessage = this.$t('forms.common.passwordMustContainNumber')
      }

      this.$emit('input', this.password)
      this.$emit('validation', this.valid, this.validationMessage)
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.password = value
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.InputPassword {
  display: flex;
  flex-direction: row;

  &__help {
    margin-left: 10px;
  }
}
</style>
