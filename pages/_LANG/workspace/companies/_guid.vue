<template>
  <CompanyProfile/>
</template>

<script>
import CompanyProfile from '@/components/Companies/CompanyProfile'

export default {
  components: {
    CompanyProfile
  },

  fetch({ store, route }) {
    const company = store.getters['companies/getCompanyByGuid'](route.params.guid)
    store.dispatch('companies/setCurrentCompany', company)
    return
  }
}
</script>

<style lang='scss' scoped>

</style>
