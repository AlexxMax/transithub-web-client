<template>
  <PagePattern>
    <FormList
      :list-new="$store.state.requests.list"
      :list-in-work="$store.state.requests.listInWork"
      :list-archived="$store.state.requests.listArchived"
      :grouped-list="$store.getters['requests/groupedList']"
      :grouped="$store.getters['userSettings/isRequestsListGrouped']"
      @eventFetch="_fetch"
    />
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from '@/components/Requests/FormList'
import EventBus from '@/utils/eventBus'
import { getStatusFilters, USER_STATUSES } from '@/utils/requests'

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
      await Promise.all([
        this.$store.dispatch("requests/loadMore", USER_STATUSES.NEW),
        this.$store.dispatch("requests/loadMore", USER_STATUSES.IN_WORK),
        this.$store.dispatch("requests/loadMore", USER_STATUSES.ARCHIVED)
      ])
    }
  },

  created() {
    this.$store.commit('requests/UPDATE_FILTERS_DATA', { statuses: getStatusFilters(this) })
  },

  fetch({ store }) {
    store.commit('requests/RESET')

    return Promise.all([
      store.dispatch("requests/loadMore", USER_STATUSES.NEW),
      store.dispatch("requests/loadMore", USER_STATUSES.IN_WORK),
      store.dispatch("requests/loadMore", USER_STATUSES.ARCHIVED)
    ])
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
