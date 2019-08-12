<template>
<PagePattern class="PageWorkspacePQWarehouses">

  <PQWarehouses />

</PagePattern>
</template>

<script>
import { STORE_MODULE_NAME, ACTIONS_KEYS } from '@/utils/pq.warehouses'

import PagePattern from '@/components/Common/Pattern'
import PQWarehouses from '@/components/PQWarehouses/PQWarehouses'

export default {
  components: {
    PagePattern,
    PQWarehouses
  },

  head() {
    return {
      title: this.title
    }
  },

  computed: {
    title() {
      return `${this.$t('forms.common.pqWarehouses')} - Transithub`
    }
  },

  async fetch({ store }) {
    await store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`)
  }

}
</script>
