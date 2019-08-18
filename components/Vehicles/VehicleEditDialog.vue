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
    <div class="VehicleEditForm">
      <el-alert
        v-if="isEditing && vehiclesRegistersCount > 0"
        class="VehicleEditForm__alert"
        show-icon
        type="info"
        :title="$t('messages.beforeDriverDataChangeTitle')"
        :description="$t('messages.beforeDriverDataChange')"
      />

      <div class="VehicleEditForm__steps">
        <CommonSteps
          class="PQWarehousesEditDialog__steps"
          :active="activeStep"
          :steps="steps"
        />
      </div>

      <el-form
        ref="form"
        :model="vehicle"
        label-position="top"
        label-width="100px"
        size="mini"
        :validate-on-rule-change="false"
        :rules="currentFormRules"
      >
        <div v-if="activeStep === STEPS.essential">
          <Fade>
            <div>
              <el-row :gutter="20">
                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.common.vNumber')" prop="vNumber">
                    <el-input
                      v-model="vehicle.vNumber"
                      :placeholder="$t('forms.common.vNumberPlaceholder')"
                      :minlength="7"
                      :maxlength="8"
                      clearable
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="12">
                  <el-form-item
                    :label="$t('forms.common.techPassport')"
                    prop="techPassport"
                  >
                    <Tooltip
                      :content="$t('forms.common.techPassportTooltip')"
                      placement="bottom"
                    >
                      <el-input
                        v-model="vehicle.techPassport"
                        v-mask="techPassportMask"
                        :placeholder="$t('forms.common.techPassportPlaceholder')"
                        :maxlength="9"
                        clearable
                      />
                    </Tooltip>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.common.brand')" prop="brand">
                    <el-autocomplete
                      class="VehicleEditForm__autocomplete"
                      v-model="vehicle.brand"
                      :fetch-suggestions="handleBrandSearch"
                      :placeholder="$t('forms.common.brandPlaceholder')"
                      :trigger-on-focus="false"
                      clearable
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.common.model')" prop="model">
                    <el-input
                      v-model="vehicle.model"
                      :placeholder="$t('forms.common.modelPlaceholder')"
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.common.type')" prop="type">
                    <el-select
                      class="VehicleEditForm__autocomplete"
                      v-model="vehicle.type"
                      :placeholder="$t('forms.common.typePlaceholder')"
                      :loading="typesLoading"
                      filterable
                      default-first-option
                      @change="handleTypeSelect"
                    >
                      <el-option
                        v-for="option in typesSelectOptions"
                        :key="option.id"
                        :label="option.name"
                        :value="option.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.common.subtype')" prop="subtype">
                    <el-select
                      class="VehicleEditForm__autocomplete"
                      v-model="vehicle.subtype"
                      :placeholder="$t('forms.common.subtypePlaceholder')"
                      :loading="subtypesLoading"
                      :disabled="!canSelectSubtypes"
                      filterable
                      default-first-option
                    >
                      <el-option
                        v-for="option in subtypesSelectOptions"
                        :key="option.id"
                        :label="option.name"
                        :value="option.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </Fade>
        </div>

        <div v-else-if="activeStep === STEPS.dimensions">
          <Fade>
            <div>
              <el-row :gutter="20">
                <el-col :xs="24" :md="12">
                  <el-form-item
                    class="VehicleEditForm__input-number"
                    :label="$t('forms.common.gross')"
                    prop="gross"
                    :min="1500"
                  >
                    <el-input-number
                      style="width: 100%"
                      v-model="vehicle.gross"
                      :placeholder="$t('forms.common.grossPlaceholder')"
                      :step="100"
                      :min="0"
                      :max="80000"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="12">
                  <el-form-item
                    class="VehicleEditForm__input-number"
                    :label="$t('forms.common.tara')"
                    prop="tara"
                  >
                    <el-input-number
                      style="width: 100%"
                      v-model="vehicle.tara"
                      :placeholder="$t('forms.common.taraPlaceholder')"
                      :step="100"
                      :min="0"
                      :max="80000"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row v-if="!noUsefulSizes" :gutter="20">
                <el-col :xs="24" :md="12">
                  <el-form-item
                    class="VehicleEditForm__input-number"
                    :label="$t('forms.common.maxNet')"
                    prop="net"
                  >
                    <el-input-number
                      style="width: 100%"
                      v-model="vehicle.net"
                      :placeholder="$t('forms.common.netPlaceholder')"
                      :step="100"
                      :min="0"
                      :max="80000"
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="12">
                  <el-form-item
                    class="VehicleEditForm__input-number"
                    :label="$t('forms.common.cargoCapacity')"
                    prop="cargoCapacity"
                  >
                    <el-input-number
                      style="width: 100%"
                      v-model="vehicle.cargoCapacity"
                      :placeholder="$t('forms.common.cargoCapacityPlaceholder')"
                      :min="0"
                      :max="200"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :md="12">
                  <el-form-item
                    class="VehicleEditForm__input-number"
                    :label="$t('forms.common.year')"
                    prop="year"
                  >
                    <el-input-number
                      style="width: 100%"
                      v-model="vehicle.year"
                      :min="currentYear - 50"
                      :max="currentYear"
                      :placeholder="'2014'"
                    />
                  </el-form-item>
                </el-col>

                <el-col v-if="!isTrailer" :xs="24" :md="12">
                  <el-form-item :label="$t('forms.common.cabin')" prop="color">
                    <el-select
                      class="VehicleEditForm__autocomplete"
                      v-model="vehicle.color"
                      :placeholder="$t('forms.common.colorPlaceholder')"
                    >
                      <el-option
                        v-for="option in colorsSelectOptions"
                        :key="option.id"
                        :label="option.label"
                        :value="option.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :xs="24" :md="12">
                  <FromGroup :title="$t('forms.common.overallDimensionsM')">
                    <el-form-item
                      class="VehicleEditForm__input-number"
                      :label="$t('forms.common.length')"
                      prop="length"
                    >
                      <el-input-number
                        style="width: 100%"
                        v-model="vehicle.length"
                        :placeholder="$t('forms.common.lengthPlaceholder')"
                        :step="0.1"
                        :min="0"
                        :max="50"
                      />
                    </el-form-item>

                    <el-form-item
                      class="VehicleEditForm__input-number"
                      :label="$t('forms.common.width')"
                      prop="width"
                    >
                      <el-input-number
                        style="width: 100%"
                        v-model="vehicle.width"
                        :placeholder="$t('forms.common.widthPlaceholder')"
                        :step="0.1"
                        :min="0"
                        :max="5"
                      />
                    </el-form-item>

                    <el-form-item
                      class="VehicleEditForm__input-number"
                      :label="$t('forms.common.height')"
                      prop="height"
                    >
                      <el-input-number
                        style="width: 100%"
                        v-model="vehicle.height"
                        :placeholder="$t('forms.common.heightPlaceholder')"
                        :step="0.1"
                        :min="0"
                        :max="5"
                      />
                    </el-form-item>
                  </FromGroup>
                </el-col>

                <el-col v-if="!noUsefulSizes" :xs="24" :md="12">
                  <FromGroup :title="$t('forms.common.usefulDimensionsM')">
                    <el-form-item
                      class="VehicleEditForm__input-number"
                      :label="$t('forms.common.length')"
                      prop="cLength"
                    >
                      <el-input-number
                        style="width: 100%"
                        v-model="vehicle.cLength"
                        :placeholder="$t('forms.common.lengthPlaceholder')"
                        :step="0.1"
                        :min="0"
                        :max="50"
                      />
                    </el-form-item>

                    <el-form-item
                      class="VehicleEditForm__input-number"
                      :label="$t('forms.common.width')"
                      prop="cWidth"
                    >
                      <el-input-number
                        style="width: 100%"
                        v-model="vehicle.cWidth"
                        :placeholder="$t('forms.common.widthPlaceholder')"
                        :step="0.1"
                        :min="0"
                        :max="5"
                      />
                    </el-form-item>

                    <el-form-item
                      class="VehicleEditForm__input-number"
                      :label="$t('forms.common.height')"
                      prop="cHeight"
                    >
                      <el-input-number
                        style="width: 100%"
                        v-model="vehicle.cHeight"
                        :placeholder="$t('forms.common.heightPlaceholder')"
                        :step="0.1"
                        :min="0"
                        :max="5"
                      />
                    </el-form-item>
                  </FromGroup>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="VehicleEditForm__input-checkbox-group">
                    <el-checkbox
                      v-if="!isTrailer"
                      v-model="vehicle.hasGps"
                      :label="$t('forms.common.hasGps')"
                      border
                      size="small"
                    />
                    <el-checkbox
                      v-if="!noUsefulSizes"
                      v-model="vehicle.suitableForSealing"
                      :label="$t('forms.common.suitableForSealing')"
                      border
                      size="small"
                    />
                  </div>
                </el-col>
              </el-row>
            </div>
          </Fade>
        </div>
      </el-form>

      <div class="VehicleEditForm__footer">
        <Button
          v-if="activeStep === STEPS.dimensions"
          type="text"
          @click="goToStep(-1)"
        >{{ $t('forms.common.back') }}</Button>

        <Button
          round
          type="primary"
          :loading="loading"
          @click="goToStep(1)"
          style="padding: 9px 35px;"
        >{{ mainBtnLabel }}</Button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import Fade from '@/components/Common/Transitions/Fade'
import FromGroup from '@/components/Common/FormElements/FormGroup'
import Tooltip from '@/components/Common/Tooltip'
import CommonSteps from '@/components/Common/CommonSteps'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import closeDialog from '@/mixins/closeDialog'
import {
  STORE_MODULE_NAME as VEHICLES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as VEHICLES_MUTATIONS_KEYS,
  ACTIONS_KEYS as VEHICLES_ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/vehicles";
import {
  STORE_MODULE_NAME as VEHICLES_TYPES_STORE_MODULE_NAME,
  ACTIONS_KEYS as VEHICLES_TYPES_ACTIONS_KEYS
} from "@/utils/vehiclesTypes";
import {
  STORE_MODULE_NAME as VEHICLES_SUBTYPES_STORE_MODULE_NAME,
  ACTIONS_KEYS as VEHICLES_SUBTYPES_ACTIONS_KEYS
} from "@/utils/vehiclesSubtypes";
import {
  VALIDATION_TRIGGER,
  VEHICLE_NUMBER_MASK,
  TECH_PASSPORT_MASK
} from "@/utils/constants";
import { COLORS } from "@/utils/colors";
import * as notify from '@/utils/notifications'
import { getErrorMessage } from "@/utils/errors";

const getBlankVehicle = store => {
  const creation =
    store.state[VEHICLES_STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.CREATE;
  const vehicleStoreItem = { ...store.state.vehicles.item };
  return vehicleStoreItem.guid && !creation
    ? vehicleStoreItem
    : {
        vNumber: '',
        techPassport: '',
        model: '',
        brand: '',
        // type: store.state.vehiclesTypes.list.length > 0 ? store.state.vehiclesTypes.list[0] : null,
        // subtype: store.state.vehiclesSubtypes.list.length > 0 ? store.state.vehiclesSubtypes.list[0] : null,
        type: '',
        subtype: '',
        gross: 0,
        tara: 0,
        net: 0,
        cargoCapacity: 0,
        //color: COLORS.WHITE,
        color: '',
        year: new Date().getFullYear(),
        width: 0,
        height: 0,
        length: 0,
        cWidth: 0,
        cHeight: 0,
        cLength: 0,
        hasGps: false,
        suitableForSealing: false
      };
};

const STEPS = {
  essential: 0,
  dimensions: 1
};

export default {
  name: "th-vehicle-edit-dialog",

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element), closeDialog('vehicle') ],

  components: {
    Button,
    Fade,
    FromGroup,
    Tooltip,
    CommonSteps
  },

  data() {
    const validation = {
      vNumber: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.vNumber")));
        } else if (value && value.length < 7) {
          cb(
            new Error(this.$t("forms.common.validation.fieldLengthLessSeven"))
          );
        }
        cb();
      },
      techPassport: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.techPassport")));
        } else if (value && value.length < 9) {
          cb(new Error(this.$t("forms.common.validation.fieldLengthLessNine")));
        }
        cb();
      },
      brand: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.brand")));
        }
        cb();
      },
      // model: (rule, value, cb) => {
      //   if (!value) {
      //     cb(new Error(this.$t('forms.common.validation.model')))
      //   }
      //   cb()
      // },
      type: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.type")));
        }
        cb();
      },
      subtype: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.subtype")));
        }
        cb();
      },
      height: (rule, value, cb) => {
        // if (!value) {
        //   cb(new Error(this.$t('forms.common.validation.height')))
        // }
        if (value > 5) {
          cb(new Error(this.$t("forms.common.validation.maxHeight")));
        } else if (value < 0) {
          cb(new Error(this.$t("forms.common.validation.negativeNumber")));
        }
        cb();
      },
      width: (rule, value, cb) => {
        // if (!value) {
        //   cb(new Error(this.$t('forms.common.validation.width')))
        // }
        if (value > 5) {
          cb(new Error(this.$t("forms.common.validation.maxWidth")));
        } else if (value < 0) {
          cb(new Error(this.$t("forms.common.validation.negativeNumber")));
        }
        cb();
      },
      length: (rule, value, cb) => {
        // if (!value) {
        //   cb(new Error(this.$t('forms.common.validation.length')))
        // }
        if (value > 50) {
          cb(new Error(this.$t("forms.common.validation.maxLength")));
        } else if (value < 0) {
          cb(new Error(this.$t("forms.common.validation.negativeNumber")));
        }
        cb();
      },
      year: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.year")));
        }
        cb();
      },
      gross: (rule, value, cb) => {
        // if (!value) {
        //   cb(new Error(this.$t('forms.common.validation.fullWeight')))
        // }
        //
        if (value && value > 80000) {
          cb(new Error(this.$t("forms.common.validation.maxWeight")));
        } else if (value < 0) {
          cb(new Error(this.$t("forms.common.validation.negativeNumber")));
        }
        cb();
      },
      tara: (rule, value, cb) => {
        // if (!value) {
        //   cb(new Error(this.$t('forms.common.validation.taraWeight')))
        // }
        // if (value && value < 1000) {
        //   cb(new Error(this.$t('forms.common.validation.minTaraWeight')))
        // }
        if (value && value > 80000) {
          cb(new Error(this.$t("forms.common.validation.maxTaraWeight")));
        } else if (value < 0) {
          cb(new Error(this.$t("forms.common.validation.negativeNumber")));
        }
        cb();
      },
      net: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.weightCapacity")));
        }
        // else if (value < 500) {
        //   cb(new Error(this.$t('forms.common.validation.minWeightCapacity')))
        // }
        if (value > 80000) {
          cb(new Error(this.$t("forms.common.validation.maxWeightCapacity")));
        } else if (value < 0) {
          cb(new Error(this.$t("forms.common.validation.negativeNumber")));
        }
        cb();
      },
      cargoCapacity: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.cargoCapacity")));
        } else if (value > 200) {
          cb(new Error(this.$t("forms.common.validation.maxCargoCapacity")));
        } else if (value < 0) {
          cb(new Error(this.$t("forms.common.validation.negativeNumber")));
        }
        cb();
      },
      color: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.color")));
        }
        cb();
      }
    };
    return {
      vehicle: getBlankVehicle(this.$store),
      rules: {
        stepEssential: {
          vNumber: [
            {
              validator: validation.vNumber,
              trigger: VALIDATION_TRIGGER,
              required: true
            }
          ],
          techPassport: [
            {
              validator: validation.techPassport,
              trigger: VALIDATION_TRIGGER,
              required: true
            }
          ],
          brand: [
            {
              validator: validation.brand,
              trigger: VALIDATION_TRIGGER,
              required: true
            }
          ],
          model: [
            {
              //validator: validation.model,
              //trigger: VALIDATION_TRIGGER
            }
          ],
          type: [
            {
              validator: validation.type,
              trigger: VALIDATION_TRIGGER,
              required: true
            }
          ],
          subtype: [
            {
              validator: validation.subtype,
              trigger: VALIDATION_TRIGGER,
              required: true
            }
          ]
        },
        stepDimensions: {
          height: [
            {
              validator: validation.height,
              trigger: VALIDATION_TRIGGER
            }
          ],
          width: [
            {
              validator: validation.width,
              trigger: VALIDATION_TRIGGER
            }
          ],
          length: [
            {
              validator: validation.length,
              trigger: VALIDATION_TRIGGER
            }
          ],
          cHeight: [
            {
              validator: validation.height,
              trigger: VALIDATION_TRIGGER
            }
          ],
          cWidth: [
            {
              validator: validation.width,
              trigger: VALIDATION_TRIGGER
            }
          ],
          cLength: [
            {
              validator: validation.length,
              trigger: VALIDATION_TRIGGER
            }
          ],
          year: [
            {
              validator: validation.year,
              trigger: VALIDATION_TRIGGER
            }
          ],
          gross: [
            {
              validator: validation.gross,
              trigger: VALIDATION_TRIGGER
            }
          ],
          tara: [
            {
              validator: validation.tara,
              trigger: VALIDATION_TRIGGER
            }
          ],
          net: [
            {
              validator: validation.net,
              trigger: VALIDATION_TRIGGER,
              required: true
            }
          ],
          cargoCapacity: [
            {
              validator: validation.cargoCapacity,
              trigger: VALIDATION_TRIGGER,
              required: true
            }
          ],
          color: [
            {
              validator: validation.color,
              trigger: VALIDATION_TRIGGER,
              required: true
            }
          ]
        }
      },
      activeStep: STEPS.essential,
      steps: [
        { icon: 'home', text: this.$t('forms.common.essential') },
        { icon: 'swatchbook', text: this.$t('forms.common.dimensions') }
      ],
      STEPS,
      COLORS,

      vehicleNumberMask: VEHICLE_NUMBER_MASK,
      techPassportMask: TECH_PASSPORT_MASK,

      loadingChange: false
    };
  },
  computed: {
    currentFormRules() {
      let rules = this.rules.stepEssential;

      if (this.activeStep === STEPS.dimensions) {
        rules = this.rules.stepDimensions;
        if (this.isTrailer) {
          rules.color = null;
        }

        if (this.noUsefulSizes) {
          rules.cHeight = null
          rules.cWidth = null
          rules.cLength = null
          rules.net = null
          rules.cargoCapacity = null
        }
      }
      return rules;
    },
    vehiclesRegistersCount() {
      return this.$store.state[VEHICLES_STORE_MODULE_NAME].vehiclesRegisters.count
    },
    isEditing() {
      return this.$store.state[VEHICLES_STORE_MODULE_NAME].editing.type === EDIT_DIALOG_TYPES.EDIT
    },
    dialogVisible: {
      get() {
        return this.$store.state.vehicles.editing.showEditDialog;
      },
      set(value) {
        this.$store.commit(
          `${VEHICLES_STORE_MODULE_NAME}/${
            VEHICLES_MUTATIONS_KEYS.SHOW_EDIT_DIALOG
          }`,
          value
        );
      }
    },
    title() {
      return this.vehicle.guid
        ? this.$t("forms.vehicle.editVehicleDialog")
        : this.$t("forms.vehicle.createVehicleDialog");
    },
    typesLoading() {
      return this.$store.state.vehiclesTypes.loading;
    },
    typesSelectOptions() {
      return this.$store.state.vehiclesTypes.list;
    },
    subtypesLoading() {
      return this.$store.state.vehiclesSubtypes.loading;
    },
    subtypesSelectOptions() {
      const type = this.typesSelectOptions.find(
        item => item.id === this.vehicle.type
      );
      if (type) {
        return type.subtypes;
      }
      return null;
    },
    canSelectSubtypes() {
      return this.subtypesSelectOptions
        ? this.subtypesSelectOptions.length > 0
        : false;
    },
    currentYear() {
      return new Date().getFullYear();
    },
    colorsSelectOptions() {
      return Object.values(COLORS).map(item => ({
        id: item,
        label: this.$t(`forms.colors.${item}`)
      }));
    },
    mainBtnLabel() {
      if (this.activeStep === STEPS.dimensions) {
        if (this.vehicle.guid) {
          return this.$t("forms.common.save");
        } else {
          return this.$t("forms.common.create");
        }
      }
      return this.$t("forms.common.next");
    },
    loading() {
      return this.$store.state.vehicles.loading || this.loadingChange;
    },
    isTrailer() {
      if (this.vehicle.type) {
        const type = this.typesSelectOptions.find(
          type => type.id === this.vehicle.type
        );
        if (type) {
          return type.trailer;
        }
        return false;
      }
      return false
    },
    noUsefulSizes() {
      if (this.vehicle.type && this.vehicle.subtype) {
        const type = this.typesSelectOptions.find(type => type.id === this.vehicle.type)
        const subtype = this.subtypesSelectOptions.find(subtype => subtype.id === this.vehicle.subtype)
        if (type && subtype) {
          return type.noUsefulSizes && subtype.noUsefulSizes
        }
      }

      return false
    }
  },
  methods: {
    fetch() {
      // Vehicles Types
      const {
        fetched: vehiclesTypesFetched,
        loading: vehiclesTypesLoading
      } = this.$store.state.vehiclesTypes;
      if (!vehiclesTypesFetched && !vehiclesTypesLoading) {
        this.$store.dispatch(
          `${VEHICLES_TYPES_STORE_MODULE_NAME}/${
            VEHICLES_TYPES_ACTIONS_KEYS.FETCH_LIST
          }`
        );
      }
      // Vehicles Subtypes
      // const { fetched: vehiclesSubtypesFetched, loading: vehiclesSubtypesLoading } = this.$store.state.vehiclesSubtypes
      // if (!vehiclesSubtypesFetched && !vehiclesSubtypesLoading) {
      //   this.$store.dispatch(`${VEHICLES_SUBTYPES_STORE_MODULE_NAME}/${VEHICLES_SUBTYPES_ACTIONS_KEYS.FETCH_LIST}`)
      // }
    },
    async handleBrandSearch(search, cb) {
      if (!search) {
        return;
      }
      const { status, items } = await this.$api.vehicles.getBrands(search);
      if (status) {
        cb(items.map(item => ({ value: item.name })));
      }
    },
    async handleSubtypeSearch(search, cb) {
      if (!search) {
        return;
      }
    },
    handleTypeSelect() {
      this.vehicle.subtype = null;
    },
    goToStep(step) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (step === -1 && this.activeStep === STEPS.essential) {
            return;
          } else if (this.activeStep === STEPS.dimensions && step === 1) {
            if (this.vehicle.guid) {
              this.changeVehicle();
            } else {
              this.createVehicle();
            }
          } else {
            this.activeStep = this.activeStep + step;
          }
        } else {
          return false;
        }
      });
    },
    reset() {
      if (this.$refs["form"]) {
        this.$refs["form"].clearValidate()
      }
      this.vehicle = getBlankVehicle(this.$store);
      this.activeStep = STEPS.essential
      this.$_closeDialogMixin_reset()
    },
    generatePayload() {
      const payload ={ ...this.vehicle }
      if (this.isTrailer) {
        payload.color = null
        payload.hasGps = null
      }
      if (this.noUsefulSizes) {
        payload.cHeight = null
        payload.cWidth = null
        payload.cLength = null
        payload.net = null
        payload.cargoCapacity = null
        payload.suitableForSealing = null
      }
      return payload
    },
    async createVehicle() {
      const errorKey = await this.$store.dispatch(`${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_ACTIONS_KEYS.CREATE_ITEM}`, {
        companyGuid: this.$store.state.companies.currentCompany.guid,
        payload: this.generatePayload()
      })
      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey));
      } else {
        this.dialogVisible = false;
      }
    },
    async changeVehicle() {
      this.loadingChange = true

      const errorKey = await this.$store.dispatch(`${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_ACTIONS_KEYS.CHANGE_ITEM}`, {
        companyGuid: this.$store.state.companies.currentCompany.guid,
        vehicleGuid: this.vehicle.guid,
        payload: this.generatePayload()
      })
      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey));
      } else {
        if (this.vehiclesRegistersCount > 0) {
          const success = await this.$store.dispatch(
            `${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_ACTIONS_KEYS.UPDATE_VEHICLES_REGISTERS}`,
            {
              guid: this.vehicle.guid,
              name: this.vehicle.isTrailer ? 'trailer' : 'truck'
            }
          )

          if (success) {
            this.dialogVisible = false;
          }
        } else {
          this.dialogVisible = false;
        }
      }

      this.loadingChange = false
    },
    handleBeforeClose() {
      this.$_closeDialogMixin_handleBeforeDialogClose(() => {
        this.dialogVisible = false
      })
    }
  },
  watch: {
    async dialogVisible() {
      if (this.dialogVisible) {
        await this.fetch();
        this.reset();
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.VehicleEditForm {
  &__alert {
    margin-bottom: 20px;
  }

  &__steps {
    width: 400px;
    margin: 0 auto 40px;
    .el-steps {
      background-color: white;
    }
    &__icon {
      font-size: 22px;
    }
  }
  &__autocomplete {
    width: 100%;
  }
  &__input {
    &-number {
      width: 100%;
    }
    &-checkbox-group {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
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
@media only screen and (max-width: 991px) {
  .VehicleEditForm__input-checkbox-group {
    display: flex;
    flex-direction: column;
    .el-checkbox {
      margin-left: 0 !important;
      width: 100%;
      &:first-child {
        margin-top: -10px;
      }
      &:not(:first-child) {
        margin-top: 25px;
      }
    }
  }
}
</style>
