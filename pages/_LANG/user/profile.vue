<template>
  <UserProfile
    ref="user-profile"
    :user="user"
    @changed="_changed => changed = _changed"
  />
</template>

<script>
import UserProfile from '@/components/Users/UserProfile'
import router from '@/utils/router'

export default {
  components: { UserProfile },

  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        language: ''
      },

      // companies: [],

      changed: false
    }
  },

  asyncData({ store }) {
    const { firstname, lastname, email, phone, phoneChecked, language, guid } = store.state.user

    return {
      user: {
        guid,
        firstname,
        lastname,
        email,
        phone: phone || '+38',
        language: language || store.state.locale,
        phoneChecked
      }

      // companies: [ ...store.state.companies.list ]
    }
  },

  computed: {
    title () {
      const user = this.$store.getters["user/username"]
    	return this.$t('forms.common.profile') + ': ' + user + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  },

  beforeRouteLeave(to, from, next) {
    router.beforeRouteLeave(this, 'user-profile', next)
  }
}
</script>
