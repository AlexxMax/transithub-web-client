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
        phone: '',
        language: ''
      },

      companies: []
    }
  },

  asyncData({ store }) {
    const { firstname, lastname, email, phone, language, guid } = store.state.user

    return {
      user: {
        guid,
        firstname,
        lastname,
        email,
        phone: phone || '+38',
        language: language || store.state.locale
      },

      companies: [ ...store.state.companies.list ]
    }
  }
}
</script>
