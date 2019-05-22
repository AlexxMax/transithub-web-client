<template>
  <CompanyProfile/>
</template>

<script>
import CompanyProfile from '@/components/Companies/CompanyProfile'

export default {
  components: {
    CompanyProfile
  },

  methods: {
    busListener() {
      if (this.$route.params.guid !== this.$store.state.companies.currentCompany.guid) {
        this.$router.push(this.$i18n.path('workspace/companies'))
      }
    }
  },

  fetch({ store, route }) {
    const company = store.getters['companies/getCompanyByGuid'](route.params.guid)
    store.dispatch('companies/setCurrentCompany', company)
    return
  },

  mounted() {
    // Bus
    this.$bus.companies.currentCompanyChanged.on(this.busListener)
  },

  beforeDestroy() {
    // Bus
    this.$bus.companies.currentCompanyChanged.off(this.busListener)
  }
}
</script>

<style lang='scss' scoped>

</style>
