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

  // asyncData({ store, app }) {
  //   const company = app.$copyObjectWithoutReactivity(store.state.companies.currentCompany)

  //   return { company }
  // },

  fetch({ store }) {
    store.commit('companies/SET_NAVMENU')

    return Promise.all([
      store.dispatch('companies/loadCompanyUsers'),
      store.dispatch('companies/loadCompanyAccredCompanies')
    ])
  },

  beforeRouteLeave(to, from, next) {
    router.beforeRouteLeave(this, 'company-profile', next)
  }
}
</script>
