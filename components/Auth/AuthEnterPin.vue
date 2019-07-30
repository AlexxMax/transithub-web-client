<template>
  <div
    class="AuthEnterPin"
    v-loading="loading"
  >

    <div
      class="AuthEnterPin__phone"
      v-html="message"
    />

    <input
      class="AuthEnterPin__pin"
      type="text"
      v-mask="'#  #  #  #'"
      v-model="pin"
      autofocus
      @keyup.enter.prevent="beforeEmit"
    />

    <Button
      class="AuthEnterPin__btn-repeat"
      :timer.sync="timer"
      @click="handleSendPin"
    >{{ $t('forms.user.login.repeatMessage') }}</Button>

    <Button
      class="AuthEnterPin__btn-submit"
      round
      type="primary"
      style="width: 95%"
      @click="beforeEmit"
    >{{ buttonText }}</Button>

  </div>
</template>

<script>
import * as notify from '@/utils/notifications'

import Button from '@/components/Common/Buttons/Button'

export default {
  components: {
    Button
  },

  data: () => ({
    timer: false,
    pin: null
  }),

  props: {
    user: {
      type: Object,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    },

    buttonText: {
      type: String,
      required: true
    }
  },

  created() {
    this.handleSendPin()
  },

  computed: {
    message() {
      return this.$t('forms.common.pinCodeConfirmation').replace('%1', this.user.phone.pHidePhonePart())
    }
  },

  methods: {
    async handleSendPin() {

      this.$emit('update:loading', true)

      try {

        const phone = this.user.phone.pUnmaskPhone()
        const { status, guid } = await this.$api.users.changePasswordSendPin(
          this.user.guid,
          this.user.email,
          phone
        )

        if (status) {
          this.usedGuid = guid
          this.timer = true
        } else
          throw new Error(this.$t('messages.errorOnServer'))

      } catch ({ message }) {
        notify.error(message)
      } finally {
        this.$emit('update:loading', false)
      }

    },

    beforeEmit() {

      if (!this.pin || this.pin.trimPin().length !== 4)
        notify.error(this.$t('messages.inccorectPin'))
      else
        this.$emit('submit', this.pin.trimPin(), this.usedGuid)

    }
  }
}
</script>

<style lang="scss" scoped>
.AuthEnterPin {

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &__phone {
        margin-bottom: 1rem;

        text-align: center;
    }

    &__pin {
        max-width: 150px;

        padding: 0.5rem;

        color: #606266;
        font-size: 34px;
        text-align: center;
        font-weight: bold;

        border-radius: 5px;
        border: 1px solid rgb(220, 223, 230);

        &:focus {
            outline: none;
            border: 1px solid #FFD74D;
        }
    }

    &__btn-repeat {
        margin-bottom: 1rem;
    }
}
</style>
