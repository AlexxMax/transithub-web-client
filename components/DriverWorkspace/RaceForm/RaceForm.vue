<template>
  <el-form
    ref="form"
    :model="form"
    :rules="stepComponent.rules"
    :validate-on-rule-change="false"
  >
    <component
      :is="stepComponent.component"
      :title="stepComponent.title"
      :subtitle="stepComponent.subtitle"
      :percentage="stepComponent.percentage"
      :buttons="stepComponent.buttons"
      :form="form"
      @change-form="(newForm) => { $emit('update:form', newForm) }"
      @select-vehicle-register="handleSelectVehicleRegister"
      @close="$emit('close')"
    />
  </el-form>
</template>

<script>
import StepStart from '@/components/DriverWorkspace/RaceForm/RaceFormStepStart'
import StepSelectVehicleRegister from '@/components/DriverWorkspace/RaceForm/RaceFormStepSelectVehicleRegister'
import StepAcceptVehicleRegister from '@/components/DriverWorkspace/RaceForm/RaceFormStepAcceptVehicleRegister'
import StepVehicleRegisterData from '@/components/DriverWorkspace/RaceForm/RaceFormStepVehicleRegisterData'
import StepWaybill from '@/components/DriverWorkspace/RaceForm/RaceFormStepWaybill'

import RaceFormStepManualCreation from '@/components/DriverWorkspace/RaceForm/RaceFormStepManualCreation'

import * as notify from '@/utils/notifications'
import { RACE_FORM_STEPS, CREATION_TYPES } from '@/utils/driver'
import { generateValidator, showNotifications } from '@/utils/validation'

export default {
  name: 'th-driver-workspace-race-form',

  components: {
    StepStart,
    StepSelectVehicleRegister,
    StepAcceptVehicleRegister,
    StepVehicleRegisterData,
    StepWaybill,

    RaceFormStepManualCreation
  },

  props: {
    step: {
      required: true,
    },
    previousStep: String,
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

  methods: {
    validate(cb) {
      const valid = this.stepComponent.preValidation()

      const form = this.$refs['form']
      if (form) {
        form.validate((validForm, fields) => {
          showNotifications(fields)
          cb(validForm && valid)
        })
      } else {
        cb(valid)
      }
    },

    handleSelectVehicleRegister(item) {
      this.$emit('update:form', {
        ...this.form,
        vehiclesRegisterGuid: item.guid,
        requestNumber: item.requestNumber,
        pointFromKoatuu: item.pointFromKoatuu,
        pointFromName: item.pointFromName,
        pointFromRegion: item.pointFromRegion,
        senderName: item.clientName,
        carrierGuid: item.carrierGuid,
        carrierName: item.carrierName,
        goodsGuid: item.goodsGuid,
        goodsName: item.goodsName,
      })

      this.$emit('update:previous-step', RACE_FORM_STEPS.ACCEPT_VEHICLE_REGISTER)
      this.$emit('update:step', RACE_FORM_STEPS.ACCEPT_VEHICLE_REGISTER)
    }
  },

  created() {
    const creationType = this.$route.params.type
    const lTitle = this.$t('forms.driverWorkspace.newRace.title')
    const lBack = this.$t('forms.common.back')
    const lNext = this.$t('forms.common.next')
    const lPass = this.$t('forms.common.pass')

    // console.log(this.$route.params);

    if (creationType === CREATION_TYPES.AUTOMATIC)
      this.components = {
        [RACE_FORM_STEPS.START]: {
          component: 'StepStart',
          title: lTitle,
          subtitle: this.$t('forms.driverWorkspace.newRace.firstStepSubtitle'),
          percentage: 25,
          rules: {
            certSerialNumber: [generateValidator(this, 'certSerialNumber')],
            vehicleNumber: [generateValidator(this, 'vNumber')],
          },
          preValidation: () => {
            let valid = true
            if (!this.form.pqWarehouseName) {
              notify.error(this.$t('forms.common.validation.pqWarehouse'))
              valid = false
            }
            return valid
          },
          buttons: [
            {
              type: 'primary',
              title: lNext,
              handler: () => {
                this.validate((valid) => {
                  if (valid) {
                    this.$emit('update:previous-step', RACE_FORM_STEPS.START)
                    this.$emit('update:step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
                  }
                })
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
                this.$emit('update:previous-step', RACE_FORM_STEPS.START)
                this.$emit('update:step', RACE_FORM_STEPS.START)
              },
            },
            {
              type: 'primary',
              title: lPass,
              handler: () => {
                this.$emit('update:previous-step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
                this.$emit('update:step', RACE_FORM_STEPS.DATA_REFINEMENT)
              },
            },
          ],
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
                this.$emit('update:previous-step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
                this.$emit('update:step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
              }
            },
            {
              type: 'primary',
              title: this.$t('forms.common.toConfirm'),
              handler: () => {
                this.$emit('update:previous-step', RACE_FORM_STEPS.ACCEPT_VEHICLE_REGISTER)
                this.$emit('update:step', RACE_FORM_STEPS.WAYBILL)
              }
            }
          ]
        },
        [RACE_FORM_STEPS.DATA_REFINEMENT]: {
          component: 'StepVehicleRegisterData',
          title: lTitle,
          subtitle: this.$t('forms.driverWorkspace.newRace.vehicleRegisterDataStepSubtitle'),
          percentage: 75,
          buttons: [
            {
              type: '',
              title: lBack,
              handler: () => {
                this.$emit('update:previous-step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
                this.$emit('update:step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
              },
            },
            {
              type: 'primary',
              title: lNext,
              handler: () => {
                this.$emit('update:previous-step', RACE_FORM_STEPS.DATA_REFINEMENT)
                this.$emit('update:step', RACE_FORM_STEPS.WAYBILL)
              },
            },
          ],
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
                this.$emit('update:step', this.previousStep)
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
    else if (creationType === CREATION_TYPES.MANUAL)
      this.components = {
        [RACE_FORM_STEPS.MANUAL_CREATION]: {
          component: 'RaceFormStepManualCreation',
          title: 'Race creation',
          subtitle: this.$t('forms.driverWorkspace.newRace.firstStepSubtitle'),
          percentage: 50,
          // rules: {
          //   certSerialNumber: [generateValidator(this, 'certSerialNumber')],
          //   vehicleNumber: [generateValidator(this, 'vNumber')],
          // },
          // preValidation: () => {
          //   let valid = true
          //   if (!this.form.pqWarehouseName) {
          //     notify.error(this.$t('forms.common.validation.pqWarehouse'))
          //     valid = false
          //   }
          //   return valid
          // },
          buttons: [
            {
              type: 'primary',
              title: lNext,
              handler: () => {
                this.validate((valid) => {
                  if (valid) {
                    this.$emit('update:previous-step', RACE_FORM_STEPS.MANUAL_CREATION)
                    this.$emit('update:step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
                  }
                })
              }
            }
          ],
        },
      }
  }
}
</script>
