<template>
<PagePattern>
  <PqWarehouses />
</PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import PqWarehouses from '@/components/PqWarehouses/PqWarehouses'


export default {
  components: {
    PagePattern,
    PqWarehouses
  },

  computed: {
    title() {
      return 'Warehouses' + ' - Transithub'
      // return this.$t('forms.common.vehicles') + ' - Transithub'
    }
  },

  head() {
    return {
      title: this.title
    }
  },

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
