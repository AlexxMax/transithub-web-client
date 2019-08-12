<template>
  <PagePattern>
    <PQQueuesList
      :list="list"
      :loading="loading"
      :count="count"
      :list-length="listLength"
      :store-module-name="STORE_MODULE_NAME"
      :store-mutation="MUTATIONS_KEYS.SET_OFFSET"
      offset-name="offset"
      @fetch="fetch"
    />
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import PQQueuesList from '@/components/PQQueues/PQQueuesList'

import { STORE_MODULE_NAME, ACTIONS_KEYS, MUTATIONS_KEYS } from '@/utils/pq.queues'

export default {
  components: {
    PagePattern,
    PQQueuesList
  },

  data: () => ({
    STORE_MODULE_NAME,
    MUTATIONS_KEYS
  }),

  computed: {
  	title () {
    	return this.$t('forms.queue.queues') + ' - Transithub'
    },

    list() {
      return this.$store.state[STORE_MODULE_NAME].list
    },

    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    },

    count() {
      return this.$store.state[STORE_MODULE_NAME].count
    },

    listLength() {
      return this.$store.state[STORE_MODULE_NAME].list.length
    }
  },

  methods: {
    async fetch() {
      await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
        this.$store.state.companies.currentCompany.guid
      );
    },

    async busListener() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_OFFSET}`, 0)
      await this.fetch()
    }
  },

  head() {
    return {
      title: this.title
    }
  },

  fetch({ store }) {
    return store.dispatch(
      `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
      store.state.companies.currentCompany.guid
    )
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
