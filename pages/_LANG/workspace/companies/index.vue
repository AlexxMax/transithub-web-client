<template>
  <PagePattern>
    <CompaniesList :companies="companies"/>
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import CompaniesList from '@/components/Companies/CompaniesList'

export default {
  components: {
    PagePattern,
    CompaniesList
  },

  computed: {
    companies() {
      return this.$store.state.companies.list
    },

    title () {
    	return this.$t('forms.common.companies') + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
  },

  fetch({ store }) {
    return store.dispatch('companies/getUsersCompanies', { userGuid: store.state.user.guid })
  }
}
</script>

<style lang='scss' scoped>

</style>
