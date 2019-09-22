<template>
<RaceForm
  v-if="creationType"
  :step.sync="activeStep"
  :creation-type="creationType || ''"
  :previous-step.sync="previousStep"
  :form.sync="formData"
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
import * as confirm from '@/utils/confirm'
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
        return this.$store.state.driver.races.form
      }
    },

    formData: {
      get() {
        return this.$store.state.driver.races.form.data
      },
      set(value) {
        this.$methods.driver.updateRaceForm(value)
      },
    },
  },

  methods: {
    async handleSubmit(handleStatus = 'ready') {
      this.loading = true

      try {

        const status = await this.$api.driverRace.createDriverRace({ ...this.formData, handleStatus })

        if (status) {

          const successMessage = handleStatus === 'dash' ? this.$t('messages.alertNewRaceSave') : this.$t('messages.alertNewRaceCreated')

          notify.success(successMessage)

          if (!handleStatus === 'dash') {
            this.$methods.driver.resetRaceForm()
          }

          this.$router.push(this.$i18n.path('driver'))

        } else
          notify.error(this.$t('messages.alertNewRaceError'))

      } catch ({ message }) {
        notify.error(message)
      }

      this.loading = false
    },

    async handleClose() {

      if (!this.form.modified) {
        this.$router.push(this.$i18n.path('driver'))
        return
      }

      await confirm.warning('You have unsaved changes, save and proceed?', null, {
          distinguishCancelAndClose: true,
          confirmButtonText: 'Save',
          cancelButtonText: 'Discard Changes'
        })
        .then(() => this.handleSubmit('dash'))
        .catch(action => {

          if (action === 'cancel') {
            this.$router.push(this.$i18n.path('driver'))
            setTimeout(() => this.$methods.driver.resetRaceForm(), 500)
          }

        })

    },
  },

  created() {

    // if (process.browser) {
    //   const storage = JSON.parse(window.localStorage.getItem('transithub'))
    //
    //   if (!storage || !storage.driver.races.form.creationType)
    //     this.$router.push(this.$i18n.path(`driver`))
    //
    // }

    if (!this.formData.certSerialNumber) {
      this.formData = {
        ...this.formData,
        certSerialNumber: this.$store.state.driver.certSerialNumber,
      }
    }

  },

  beforeDestroy() {
    this.handleSubmit('dash')
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
