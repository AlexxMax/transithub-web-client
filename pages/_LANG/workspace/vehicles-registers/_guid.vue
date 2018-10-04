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

  fetch({ store, route }) {
    return store.dispatch('vehiclesRegisters/loadElement', route.params.guid)
  }
}
</script>
