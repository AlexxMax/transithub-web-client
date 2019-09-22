<template>
<RaceForm
  v-if="creationType"
  :step.sync="activeStep"
  :creation-type="creationType || ''"
  :previous-step.sync="previousStep"
  :form.sync="form"
  v-loading="loading"
  @submit="handleSubmit"
  @close="handleClose"
/>

<div
  v-else
  class="PageRaceForm__loading"
>
  <img src="~/assets/images/functional/spinner.svg">
</div>
</template>

<script>
import * as notify from '@/utils/notifications'
import { RACE_FORM_STEPS } from '@/utils/driver'

import RaceForm from '@/components/DriverWorkspace/RaceForm/RaceForm'

export default {
  layout: 'driver',

  components: { RaceForm },

  data: () => ({
    loading: false
  }),

  computed: {

    creationType() {
      return this.$store.state.driver.races.form.creationType
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
    async handleSubmit() {
      this.loading = true

      try {

        const status = await this.$api.driverRace.createDriverRace({
          ...this.form,
          quantity: Math.round(this.form.quantity)
        })

        if (status) {

          notify.success(this.$t('messages.alertNewRaceCreated'))
          this.$router.push(this.$i18n.path(`driver`))
          this.$methods.driver.resetRaceForm()

        } else
          notify.error(this.$t('messages.alertNewRaceError'))

      } catch ({ message }) {
        notify.error(message)
      }

      this.loading = false
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

    if (process.browser) {
      const storage = JSON.parse(window.localStorage.getItem('transithub'))

      if (!storage || !storage.driver.races.form.creationType)
        this.$router.push(this.$i18n.path(`driver`))

    }

    if (!this.form.certSerialNumber) {
      this.form = {
        ...this.form,
        certSerialNumber: this.$store.state.driver.certSerialNumber,
      }
    }
  }
}
</script>

<style lang="scss">
.PageRaceForm {
    &__loading {
        width: 100%;

        margin-top: 10rem;

        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;

        img {
            height: 2rem;
            width: 2rem;

            animation: spin 0.75s linear infinite;
        }
    }
    
    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
}
</style>
