<template>
  <Item v-loading="loading" show-back :item="item"/>
</template>

<script>

import Item from '@/components/PQQueues/PQQueuesCatalogItem'

import { STORE_MODULE_NAME, ACTIONS_KEYS, EDIT_DIALOG_TYPES, MUTATIONS_KEYS } from '@/utils/pq.queues'

export default {
  components: { Item },

  computed: {
    title () {
      return `${this.$t('forms.queue.queue')}: ${this.item.name} - Transithub`
    },
    
    item() {
      return this.$store.state[STORE_MODULE_NAME].item
    },

    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    }
  },

  methods: {
    handleEdit() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: EDIT_DIALOG_TYPES.EDIT
      })
    }
  },

  head () {
    return {
      title: this.title
    }
  },

  async fetch({ store, params }) {
    const guid = params.guid
    const companyGuid = store.state.companies.currentCompany.guid
    const list = store.state[STORE_MODULE_NAME].list
    const item = list ? list.filter(item => item.guid === guid)[0] : null

    if (item)
      await store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_ITEM}`, item)
    else
      await store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, guid, companyGuid)
  }
}
</script>
