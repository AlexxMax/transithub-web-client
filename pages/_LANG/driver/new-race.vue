<template>
  <RaceForm :step="activeStep" @change-step="setStep"/>
</template>

<script>
import { mapState } from 'vuex'

import RaceForm from '@/components/DriverWorkspace/RaceForm/RaceForm'

export default {
  layout: 'driver',

  components: { RaceForm },

  computed: {
    ...mapState({
      modified: (state) => state.driver.races.form.modified,
      activeStep: (state) => state.driver.races.form.activeStep,
      form: (state) => state.driver.races.form.data,
    })
  },

  methods: {
    setStep(step) {
      this.$methods.driver.setRaceFormActiveStep(step)
    }
  },
}
</script>
