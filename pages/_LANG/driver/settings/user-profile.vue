<template>
  <div>
    <UserProfile
      ref="user-profile"
      :user="user"
    />
  </div>
</template>

<script>
import UserProfile from '@/components/DriverWorkspace/Settings/UserProfile'
import router from '@/utils/router'

export default {
  layout: "driver",

  components: {
    UserProfile
  },

  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        language: '',
        isDriver: true
      }
    }
  },

  asyncData({ store }) {
    const { firstname, lastname, email, phone, phoneChecked, language, guid, isDriver } = store.state.user

    return {
      user: {
        guid,
        firstname,
        lastname,
        email,
        phone: (phone || '+38').pMaskPhone(),
        language: language || store.state.locale,
        phoneChecked,
        isDriver
      }
    }
  },

  computed: {
    title () {
    	return this.$t('forms.driverWorkspace.personalInfo') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  },

  // beforeRouteLeave(to, from, next) {
  //   router.beforeRouteLeave(this, 'user-profile', next)
  //
  //   // const answer = window.confirm('Вы хотите уйти? У вас есть несохранённые изменения!')
  //   // if (answer) {
  //   //   next()
  //   // } else {
  //   //   next(false)
  //   // }
  // }
}
</script>


<style lang="scss" scoped>

</style>
