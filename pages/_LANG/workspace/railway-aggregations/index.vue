<template>
  <PagePattern>
    <FormList
      :list="$store.state.railwayAggregations.list"
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
    async fetch() {
      return await this.$store.dispatch('railwayAggregations/loadList')
    }
  },

  fetch({ store }) {
    store.commit('railwayAggregations/RESET')
    return store.dispatch('railwayAggregations/loadList')
  }
}
</script>
