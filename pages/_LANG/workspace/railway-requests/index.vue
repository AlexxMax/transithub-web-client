<template>
  <PagePattern>
    <FormList
      :list="$store.state.railwayRequests.list"
      :grouped-list="$store.getters['railwayRequests/groupedList']"
      :grouped="$store.getters['userSettings/isRailwayAggregationsListGrouped']"
      @eventFetch="fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from "@/components/RailwayRequests/FormList"

export default {
  components: {
    PagePattern,
    FormList
  },

  methods: {
    async fetch() {
      return await this.$store.dispatch('railwayRequests/loadList')
    }
  },

  fetch({ store }) {
    store.commit('railwayRequests/RESET')
    return store.dispatch('railwayRequests/setFilterAuthor', store.state.user.guid)
  }
}
</script>
