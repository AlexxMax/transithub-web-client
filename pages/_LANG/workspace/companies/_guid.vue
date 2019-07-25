<template>
  <div>
    <CompanyProfile/>
    <Backtop/>
  </div>
</template>

<script>
import CompanyProfile from '@/components/Companies/CompanyProfile'
import Backtop from '@/components/Common/Buttons/BacktopButton'

import { STORE_MODULE_NAME, ACTIONS_KEYS } from "@/utils/companies"

export default {
  components: {
    CompanyProfile,
    Backtop
  },

  computed: {
    title () {
      const currentCompany = this.$store.state[STORE_MODULE_NAME].currentCompany
    	return this.$t('forms.common.company') + ': ' + currentCompany.name + ' - Transithub'
  	}
  },

  methods: {
    busListener() {
      if (this.$route.params.guid !== this.$store.state.companies.currentCompany.guid) {
        this.$router.push(this.$i18n.path('workspace/companies'))
      }
    }
  },

  head () {
    return {
      title: this.title
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
