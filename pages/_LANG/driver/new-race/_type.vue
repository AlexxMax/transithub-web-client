<template>
  <RaceForm
    :step.sync="activeStep"
    :previous-step.sync="previousStep"
    :form.sync="form"
    @submit="handleSubmit"
    @close="handleClose"
  />
</template>

<script>
import { RACE_FORM_STEPS } from '@/utils/driver'

import RaceForm from '@/components/DriverWorkspace/RaceForm/RaceForm'

export default {
  layout: 'driver',

  components: { RaceForm },

  computed: {

    modified: {
      get() {
        return this.$store.state.driver.races.form.modified
      },
      set(value) {
        this.$methods.driver.setRaceFormModified(value)
      },
    },

    activeStep: {
      get() {
        return this.$store.state.driver.races.form.activeStep
      },
      set(step) {
        this.$methods.driver.setRaceFormActiveStep(step)
      },
    },

    previousStep: {
      get() {
        return this.$store.state.driver.races.form.previousStep
      },
      set(step) {
        this.$methods.driver.setRaceFormPreviousStep(step)
      },
    },

    form: {
      get() {
        return this.$store.state.driver.races.form.data
      },
      set(value) {
        this.$methods.driver.updateRaceForm(value)
      },
    },
  },

  methods: {
    handleSubmit() {
    },

    handleClose() {
      const from = this.$store.state.route.from
      if (from) {
        this.$router.go(-1)
      } else {
        this.$router.push(this.$i18n.path(`driver`))
      }
    },
  },

  created() {
    if (!this.form.certSerialNumber) {
      this.form = {
        ...this.form,
        certSerialNumber: this.$store.state.driver.certSerialNumber,
      }
    }
  }
}
</script>
