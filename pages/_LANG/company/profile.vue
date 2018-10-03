<template>
  <CompanyProfile :company="company" />
</template>

<script>
import CompanyProfile from '@/components/Companies/CompanyProfile'

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
    return Promise.all([
      store.dispatch('companies/loadCompanyUsers'),
      store.dispatch('companies/loadCompanyAccredCompanies')
    ])
  }
}
</script>
