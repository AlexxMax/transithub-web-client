<template>
  <div>

    <StepStart
      v-if="step === RACE_FORM_STEPS.START"
      :buttons="buttons.start"
    />

    <StepSelectVehicleRegister
      v-else-if="step === RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER"
      :buttons="buttons.selectVehicleRegister"
    />

  </div>
</template>

<script>
import StepStart from '@/components/DriverWorkspace/RaceForm/RaceFormStepStart'
import StepSelectVehicleRegister from '@/components/DriverWorkspace/RaceForm/RaceFormStepSelectVehicleRegister'

import { RACE_FORM_STEPS } from '@/utils/driver'

export default {
  name: 'th-driver-workspace-race-form',

  components: {
    StepStart,
    StepSelectVehicleRegister,
  },

  props: {
    step: String
  },

  data() {
    return {
      buttons: {
        start: [
          {
            type: '',
            title: 'SELECT_VEHICLE_REGISTER',
            handler: () => {
              this.$emit('change-step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
            }
          }
        ],
        selectVehicleRegister: [
          {
            type: '',
            title: 'BACK',
            handler: () => {
              this.$emit('change-step', RACE_FORM_STEPS.START)
            }
          },
          {
            type: 'primary',
            title: 'NEXT',
            handler: () => {
              this.$emit('change-step', RACE_FORM_STEPS.CHECK_VEHICLE_REGISTER)
            }
          }
        ]
      }
    }
  },

  created() {
    this.RACE_FORM_STEPS = RACE_FORM_STEPS
  }
}
</script>

<style lang='scss' scoped>

</style>
