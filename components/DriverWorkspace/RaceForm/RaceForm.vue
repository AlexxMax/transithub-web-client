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
// import StepStart from '@/components/DriverWorkspace/RaceForm/RaceFormStepStart'
import StepSelectVehicleRegister from '@/components/DriverWorkspace/RaceForm/RaceFormStepSelectVehicleRegister'
import StepAcceptVehicleRegister from '@/components/DriverWorkspace/RaceForm/RaceFormStepAcceptVehicleRegister'
import StepVehicleRegisterData from '@/components/DriverWorkspace/RaceForm/RaceFormStepVehicleRegisterData'
import StepWaybill from '@/components/DriverWorkspace/RaceForm/RaceFormStepWaybill'

import RaceFormStepManualCreation from '@/components/DriverWorkspace/RaceForm/RaceFormStepManualCreation'

import * as notify from '@/utils/notifications'
import { RACE_FORM_STEPS, CREATION_TYPES, STORE_MODULE_NAME_RACE_FORM } from '@/utils/driver'
import { generateValidator, showNotifications } from '@/utils/validation'

export default {
  name: 'th-driver-workspace-race-form',

  components: {
    // StepStart,
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
    },
    creationType: {
      type: String,
      required: true
    }
  },

  computed: {
    stepComponent() {
      return this.components[this.step]
    }
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
      console.log(item);
      this.$emit('update:form', {
        ...this.form,
        // Main page
        vehiclesRegisterGuid: item.guid,
        requestNumber: item.requestNumber,

        pointFromKoatuu: item.pointFromKoatuu,
        pointFromName: item.pointFromName,
        pointFromRegion: item.pointFromRegion,

        pointToKoatuu: item.pointToKoatuu,
        pointToName: item.pointToName,
        pointToRegion: item.pointToRegion,

        senderName: item.clientName,
        carrierGuid: item.carrierGuid,
        carrierName: item.carrierName,
        goodsGuid: item.goodsGuid,
        goodsName: item.goodsName,

        // Secondary page
        driverFullName: item.driverFullName,
        // TODO: Паспорт, Посвідчення
        vehicleNumber: item.vehicleNumber,
        trailerNumber: item.trailerNumber,
      })

      this.$emit('update:previous-step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
      this.$emit('update:step', RACE_FORM_STEPS.ACCEPT_VEHICLE_REGISTER)
    }
  },

  created() {
    const lTitle = this.$t('forms.driverWorkspace.newRace.title')
    const lBack = this.$t('forms.common.back')
    const lNext = this.$t('forms.common.next')

    if (this.creationType == CREATION_TYPES.BY_VEHICLE_REGISTER)
      this.components = {
        [RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER]: {
          component: 'StepSelectVehicleRegister',
          title: lTitle,
          subtitle: this.$t('forms.driverWorkspace.newRace.selectVehicleRegisterStepSubtitle'),
          percentage: 25,
          buttons: [{
              type: 'primary',
              title: lNext,
              handler: () => {
                this.$emit('update:previous-step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
                this.$emit('update:step', RACE_FORM_STEPS.ACCEPT_VEHICLE_REGISTER)
              },
            },
          ],
        },
        [RACE_FORM_STEPS.ACCEPT_VEHICLE_REGISTER]: {
          component: 'StepAcceptVehicleRegister',
          title: lTitle,
          subtitle: this.$t('forms.driverWorkspace.newRace.acceptVehicleRegisterStepSubtitle'),
          percentage: 50,
          buttons: [{
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
                this.$emit('update:step', RACE_FORM_STEPS.DATA_REFINEMENT)
              }
            }
          ]
        },
        [RACE_FORM_STEPS.DATA_REFINEMENT]: {
          component: 'StepVehicleRegisterData',
          title: lTitle,
          subtitle: this.$t('forms.driverWorkspace.newRace.vehicleRegisterDataStepSubtitle'),
          percentage: 75,
          buttons: [{
              type: '',
              title: lBack,
              handler: () => {
                this.$emit('update:previous-step', RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER)
                this.$emit('update:step', RACE_FORM_STEPS.ACCEPT_VEHICLE_REGISTER)
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
          buttons: [{
              type: '',
              title: lBack,
              handler: () => {
                this.$emit('update:previous-step', RACE_FORM_STEPS.DATA_REFINEMENT)
                this.$emit('update:step', RACE_FORM_STEPS.DATA_REFINEMENT)
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
    else if (this.creationType == CREATION_TYPES.MANUAL)
      this.components = {
        [RACE_FORM_STEPS.MANUAL_CREATION]: {
          component: 'RaceFormStepManualCreation',
          title: 'Race creation',
          subtitle: 'Beginning 1 of 2',
          percentage: 50,
          rules: {
            vehicleNumber: [generateValidator(this, 'vNumber')],
            trailerNumber: [generateValidator(this, 'tNumber')],
            senderName: [generateValidator(this, 'senderName')]
          },
          preValidation: () => {
            if (!this.form.pointFromKoatuu || !this.form.pointToKoatuu) {
              notify.error(`Koatuu`)
              return false
            }
            else if (!this.form.warehouseFromCode || !this.form.warehouseToCode) {
              notify.error(`Warehouse`)
              return false
            }
            else if (!this.form.goodsGuid) {
              notify.error(`Goods`)
              return false
            }
            else if (!this.form.carrierGuid) {
              notify.error('Carrier')
              return false
            }

            return true
          },
          buttons: [{
            type: 'primary',
            title: lNext,
            handler: () => {
              this.validate(valid => {
                if (valid) {
                  this.$emit('update:previous-step', RACE_FORM_STEPS.MANUAL_CREATION)
                  this.$emit('update:step', RACE_FORM_STEPS.WAYBILL)
                }
              })
            }
          }],
        },
        [RACE_FORM_STEPS.WAYBILL]: {
          component: 'StepWaybill',
          title: lTitle,
          subtitle: 'Finish 2 of 2',
          percentage: 100,
          buttons: [{
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
        }
      }
  }
}
</script>

<style lang="scss" scoped>

</style>
