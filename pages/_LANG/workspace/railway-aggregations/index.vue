<template>
  <PagePattern>
    <FormList
      :list="$store.state.railwayAggregations.list"
      :grouped-list="$store.getters['railwayAggregations/groupedList']"
      :grouped="$store.getters['userSettings/isRailwayAggregationsListGrouped']"
      @eventFetch="fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from "@/components/RailwayAggregations/FormList"

import EventBus from '@/utils/eventBus'

export default {
  components: {
    PagePattern,
    FormList
  },

  methods: {
    async fetch() {
      return await this.$store.dispatch('railwayAggregations/loadList')
    }
  },

  mounted() {
    EventBus.$on('workspace-changed', async () => {
      await this.fetch()
    })
  },

  fetch({ store }) {
    store.commit('railwayAggregations/RESET')
    return store.dispatch('railwayAggregations/loadList')
  }
}
</script>
