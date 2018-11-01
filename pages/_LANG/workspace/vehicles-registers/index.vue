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
import PagePattern from "@/components/Common/Pattern"
import FormList from "@/components/VehiclesRegisters/FormList"

import EventBus from "@/utils/eventBus"

import { getStatusFilters } from '@/utils/vehiclesRegisters'

export default {
  components: {
    PagePattern,
    FormList
  },

  methods: {
    async _fetch() {
      return await this.$store.dispatch("vehiclesRegisters/load")
    }
  },

  created() {
    this.$store.commit('vehiclesRegisters/UPDATE_FILTERS_DATA', { statuses: getStatusFilters(this.$t) })
  },

  mounted() {
    EventBus.$on("workspace-changed", async () => {
      await this._fetch()
    })
  },

  fetch({ store }) {
    store.commit('vehiclesRegisters/RESET')
    return store.dispatch('vehiclesRegisters/load')
  }
}
</script>
