<template>
  <PagePattern>
    <PQWarehousesList
      :list="list"
      :loading="loading"
      :count="count"
      :list-length="list.length"
      :store-module-name="STORE_MODULE_NAME"
      :store-mutation="MUTATIONS_KEYS.SET_OFFSET"
      offset-name="offset"
      @fetch="fetch"
    />
  </PagePattern>
</template>

<script>
import { STORE_MODULE_NAME, ACTIONS_KEYS, MUTATIONS_KEYS } from '@/utils/pq.warehouses'

import PagePattern from '@/components/Common/Pattern'
import PQWarehousesList from '@/components/PQWarehouses/PQWarehousesList'

export default {
  components: {
    PagePattern,
    PQWarehousesList
  },

  head() {
    return {
      title: this.title
    }
  },

  data: () => ({
    STORE_MODULE_NAME,
    MUTATIONS_KEYS
  }),

  computed: {
  	title () {
    	return this.$t('forms.common.pqWarehouses') + ' - Transithub'
    },

    list() {
      return this.$store.state[STORE_MODULE_NAME].list
    },

    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    },

    count() {
      return this.$store.state[STORE_MODULE_NAME].count
    }
  },

  async fetch({ store }) {
    await store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`)
  },

  methods: {
    async fetch() {
      await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`)
    }
  }

}
</script>
