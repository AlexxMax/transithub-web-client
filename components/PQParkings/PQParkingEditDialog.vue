<template>
  <el-dialog
    append-to-body
    :title="title"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    :before-close="handleBeforeClose"
    :z-index="4000"
  >

    <div class="PQParkingEditForm">

      <CommonSteps
        class="PQWarehousesEditDialog__steps"
        :active="activeStep"
        :steps="steps"
      />

      <el-form
        ref="form"
        :model="parking"
        label-position="top"
        label-width="100px"
        size="mini"
        :validate-on-rule-change="false"
        :rules="currentRules"
      >

        <div v-show="activeStep === STEPS.essential">
          <Fade>
            <div>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item :label="$t('forms.common.name')" prop="name">
                    <el-input
                      v-model="parking.name"
                      :placeholder="$t('forms.common.name')"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </Fade>
        </div>

        <div v-show="activeStep === STEPS.position">
          <Fade>
            <div>

              <CommonSelectKoatuu
                v-if="activeStep === STEPS.position"
                :lat.sync="parking.geoParkingLat"
                :lng.sync="parking.geoParkingLng"
                :address.sync="parking.address"
                :settlement.sync="parking.localityKoatuu"
                settlementPropName="localityKoatuu"
                @select="clearInputs"
              />

               <div class="flex justify-between w-full">
                <el-form-item
                  class="w-3/4"
                  prop="street"
                  :label="$t('forms.common.street')"
                >
                  <el-input
                    :placeholder="$t('forms.common.street')"
                    :disabled="!parking.localityKoatuu"
                    clearable
                    v-model.lazy="parking.street"
                  />
                </el-form-item>

                <el-form-item
                  class="w-1/4 ml-5"
                  prop="building"
                  :label="$t('forms.common.building')"
                >
                  <el-input
                    :placeholder="$t('forms.common.building')"
                    :disabled="!parking.street"
                    clearable
                    v-model.number="parking.building"
                  />
                </el-form-item>
              </div>

              <el-form-item
                class="PQQueueProfilesEditPosition__address"
                :label="$t('forms.pqWarehouses.general.labelFullAddress')"
              >
                <span v-if="fullAddress">{{ fullAddress }}</span>

                <span
                  v-else
                  class="PQQueueProfilesEditPosition__placeholder"
                >{{ $t('forms.pqWarehouses.general.placeholderFullAddress') }}</span>
              </el-form-item>

              <MapSearch
                :query="fullAddress"
                :zoom="zoom"
                :marker="position"
                @on-map-click="({ lat, lng }) => { parking.geoParkingLat = lat; parking.geoParkingLng = lng }"
              />

            </div>
          </Fade>
        </div>

      </el-form>

      <div class="PQParkingEditForm__footer">
        <Button
          v-show="activeStep == STEPS.essential"
          round
          type=""
          @click="handleBeforeClose"
        >
          {{ $t('forms.common.cancel') }}
        </Button>

        <Button
          v-show="activeStep !== STEPS.essential"
          round
          type=""
          @click="goToStep(-1)"
        >
          {{ $t('forms.common.back') }}
        </Button>

        <Button
          round
          type="primary"
          :loading="loading"
          @click="goToStep(1)"
        >
          {{ mainBtnLabel }}
        </Button>
      </div>

    </div>

  </el-dialog>
</template>

<script>
import Fade from '@/components/Common/Transitions/Fade'
import Button from '@/components/Common/Buttons/Button'
import MapSearch from '@/components/Common/MapSearch'
import CommonSteps from '@/components/Common/CommonSteps'
import CommonSelectKoatuu from '@/components/Common/CommonSelectKoatuu'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import closeDialog from '@/mixins/closeDialog'
import { getErrorMessage } from "@/utils/errors";

import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/pq.parkings"

import { generateValidator } from '@/utils/validation'

const STEPS = {
  essential: 0,
  position: 1
}

const getBlankParking = store => {
  const creation = store.state[STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE
  const item = creation ? null : store.state[STORE_MODULE_NAME].item
  return {
      guid: item ? item.guid : '',
      name: item ? item.name : '',
      address: item ? item.fullAddress : '',
      fullAddress: item ? item.fullAddress : '',
      geoParkingLat: item ? item.geoParkingLat || 0 : 0,
      geoParkingLng: item ? item.geoParkingLng || 0 : 0,
      localityKoatuu: item ? item.localityKoatuu : '',
      street: item ? item.streetName : '',
      building: item ? item.building : '',
      district: item ? item.districtCode : '',
      region: item ? item.regionCode : '',
    }
}

export default {
  name: 'th-pq-parking-edit-dialog',

  mixins: [
    screen(SCREEN_TRIGGER_SIZES.element),
    closeDialog('parking')
  ],

  components: {
    Fade,
    MapSearch,
    Button,
    CommonSteps,
    CommonSelectKoatuu
  },

  data() {
    const data = {
      parking: getBlankParking(this.$store),

      rules: {
        stepEssential: {
          name: [generateValidator(this, 'name')],
        },
        stepPosition: {
          localityKoatuu: [generateValidator(this, 'settlement')],
        }
      },

      activeStep: STEPS.essential,
      steps: [
        { icon: 'home', text: this.$t('forms.common.essential') },
        { icon: 'map', text: this.$t('forms.common.location') },
      ],
      STEPS
    }

    data.zoom = data.parking.localityKoatuu ? 12 : 6

    return data
  },

  computed: {
    dialogVisible: {
      get() {
        return this.$store.state[STORE_MODULE_NAME].editing.showEditDialog
      },
      set(value) {
        this.$store.commit(
          `${STORE_MODULE_NAME}/${
            MUTATIONS_KEYS.SHOW_EDIT_DIALOG
          }`,
          value
        );
      },
    },

    position() {
      return {
        lat: Number(this.parking.geoParkingLat),
        lng: Number(this.parking.geoParkingLng)
      }
    },

    fullAddress() {
      const streetShort = this.$t('forms.pqWarehouses.general.labelStreetShort')
      let fullAddress = ''

      if (this.parking.address) fullAddress = this.parking.address
      if (this.parking.street) fullAddress += `, ${streetShort}. ${this.parking.street}`
      if (this.parking.building) fullAddress += `, ${this.parking.building}`
      return fullAddress
    },

    title() {
      return this.parking.guid
        ? this.$t("forms.pqParking.editParkingDialog")
        : this.$t("forms.pqParking.createParkingDialog")
    },

    currentRules() {
      if (this.activeStep === STEPS.essential) {
        return this.rules.stepEssential
      } else if (this.activeStep === STEPS.position) {
        return this.rules.stepPosition
      }
      return {}
    },

    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    },

    mainBtnLabel() {
      if (this.activeStep === STEPS.position) {
        if (this.parking.guid) {
          return this.$t("forms.common.save");
        } else {
          return this.$t("forms.common.create");
        }
      }
      return this.$t("forms.common.next");
    },
  },

  methods: {
    handleOrganisationCreatedSelect(value) {
      this.$_closeDialogMixin_reset()
    },

    changeZoom(zoom) {
      setTimeout(() => this.zoom = zoom, 1000)
    },

    clearInputs(inputs = []) {
      ['street', 'building', 'geoParkingLat', 'geoParkingLng'].forEach(input => this.parking[input] = '')
    },

    async goToStep(step) {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          if (this.activeStep === STEPS.position && step === 1) {
            if (this.parking.guid) {
              await this.changeParking()
            } else {
              await this.createParking()
            }
          } else {
            this.activeStep = this.activeStep + step;
            if (this.activeStep < 0) {
              this.activeStep = 0
            }
          }
        } else {
          return false;
        }
      });
    },

    handleBeforeClose() {
      this.$_closeDialogMixin_handleBeforeDialogClose(() => {
        this.dialogVisible = false
      })
    },

    reset() {
      if (this.$refs["form"]) {
        this.$refs["form"].clearValidate()
      }
      this.parking = getBlankParking(this.$store)
      this.activeStep = STEPS.essential

      const organisationSelect = this.$refs['organisation-select']
      if (organisationSelect && !this.parking.organisationGuid) {
        this.parking.organisationGuid = organisationSelect.getValue()
      }

      this.$_closeDialogMixin_reset()
    },

    generatePayload() {
      return {
        ...this.parking,
        companyGuid: this.$store.state.companies.currentCompany.guid
      }
    },

    async createParking() {
      const errorKey = await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CREATE_ITEM}`,
        this.generatePayload()
      )
      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey))
      } else {
        this.dialogVisible = false
      }
    },

    async changeParking() {
      const errorKey = await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CHANGE_ITEM}`,
        {
          payload: this.generatePayload(),
          guid: this.parking.guid
        }
      )
      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey))
      } else {
        this.dialogVisible = false
      }
    }
  },

  watch: {
    dialogVisible(value) {
      if (value) {
        this.reset()
      }
    },

    'form.street'(value) {
      if (!value) this.parking.building = ''
    },

    fullAddress(value) {
      this.parking.fullAddress = value
    },

    parking: {
      deep: true,
      immediate: true,
      handler(value) {
        const { region, district, localityKoatuu } = this.parking
        localityKoatuu ? this.changeZoom(12) : district ? this.changeZoom(10) : region ? this.changeZoom(8) : this.changeZoom(6)
      }
    },
  }
}
</script>

<style lang='scss' scoped>
.PQParkingEditForm {
  &__steps {
    margin: 0 auto 40px;
    .el-steps {
      background-color: white;
    }
  }

  &__footer {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
