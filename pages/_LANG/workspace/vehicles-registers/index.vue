<template>
  <PagePattern>
    <FormList
      :list="$store.state.vehiclesRegisters.list"
      :grouped-list="$store.getters['vehiclesRegisters/groupedList']"
      :grouped="$store.getters['userSettings/isVehiclesRegistersListGrouped']"
      @eventFetch="_fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from '@/components/VehiclesRegisters/FormList'

import { getStatusFilters } from '@/utils/vehiclesRegisters'

export default {
  components: {
    PagePattern,
    FormList
  },

  computed: {
    title () {
    	return this.$t('lists.vehiclesRegisters') + ' - Transithub'
  	}
  },

  methods: {
    async _fetch() {
      return await this.$store.dispatch("vehiclesRegisters/loadMore")
    },

    async busListener() {
      this.$store.commit('vehiclesRegisters/RESET')
      await this._fetch()
    }
  },

  head () {
    return {
      title: this.title
    }
  },

  created() {
    this.$store.commit('vehiclesRegisters/UPDATE_FILTERS_DATA', { statuses: getStatusFilters(this) })
  },

  fetch({ store }) {
    store.commit('vehiclesRegisters/RESET')
    return store.dispatch('vehiclesRegisters/loadMore')
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
