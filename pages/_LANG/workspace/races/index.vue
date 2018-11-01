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

import EventBus from "@/utils/eventBus"

import { getStatusFilters } from '@/utils/races'

export default {
  components: {
    PagePattern,
    FormList
  },

  methods: {
    async _fetch() {
      return await this.$store.dispatch("races/load")
    }
  },

  created() {
    this.$store.commit('races/UPDATE_FILTERS_DATA', { statuses: getStatusFilters(this.$t) })
  },

  mounted() {
    EventBus.$on("workspace-changed", async () => {
      await this._fetch()
    });
  },

  fetch({ store }) {
    store.commit('races/RESET')
    return store.dispatch("races/load")
  }
}
</script>
