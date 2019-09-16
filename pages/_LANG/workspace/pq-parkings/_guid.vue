<template>
  <Item v-loading="loading" show-back :item="item"/>
</template>

<script>
import Item from '@/components/PQParkings/PQParkingsCatalogItem'

import {
  STORE_MODULE_NAME,
  ACTIONS_KEYS,
  MUTATIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/pq.parkings"

export default {
  components: { Item },

  computed: {
    title () {
      return `${this.$t('forms.common.pqParking')}: ${this.item.name} - Transithub`
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
      await store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, { companyGuid, parkingGuid: guid })
  }
}
</script>
