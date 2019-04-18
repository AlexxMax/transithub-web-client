<template>
  <FormPattern>
    <VehicleForm/>
  </FormPattern>
</template>

<script>
import FormPattern from '@/components/Common/Pattern'
import VehicleForm from '@/components/Vehicles/VehicleForm'

import { STORE_MODULE_NAME, ACTIONS_KEYS } from '@/utils/vehicles'

export default {
  components: {
    FormPattern,
    VehicleForm
  },

  fetch({ store, route }) {
    return store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, {
      companyGuid: store.state.companies.currentCompany.guid,
      vehicleGuid: route.params.guid
    })
  },

  beforeCreate() {
    if (!this.$store.state.vehicles.item.guid) {
      this.$nuxt.error({ statusCode: 404, message: this.$t('messages.noVehicle') })
    }
  }
}
</script>
