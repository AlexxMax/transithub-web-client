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

    <span class="PasswordRules__message">{{ item.message }}</span>
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
    result() {

      return {
        length: {
          isValid: this.password.length >= 8,
          message: this.$t('forms.common.incorrectPasswordLength')
        },
        number: {
          isValid: /\d/.test(this.password),
          message: this.$t('forms.common.passwordMustContainNumber')
        },
        lowercase: {
          isValid: /[a-z]/.test(this.password),
          message: this.$t('forms.common.passwordMustContainLowercase')
        },
        uppercase: {
          isValid: /[A-Z]/.test(this.password),
          message: this.$t('forms.common.passwordMustContainUppercase')
        }
      }

    }
  },

  methods: {
    handlePassword() {
      const isValid = () => {
        for (let key in this.result) {
          if (!this.result[key].isValid) return false
        }
        return true
      }

      this.$emit('validation', isValid())
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
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    width: 50%;

    line-height: 1;

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
    word-break: normal
  }
}
</style>
