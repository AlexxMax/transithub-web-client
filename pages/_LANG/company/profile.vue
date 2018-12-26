<template>
  <CompanyProfile ref="company-profile" @changed="_changed => changed = _changed"/>
</template>

<script>
import CompanyProfile from '@/components/Companies/CompanyProfile'

import router from '@/utils/router'
import EventBus from '@/utils/eventBus'

export default {
  components: {
    CompanyProfile
  },

  data() {
    return {
      company: {
        name: ' ',
        fullname: '',
        shortname: '',
        workname: '',
        description: '',
        info: '',
        edrpou: '',
        inn: ''
      },

      changed: false
    }
  },

  // asyncData({ store, app }) {
  //   const company = app.$copyObjectWithoutReactivity(store.state.companies.currentCompany)
  //   console.log(company);

  //   return { company }
  // },

  fetch({ store }) {
    store.commit('companies/SET_NAVMENU')

    return Promise.all([
      store.dispatch('companies/loadCompanyUsers'),
      store.dispatch('companies/loadCompanyAccredCompanies')
    ])
  },

  mounted() {
    EventBus.$on('workspace-changed', () => {
      this.$router.push('/workspace')
    })
  },

  beforeRouteLeave(to, from, next) {
    router.beforeRouteLeave(this, 'company-profile', next)
  }
}
</script>
