<template>
  <UserProfile :user="user" :companies="companies" />
</template>

<script>
import UserProfile from '@/components/Users/UserProfile'

export default {
  components: { UserProfile },

  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        language: ''
      },

      companies: []
    }
  },

  asyncData({ store }) {
    const { firstname, lastname, email, language, guid } = store.state.user

    return {
      user: {
        guid,
        firstname,
        lastname,
        email,
        language: language || store.state.locale
      },

      companies: [ ...store.state.companies.list ]
    }
  }
}
</script>
