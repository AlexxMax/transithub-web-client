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

  computed: {
    title () {
      const item = this.$store.state[STORE_MODULE_NAME].item
      return item.typeName + ': ' + item.vNumber + ', ' + item.brand + ' - Transithub'
  	}
  },

  methods: {
    busListener() {
      this.$router.push(this.$i18n.path('workspace/vehicles'))
    }
  },

  head () {
    return {
      title: this.title
    }
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
  },

  mounted() {
    // Bus
    this.$bus.companies.currentCompanyChanged.on(this.busListener)
  },

  beforeDestroy() {
    // Bus
    this.$bus.companies.currentCompanyChanged.off(this.busListener)
  }
}
</script>
