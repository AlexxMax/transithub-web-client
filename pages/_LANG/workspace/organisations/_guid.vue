<template>
  <FormPattern>
    <OrganisationDialog/>
  </FormPattern>
</template>

<script>
import FormPattern from "@/components/Common/Pattern";
import OrganisationDialog from "@/components/Organisations/OrganisationDialog";

// import { STORE_MODULE_NAME, ACTIONS_KEYS } from '@/utils/organisations'

export default {
  components: {
    FormPattern,
    OrganisationDialog
  }

  // fetch({ store, route }) {
  //   return store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, {
  //     companyGuid: store.state.companies.currentCompany.guid,
  //     vehicleGuid: route.params.guid
  //   })
  // },

  // beforeCreate() {
  //   if (!this.$store.state.organisations.item.guid) {
  //     this.$nuxt.error({ statusCode: 404, message: this.$t('messages.noOrganisation') })
  //   }
  // }
};
</script>