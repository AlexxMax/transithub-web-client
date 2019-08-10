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

      <div class="PQParkingEditForm__steps">
        <el-steps :space="200" :active="activeStep" simple>
          <el-step :title="$t('forms.common.essential')"/>
          <el-step :title="$t('forms.common.address')"/>
          <el-step :title="$t('forms.common.mapRegistrationPoint')"/>
        </el-steps>
      </div>

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

                  <el-form-item :label="$t('forms.common.organisation')" prop="organisation">
                    <OrganisationSelect
                      ref="organisation-select"
                      :init-value="parking.organisationGuid"
                      @change="handleOrganisationSelect"
                      @mounted-change="handleOrganisationCreatedSelect"
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
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item :label="$t('forms.common.locality')" prop="localityKoatuu">
                    <LocalitySelect
                      :init-value="parking.localityKoatuu"
                      @change="handleLocalitySelect"
                      @mounted-change="handleLocalityCreatedSelect"
                    />

                    <div v-show="parking.localityKoatuu">
                      <FormField
                        :title="$t('forms.common.region')"
                        :value="localityData.region"
                      />

                      <FormField
                        :title="$t('forms.common.district')"
                        :value="localityData.district"
                      />

                      <FormField
                        :title="$t('forms.common.localityName')"
                        :value="localityData.name"
                      />
                    </div>

                    <el-form-item :label="$t('forms.common.address')" prop="address">
                      <el-input
                        v-model="parking.address"
                        :placeholder="$t('forms.common.address')"
                        clearable
                      />
                    </el-form-item>

                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </Fade>
        </div>

        <div v-show="activeStep === STEPS.regZone">
          <Fade>
            <div>
              <MapPointSelect
                :lat="parking.geoParkingLat"
                :lng="parking.geoParkingLng"
                @select="handleMapPointSelect"
              />
            </div>
          </Fade>
        </div>

      </el-form>

      <div class="PQParkingEditForm__footer">
        <Button
          v-show="activeStep !== STEPS.essential"
          type="text"
          @click="goToStep(-1)"
        >
          {{ $t('forms.common.back') }}
        </Button>

        <Button
          round
          type="primary"
          :loading="loading"
          @click="goToStep(1)"
          style="padding: 9px 35px;"
        >
          {{ mainBtnLabel }}
        </Button>
      </div>

    </div>

  </el-dialog>
</template>

<script>
import Fade from '@/components/Common/Transitions/Fade'
import OrganisationSelect from '@/components/Organisations/OrganisationSelect'
import LocalitySelect from '@/components/Common/LocalitySelect'
import FormField from '@/components/Common/FormElements/FormField'
import Button from '@/components/Common/Buttons/Button'
import MapPointSelect from '@/components/Common/MapPointSelect'

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
  position: 1,
  regZone: 2
}

const getBlankParking = store => {
  const creation =
    store.state[STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE
  const parkingStoreItem = { ...store.state[STORE_MODULE_NAME].item }
  return parkingStoreItem.guid && !creation
    ? parkingStoreItem
    : {
      organisationGuid: '',
      name: '',
      address: '',
      geoParkingLat: 0,
      geoParkingLng: 0,
      localityKoatuu: ''
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
    OrganisationSelect,
    LocalitySelect,
    FormField,
    MapPointSelect,
    Button
  },

  data() {
    const validation = {
      name: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.name")))
        }
        cb();
      }
    }

    return {
      parking: getBlankParking(this.$store),
      localityData: {
        region: '',
        district: '',
        name: ''
      },

      rules: {
        stepEssential: {
          name: [generateValidator(this, 'name')],
          organisationGuid: [generateValidator(this, 'organisation')]
        },
        stepPosition: {
          localityKoatuu: [generateValidator(this, 'localityKoatuu')],
          address: [generateValidator(this, 'address')]
        }
      },

      activeStep: STEPS.essential,
      STEPS
    }
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
      }
    },

    title() {
      return this.parking.guid
        ? this.$t("forms.pqParking.editVehicleDialog")
        : this.$t("forms.pqParking.createVehicleDialog")
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
      if (this.activeStep === STEPS.regZone) {
        if (this.parking.guid) {
          return this.$t("forms.common.save");
        } else {
          return this.$t("forms.common.create");
        }
      }
      return this.$t("forms.common.next");
    }
  },

  methods: {
    handleOrganisationSelect(value) {
      this.parking.organisationGuid = value
    },

    handleOrganisationCreatedSelect(value) {
      this.parking.organisationGuid = value
      this.$_closeDialogMixin_reset()
    },

    handleLocalitySelect(locality) {
      this.parking.localityKoatuu = locality.koatuu
      this.parking.address = locality.description
      this.localityData.region = locality.regionName
      this.localityData.district = locality.districtName
      this.localityData.name = locality.name
    },

    handleLocalityCreatedSelect(locality) {
      this.localityData.region = locality.regionName
      this.localityData.district = locality.districtName
      this.localityData.name = locality.name
    },

    handleMapPointSelect(position) {
      this.parking.geoParkingLat = position.lat
      this.parking.geoParkingLng = position.lng
    },

    async goToStep(step) {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          if (this.activeStep === STEPS.regZone && step === 1) {
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
    }
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
    *:not(:first-child) {
      margin-left: 40px;
      padding: 0 40px;
    }
  }
}
</style>
