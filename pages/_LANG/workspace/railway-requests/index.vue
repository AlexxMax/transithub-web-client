<template>
  <PagePattern>
    <FormList
      :list="$store.state.railwayRequests.list"
      @eventFetch="fetch"
    />
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
    async fetch(dropLimit = false) {
      if (dropLimit) {
        return await this.$store.dispatch('railwayRequests/loadList')
      }
      return await this.$store.dispatch('railwayRequests/loadMoreItems')
    }
  },

  fetch({ store }) {
    store.commit('railwayRequests/RESET')
    return store.dispatch('railwayRequests/setFilterAuthor', store.state.user.guid)
  }
}
</script>
