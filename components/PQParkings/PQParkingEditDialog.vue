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

    <div class="PQParkingEditDialog">

      <CommonSteps
        class="PQParkingEditDialog__steps"
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

        <div v-show="activeStep === STEPS.address">
          <Fade>
            <div>

              <CommonSelectKoatuu
                v-if="activeStep === STEPS.address"
                :lat.sync="parking.geoParkingLat"
                :lng.sync="parking.geoParkingLng"
                :address.sync="address"
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

                  <small :class="['PQParkingEditDialog__hint', {'PQParkingEditDialog__hint--error' : !isInUkrainian}]">{{ $t('forms.pqWarehouses.general.useOnlyUkranian') }}</small>
                </el-form-item>

                <el-form-item
                  class="w-1/4 ml-5"
                  prop="building"
                  :label="$t('forms.common.building')"
                >
                  <!-- 8, 78, 99А, 3/4, 3а/4, 3/4а, а5 -->
                  <el-input
                    :placeholder="$t('forms.common.building')"
                    :disabled="!parking.street"
                    clearable
                    v-model.trim="parking.building"
                  />
                </el-form-item>
              </div>

              <el-form-item
                class="PQParkingEditDialog__address"
                :label="$t('forms.pqWarehouses.general.labelFullAddress')"
              >
                <span v-if="address">{{ fullAddress }}</span>

                <span
                  v-else
                  class="PQParkingEditDialog__placeholder"
                >{{ $t('forms.pqWarehouses.general.placeholderFullAddress') }}</span>
              </el-form-item>

            </div>
          </Fade>
        </div>

        <div v-show="activeStep === STEPS.map">
          <Fade>
            <MapSearch
              :query="parking.fullAddress"
              :zoom="17"
              :marker="position"
              @on-search="handleSearch"
              @on-map-click="handleMapClick"
            />
          </Fade>
        </div>

      </el-form>

      <div class="PQParkingEditDialog__footer">
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
          v-show="activeStep !== STEPS.map"
          round
          type="primary"
          @click="goToStep(1)"
        >
          {{ $t('forms.common.next') }}
        </Button>

        <Button
          v-show="activeStep === STEPS.map"
          round
          type="primary"
          :loading="loading"
          @click="goToStep(2)"
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

import EventBus from '@/utils/eventBus'

import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/pq.parkings"

import {
  PARKINGS_STORE_MODULE_NAME,
  PARKINGS_MUTATIONS_KEYS,
  PARKINGS_ACTIONS_KEYS,
  PARKINGS_EDIT_DIALOG_TYPES
} from "@/utils/pq.queueProfiles"

import { generateValidator } from '@/utils/validation'

const STEPS = {
  essential: 0,
  address: 1,
  map: 2
}

const getBlankParking = store => {
  const creation = store.state[STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE
  const item = creation ? null : store.state[STORE_MODULE_NAME].item
  return {
      guid: item ? item.guid : '',
      name: item ? item.name : '',
      fullAddress: item ? item.fullAddress : '',
      geoParkingLat: item ? item.geoParkingLat : '',
      geoParkingLng: item ? item.geoParkingLng : '',
      localityKoatuu: item ? item.localityKoatuu : '',
      street: item ? item.streetName : '',
      building: item ? item.building : ''
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
      isBindListParkings: false,

      parking: getBlankParking(this.$store),

      rules: {
        stepEssential: {
          name: [generateValidator(this, 'name')],
        },
        stepAddress: {
          localityKoatuu: [generateValidator(this, 'settlement')],
          street: [{
            validator: (rule, value, cb) => {
              if (value.pIsUkranian()) {

                this.isInUkrainian = true
                cb()

              } else {

                this.isInUkrainian = false
                cb(' ')

              }
            },
            trigger: 'change'
          }]
        }
      },

      activeStep: STEPS.essential,
      steps: [
        { icon: 'home', text: this.$t('forms.common.essential') },
        { icon: 'map', text: this.$t('forms.common.address') },
        { icon: 'map-marker-alt', text: this.$t('forms.common.location') }
      ],
      STEPS,

      address: '',
      isInUkrainian: true
    }

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
      // const streetShort = this.$t('forms.pqWarehouses.general.labelStreetShort')
      let fullAddress = ''

      if (this.address) fullAddress = this.address
      if (this.parking.street) fullAddress += `, вул. ${this.parking.street}`
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
      } else if (this.activeStep === STEPS.address) {
        return this.rules.stepAddress
      }
      return {}
    },

    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    },

    mainBtnLabel() {
      if (this.activeStep === STEPS.map) {
        if (this.parking.guid) {
          return this.$t("forms.common.save");
        } else {
          return this.$t("forms.common.create");
        }
      }
      return this.$t("forms.common.next");
    },

    creation() {
      return this.$store.state[STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE
    }
  },

  methods: {
    handleOrganisationCreatedSelect(value) {
      this.$_closeDialogMixin_reset()
    },

    clearInputs(inputs = []) {
      ['street', 'building', 'geoParkingLat', 'geoParkingLng'].forEach(input => this.parking[input] = '')
    },

    async goToStep(step) {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          if (this.activeStep === STEPS.map && step === 2) {
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
      let errorKey

      if (this.creation && this.isBindListParkings) { 
        errorKey = await this.$store.dispatch(
        `${PARKINGS_STORE_MODULE_NAME}/${PARKINGS_ACTIONS_KEYS.CREATE_ITEM}`,
        this.generatePayload()
      )} 
      else if (this.creation && !this.isBindListParkings) {
        errorKey = await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CREATE_ITEM}`,
        this.generatePayload()
      )}
         
      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey))
      } else {
        this.isBindListParkings = false
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
    },

    handleSearch(results) {
      if (results) {
        const { lat, lng } = results[0].geometry.location
        this.handleMapClick({ lat: lat(), lng: lng() })
      }
    },

    handleMapClick({ lat, lng }) {
       this.parking.geoParkingLat = lat;
       this.parking.geoParkingLng = lng
    }
  },

  watch: {
    dialogVisible(value) {
      if (value) {
        this.reset()
      }
    },

    'parking.street'(value) {
      if (!value) this.parking.building = ''
    },

    fullAddress(value) {
      this.parking.fullAddress = value
    }
  },

  created() {
    EventBus.$on('createParkingClicked', (isBindListParkings) => {
       this.isBindListParkings = isBindListParkings
    })
  }
}
</script>

<style lang='scss' scoped>
.PQParkingEditDialog {

  &__hint {
    color: $--color-info;

    &--error {
      color: $--color-danger;
    }
  }

  &__address {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      span {
          font-weight: 600;
      }
  }

  &__placeholder {
      color: $--color-info;
  }

  &__footer {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
