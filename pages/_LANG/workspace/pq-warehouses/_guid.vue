<template>
  <div class="PageWorkspacePQWarehousesGuid">
    <PQWarehousesGuid :item="item" />
  </div>
</template>

<script>
import { STORE_MODULE_NAME, MUTATIONS_KEYS, ACTIONS_KEYS } from '@/utils/pqWarehouses'

import PQWarehousesGuid from '@/components/PQWarehouses/PQWarehousesGuid'

export default {
  components: {
    PQWarehousesGuid
  },

  computed: {
    item: {
      get() { return this.$store.state[STORE_MODULE_NAME].item },
      set(value) { this.$stote.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_LIST}`, value) }
    }
  },

  async fetch({ store, params }) {
    await store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, params.guid)
  },

  created() {
    const guid = this.$route.params.guid
    const list = this.$store.state[STORE_MODULE_NAME].list
    const warehouse = list ? list.filter(item => item === guid) : null

    if (warehouse) this.warehouse = warehouse
    else this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, guid)
  },
}
</script>

<style lang="scss" scoped>
.PageWorkspacePQWarehousesGuid {
  // height: 100vh;
}
</style>
