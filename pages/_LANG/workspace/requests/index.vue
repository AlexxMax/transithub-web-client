<template>
  <PagePattern>
    <FormList
      :list="$store.state.requests.list"
      :grouped-list="$store.getters['requests/groupedList']"
      :grouped="$store.getters['userSettings/isRequestsListGrouped']"
      @eventFetch="_fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from '@/components/Requests/FormList'

import EventBus from "@/utils/eventBus"
import { getStatusFilters } from '@/utils/requests'

export default {
  components: {
    PagePattern,
    FormList
  },

  methods: {
    async _fetch() {
      await this.$store.dispatch("requests/load")
    }
  },

  created() {
    this.$store.commit('requests/UPDATE_FILTERS_DATA', { statuses: getStatusFilters(this) })
  },

  mounted() {
    EventBus.$on("workspace-changed", async () => {
      await this.$store.dispatch("requests/load")
    });
  },

  fetch({ store }) {
    return store.dispatch("requests/load")
  }
}
</script>
