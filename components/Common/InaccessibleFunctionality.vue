<template>
  <el-dialog
    :visible.sync="visible"
    :title="$t('forms.common.inaccessibleFunctionality')"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '30%'"
    append-to-body
  >
    <div class="InaccessibleFunctionality">
      <div class="InaccessibleFunctionality__text">{{ text }}</div>

      <nuxt-link v-if="!noLoginBtn" class="InaccessibleFunctionality__btn" to="/login">
        <Button type="primary">
          {{ $t('forms.user.login.doLogin') }}
        </Button>
      </nuxt-link>

      <slot/>
    </div>
  </el-dialog>
</template>

<script>
import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import Button from '@/components/Common/Buttons/Button'

export default {
  name: 'th-inaccessible-functionality',

  components: {
    Button
  },

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  props: {
    text: {
      type: String,
      required: true
    },
    noLoginBtn: Boolean
  },

  data: () => ({
    visible: false
  }),

  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.InaccessibleFunctionality {
  display: flex;
  flex-direction: column;
  text-align: center;

  &__text {
    font-size: 20px;
  }

  &__btn {
    width: 100%;
    margin-top: 30px;
  }
}
</style>
