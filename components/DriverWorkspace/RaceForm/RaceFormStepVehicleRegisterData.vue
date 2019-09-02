<template>
  <div class="RaceFormStepVehicleRegisterData">
    <Scaffold
      :title="title"
      :subtitle="subtitle"
      :percentage="percentage"
      :buttons="buttons"
      @close="$emit('close')"
    >
      <div>
        Vehicle Register Data
      </div>
    </Scaffold>
  </div>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'

export default {
  name: 'th-driver-workspace-race-form-step-vehicle-register-data',

  components: { Scaffold },

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    percentage: Number,
    buttons: Array,
    form: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang='scss' scoped>
.RaceFormStepVehicleRegisterData {

}
</style>
