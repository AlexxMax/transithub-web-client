<template>
  <PagePattern>
    <FormList
      :list="$store.state.railwayAggregations.list"
      :list-by-author="$store.state.railwayAggregations.listByAuthor"
      @eventFetch="fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from "@/components/RailwayAggregations/FormList"

export default {
  components: {
    PagePattern,
    FormList
  },

  methods: {
    async fetch(loadByAuthor = false) {
      return await this.$store.dispatch(
        'railwayAggregations/loadMoreItems',
        loadByAuthor ? this.$store.state.user.guid : null
      )
    }
  },

  fetch({ store }) {
    store.commit('railwayAggregations/RESET')

    store.dispatch('railwayAggregations/loadMoreItems', store.state.user.guid)
    return store.dispatch('railwayAggregations/loadMoreItems')
  }
}
</script>
