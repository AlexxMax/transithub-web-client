<template>
  <PagePattern>
    <FormList
      :list="$store.state.races.list"
      :grouped-list="$store.getters['races/groupedList']"
      :grouped="$store.getters['userSettings/isRacesListGrouped']"
      @eventFetch="_fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from '@/components/Races/FormList'

import { getStatusFilters } from '@/utils/races'

export default {
  components: {
    PagePattern,
    FormList
  },

  computed: { 
  	title () {
    	return this.$t('lists.races') + ' - Transithub'
  	}
  },

  methods: {
    async _fetch() {
      return await this.$store.dispatch("races/loadMore")
    },

    async busListener() {
      this.$store.commit('races/RESET')
      await this._fetch()
    }
  },

  head () {
    return {
      title: this.title
    }
  },

  created() {
    this.$store.commit('races/UPDATE_FILTERS_DATA', { statuses: getStatusFilters(this) })
  },

  fetch({ store }) {
    store.commit('races/RESET')
    return store.dispatch("races/loadMore")
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
