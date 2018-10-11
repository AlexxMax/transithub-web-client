<template>
  <CompanyProfile :company="company" />
</template>

<script>
import CompanyProfile from '@/components/Companies/CompanyProfile'

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
      }
    }
  },

  asyncData({ store }) {
    return { company: { ...store.state.companies.currentCompany } }
  },

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
}
</script>
