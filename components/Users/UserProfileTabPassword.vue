<template>
<div class="UserProfilePassword">

  <div class="UserProfilePassword__content">
    <Button
      @click="visible = true"
      type="primary"
      round
    >{{ $t('forms.common.changePassword') }}</Button>
  </div>

  <AuthChangePassword
    :visible.sync="visible"
    :user="user"
    @close="visible = false"
  />

</div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import AuthChangePassword from '@/components/Auth/AuthChangePassword'

export default {
  components: {
    Button,
    AuthChangePassword
  },

  data: () => ({
    visible: false
  }),

  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.UserProfilePassword {
    padding: 40px;

    background-color: #fff;

    border-radius: 5px;
    border: 1px solid #ebeef5;
}
</style>
