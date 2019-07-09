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

// import EventBus from "@/utils/eventBus"
import { getStatusFilters } from '@/utils/requests'

export default {
  components: {
    PagePattern,
    FormList
  },

  methods: {
    async _fetch(userStatus) {
      await this.$store.dispatch("requests/loadMore", userStatus)
    },

    async busListener() {
      this.$store.commit('requests/RESET')
      await this._fetch()
    }
  },

  created() {
    this.$store.commit('requests/UPDATE_FILTERS_DATA', { statuses: getStatusFilters(this) })
  },

  fetch({ store }) {
    return store.dispatch("requests/loadMore")
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
