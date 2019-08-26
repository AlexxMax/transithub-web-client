<template>
  <RaceForm
    :step="activeStep"
    :form.sync="form"
    @change-step="handleStep"
    @submit="handleSubmit"
    @close="handleClose"
  />
</template>

<script>
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
    handleStep(step) {
      this.activeStep = step
    },

    handleSubmit() {
      console.log('submit');
    },

    handleClose() {
      const from = this.$store.state.route.from.name
      if (from) {
        this.$router.go(-1)
      } else {
        this.$router.push(this.$i18n.path(`driver`))
      }
    }
  },
}
</script>
