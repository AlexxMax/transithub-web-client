<template>
<div class="PageWorkspacePQWarehousesGuid">

  <PQWarehousesGuid
    v-loading="loading"
    :item="item"
  />

</div>
</template>

<script>
import { STORE_MODULE_NAME, MUTATIONS_KEYS, ACTIONS_KEYS } from '@/utils/pq.warehouses'

import PQWarehousesGuid from '@/components/PQWarehouses/PQWarehousesGuid'

export default {
  components: {
    PQWarehousesGuid
  },

  head() {
    return {
      title: this.title
    }
  },

  computed: {
    title() {
      return this.$t('forms.common.pqWarehouse') + ' - Transithub'
    },
    
    item() {
      return this.$store.state[STORE_MODULE_NAME].item
    },

    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    }
  },

  async fetch({ store, params }) {
    const guid = params.guid
    const list = store.state[STORE_MODULE_NAME].list
    const item = list ? list.filter(item => item.guid === guid)[0] : null

    if (item)
      await store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_ITEM}`, item)
    else
      await store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, guid)
  }
}
</script>

<style lang="scss" scoped>
.PageWorkspacePQWarehousesGuid {}
</style>
