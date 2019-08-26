<template>
  <div>
    <component
      :is="stepComponent.component"
      :title="stepComponent.title"
      :subtitle="stepComponent.subtitle"
      :percentage="stepComponent.percentage"
      :buttons="stepComponent.buttons"
      :form="form"
      @change-form="(newForm) => { $emit('update:form', newForm) }"
      @close="$emit('close')"
    />
  </div>
</template>

<script>
import StepStart from '@/components/DriverWorkspace/RaceForm/RaceFormStepStart'
import StepSelectVehicleRegister from '@/components/DriverWorkspace/RaceForm/RaceFormStepSelectVehicleRegister'
import StepAcceptVehicleRegister from '@/components/DriverWorkspace/RaceForm/RaceFormStepAcceptVehicleRegister'
import StepWaybill from '@/components/DriverWorkspace/RaceForm/RaceFormStepWaybill'

import { RACE_FORM_STEPS } from '@/utils/driver'

export default {
  name: 'th-driver-workspace-race-form',

  components: {
    StepStart,
    StepSelectVehicleRegister,
    StepAcceptVehicleRegister,
    StepWaybill,
  },

  props: {
    step: {
      type: String,
      required: true,
    },
    form: {
      type: Object,
      required: true,
    }
  },

  computed: {
    stepComponent() {
      return this.components[this.step];
    },
  },

  created() {
    const lTitle = this.$t('forms.driverWorkspace.newRace.title')
    const lBack = this.$t('forms.common.back')
    const lNext = this.$t('forms.common.next')

    this.components = {
      [RACE_FORM_STEPS.START]: {
        component: 'StepStart',
        title: lTitle,
        subtitle: this.$t('forms.driverWorkspace.newRace.firstStepSubtitle'),
        percentage: 25,
        buttons: [
          {
            type: 'primary',
            title: lNext,
            handler: () => {
              this.$emit('change-step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
            }
          }
        ],
      },
      [RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER]: {
        component: 'StepSelectVehicleRegister',
        title: lTitle,
        subtitle: this.$t('forms.driverWorkspace.newRace.selectVehicleRegisterStepSubtitle'),
        percentage: 50,
        buttons: [
          {
            type: '',
            title: lBack,
            handler: () => {
              this.$emit('change-step', RACE_FORM_STEPS.START)
            }
          },
          {
            type: 'primary',
            title: lNext,
            handler: () => {
              this.$emit('change-step', RACE_FORM_STEPS.ACCEPT_VEHICLE_REGISTER)
            }
          }
        ]
      },
      [RACE_FORM_STEPS.ACCEPT_VEHICLE_REGISTER]: {
        component: 'StepAcceptVehicleRegister',
        title: lTitle,
        subtitle: this.$t('forms.driverWorkspace.newRace.acceptVehicleRegisterStepSubtitle'),
        percentage: 75,
        buttons: [
          {
            type: '',
            title: lBack,
            handler: () => {
              this.$emit('change-step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
            }
          },
          {
            type: 'primary',
            title: lNext,
            handler: () => {
              this.$emit('change-step', RACE_FORM_STEPS.WAYBILL)
            }
          }
        ]
      },
      [RACE_FORM_STEPS.WAYBILL]: {
        component: 'StepWaybill',
        title: lTitle,
        subtitle: this.$t('forms.driverWorkspace.newRace.finishStepSubtitle'),
        percentage: 100,
        buttons: [
          {
            type: '',
            title: lBack,
            handler: () => {
              this.$emit('change-step', RACE_FORM_STEPS.ACCEPT_VEHICLE_REGISTER)
            }
          },
          {
            type: 'primary',
            title: this.$t('forms.common.create'),
            handler: () => {
              this.$emit('submit')
            }
          }
        ]
      },
    }
  }
}
</script>
