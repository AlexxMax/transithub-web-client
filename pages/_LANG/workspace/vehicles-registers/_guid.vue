<template>
  <CommonPattern>
    <ElementForm />
  </CommonPattern>
</template>

<script>
import CommonPattern from "@/components/Common/Pattern"
import ElementForm from '@/components/VehiclesRegisters/FormElement'

export default {
  components: {
    CommonPattern,
    ElementForm
  },

  methods: {
    busListener() {
      this.$router.push(this.$i18n.path('workspace/vehicles-registers'))
    }
  },

  fetch({ store, route }) {
    return store.dispatch('vehiclesRegisters/loadElement', route.params.guid)
  },

  beforeCreate() {
    if (!this.$store.state.vehiclesRegisters.item.guid) {
      this.$nuxt.error({ statusCode: 404, message: this.$t('messages.noVehicleRegister') })
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
