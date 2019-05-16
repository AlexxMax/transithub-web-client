<template>
  <PagePattern>
    <!-- <OrganisationsList :list="$store.state.organisations.list" @fetch="fetch"/> -->
    <OrganisationsList/>
  </PagePattern>
</template>

<script>
import PagePattern from "@/components/Common/Pattern";
import OrganisationsList from "@/components/Organisations/OrganisationsList";

// import { STORE_MODULE_NAME, ACTIONS_KEYS } from "@/utils/organisations";

export default {
  components: {
    PagePattern,
    OrganisationsList
  },

//   methods: {
//     async fetch() {
//       await this.$store.dispatch(
//         `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,this.$store.state.organisations.currentOrganisation.guid
//       );
//     }
//   },

//   fetch({ store }) {
//     return store.dispatch(
//       `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
//       store.state.organisations.currentOrganisation.guid
//     );
//   }
};
</script>
