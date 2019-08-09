<template>
<PagePattern class="PageWorkspacePQWarehouses">
  <PQWarehouses />
</PagePattern>
</template>

<script>
import { STORE_MODULE_NAME, ACTIONS_KEYS } from '@/utils/pqWarehouses'

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
      return 'Warehouses' + ' - Transithub'
      // return this.$t('forms.common.vehicles') + ' - Transithub'
    }
  },

  async fetch({ store }) {
    await store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`)
  },

  // mounted() {
    // this.$store.dispatch('pqWarehouses/fetchPQWarehouses')
    // this.$store.dispatch('pqWarehouses/createPQWarehouses')
  // }

  // fetch({ store }) {
  //   return Promise.all([
  //     store.dispatch(
  //       `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_TRUCKS_LIST}`,
  //       store.state.companies.currentCompany.guid
  //     ),
  //
  //     store.dispatch(
  //       `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_TRAILERS_LIST}`,
  //       store.state.companies.currentCompany.guid
  //     ),
  //
  //     store.dispatch(
  //       `${VEHICLES_TYPES_STORE_MODULE_NAME}/${
  //         VEHICLES_TYPES_ACTIONS_KEYS.FETCH_LIST
  //       }`
  //     )
  //   ])
  // },

}
</script>
