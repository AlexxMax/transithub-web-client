<template>
  <div>
    <el-dialog
      class="UserPhoneConfirmation"
      :title="$t('forms.common.userPhoneConfirmation')"
      :visible="visible"
      :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '400px'"
      @close="handleClose">

      <el-form
        label-position="top"
        label-width="100px"
        v-loading="loading"
        size="mini"
        @submit.native.prevent>

        <el-row>
          <el-col :span="24">
            <div v-html="text"/>
          </el-col>
        </el-row>

        <el-row>
          <el-row :span="24">
            <input
              class="UserPhoneConfirmation__pin"
              type="text"
              ref="pin"
              v-mask="'#  #  #  #'"
              v-model="pin"
              @keyup.enter.prevent="handleConfirm"
            />
          </el-row>
        </el-row>

        <el-row style="margin-top: -20px; margin-bottom: 20px;">
          <el-col :span="24">
            <Button
              style="width: 100%"
              @click="handleRepeat"
              :timer.sync="timer"
            >
              {{ $t('forms.user.login.repeatMessage') }}
            </Button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <Button
              type="primary"
              style="width: 100%"
              @click="handleConfirm"
            >
              {{ mainButtonText }}
            </Button>
          </el-col>
        </el-row>

      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { VALIDATION_TRIGGER } from '@/utils/constants'
import { showErrorMessage } from '@/utils/messages'

export default {
  name: "th-user-phone-confirmation",

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Button
  },

  props: {
    phone: {
      type: String,
      required: true
    },
    mainButtonLabel: String,
    emitRepeat: Boolean
  },

  data: () => ({
    pin: '',
    timer: false,
    visible: false,
    loading: false
  }),

  computed: {
    text() {
      return this.$t('forms.common.pinCodeConfirmation').replace('%1', this.phone.pMaskPhone().pHidePhonePart())
    },
    mainButtonText() {
      return this.mainButtonLabel ? this.mainButtonLabel : this.$t('forms.user.login.logIn')
    }
  },

  // mounted() {
  //   this.$nextTick(() => this.timer = true)
  // },

  methods: {
    show() {
      this.pin = ''
      this.visible = true
      this.$nextTick(() => this.timer = true)
    },
    hide() {
      this.visible = false
    },
    getPin() {
      return this.pin.trimPin()
    },
    async handleRepeat() {
      this.loading = true

      if (this.emitRepeat)
        this.$emit('repeat')
      else {
        const { status, pinSended } = await this.$api.users.sendPinToUser(this.phone, null)
        if (status) this.timer = true
      }

      this.loading = false
    },
    handleConfirm() {
      this.$emit('submit')
    },
    handleClose() {
      this.hide()
      this.$emit('close')
    },
    focusPin() {
      this.$refs.pin.focus()
    }
  },

  updated() {
    if (this.visible) {
      this.focusPin()
    }
  }
}
</script>

<style lang="scss" scoped>
.UserPhoneConfirmation {
  text-align: center;
}

.UserPhoneConfirmation__pin {
  text-align: center;
  width: 150px;
  font-size: 34px;
  font-weight: bold;
  margin: 20px auto;
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
