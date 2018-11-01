<template>
  <CommonPattern>
    <ElementForm />
  </CommonPattern>
</template>

<script>
import CommonPattern from "@/components/Common/Pattern"
import ElementForm from '@/components/VehiclesRegisters/FormElement'

import EventBus from '@/utils/eventBus'

export default {
  components: {
    CommonPattern,
    ElementForm
  },

  fetch({ store, route }) {
    return store.dispatch('vehiclesRegisters/loadElement', route.params.guid)
  },

  mounted() {
    EventBus.$on("workspace-changed", () => {
      if (this.$route.params.guid) {
        this.$router.push("/workspace/vehicles-registers")
      }
    })
  }
}
</script>
