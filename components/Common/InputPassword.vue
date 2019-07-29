<template>
<el-input
  :class="['InputPassword', { 'InputPassword--required': required }]"
  v-model="password"
  type="password"
  :maxlength="500"
  :placeholder="$t('forms.user.validation.password')"
  autocomplete="new-password"
  show-password
  clearable
  :size="size"
  @input="handleInput"
/>
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
    },
    size: {
      type: String,
      validator: value => ['mini', 'small', 'medium'].indexOf(value) !== -1
    },
    required: {
      type: Boolean,
      default: false
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

<style lang='scss'>
$color-danger: #F56C6C;

.InputPassword {
  &--required {
    &:before {
      content: '*' !important;

      margin-right: 4px !important;

      color: $color-danger !important;
    }
  }
}
</style>
