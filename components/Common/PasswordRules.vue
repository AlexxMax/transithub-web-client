<template>
<ul class="PasswordRules">

  <li
    class="PasswordRules__item"
    v-for="(item, key, index) in result"
    :key="index"
  >
    <i
      v-if="item.isValid"
      class="PasswordRules__icon PasswordRules__icon--success el-icon-check"
    />
    <i
      v-else
      :class="['PasswordRules__icon', 'PasswordRules__icon--error', {'PasswordRules__icon--muted': item.isValid === null }, 'el-icon-close']"
    />

    <span :class="['PasswordRules__message', { 'PasswordRules__message--muted': item.isValid === null }]">{{ item.message }}</span>
  </li>

</ul>
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      required: true
    },

    reset: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

      result: {
        length: {
          isValid: null,
          message: this.$t('forms.common.incorrectPasswordLength')
        },
        number: {
          isValid: null,
          message: this.$t('forms.common.passwordMustContainNumber')
        },
        lowercase: {
          isValid: null,
          message: this.$t('forms.common.passwordMustContainLowercase')
        },
        uppercase: {
          isValid: null,
          message: this.$t('forms.common.passwordMustContainUppercase')
        }
      }

    }
  },

  watch: {
    password(value) {
      this.handlePassword()
    },

    reset(value) {
      if (value) {
        this.$resetData()
        this.$emit('update:reset', false)
      }
    }
  },

  computed: {
    isValid() {
      for (let key in this.result)
        if (!this.result[key].isValid) return false
      return true
    }
  },

  methods: {
    handlePassword() {
      this.result.length.isValid = this.password.length >= 8 ? true : false
      this.result.number.isValid = /\d/.test(this.password) ? true : false
      this.result.lowercase.isValid = /[a-z]/.test(this.password) ? true : false
      this.result.uppercase.isValid = /[A-Z]/.test(this.password) ? true : false

      this.$emit('validation', this.isValid)
    }
  }
}
</script>

<style lang="scss" scoped>
$color-success: #67C23A;
$color-danger: #F56C6C;
$color-muted: #DCDFE6;

.PasswordRules {
  margin: 0;
  padding: .5rem 0 0 0;

  display: flex;
  flex-wrap: wrap;

  list-style: none;

  &__item {
    width: 50%;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    line-height: 1;

    transition: .2s;

    &:not(:last-child) {
      margin-bottom: .5rem;
    }

    @media (max-width: 750px) {
      width: 100%;
    }
  }

  &__icon {
    margin-right: .25rem;

    font-size: 1.25rem;
    line-height: .875rem;

    transition: .2s;

    &--success {
      color: $color-success;
    }

    &--error {
      color: $color-danger;
    }

    &--muted {
      color: $color-muted;
    }
  }

  &__message {
    word-break: normal;

    transition: .2s;

    &--muted {
      color: $color-muted;
    }
  }
}
</style>
