<template>
  <div>
    <ChangePassword
      ref="user-profile"
      :user="user"
      @changed="_changed => changed = _changed"
    />
  </div>
</template>

<script>
import ChangePassword from '@/components/DriverWorkspace/Settings/ChangePassword'

export default {
  layout: "driver",

  components: {
    ChangePassword
  },

  data() {
    return {
      user: {
        phone: ''
      },

      changed: false
    }
  },

  asyncData({ store }) {
    const { phone, guid } = store.state.user

    return {
      user: {
        guid,
        phone: phone
      }
    }
  },

  computed: {
    title () {
      return this.$t('forms.common.passwordChange') + ' - Transithub'
    }
  },

  head () {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss" scoped>

</style>