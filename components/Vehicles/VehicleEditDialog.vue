<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '50%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    @close="dialogVisible = false"
  >
    <div class="VehicleEditForm">
      <div class="VehicleEditForm__steps">
        <el-steps :space="200" :active="activeStep" simple>
          <el-step :title="$t('forms.common.essential')">
            <fa class="VehicleEditForm__steps__icon" slot="icon" icon="home"/>
          </el-step>
          <el-step :title="$t('forms.common.dimensions')">
            <fa class="VehicleEditForm__steps__icon" slot="icon" icon="swatchbook"/>
          </el-step>
        </el-steps>
      </div>

      <el-form
        ref="form"
        :model="vehicle"
        label-position="top"
        label-width="100px"
        size="mini"
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
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.common.techPassport')" prop="techPassport">
                    <el-input
                      v-model="vehicle.techPassport"
                      :placeholder="$t('forms.common.techPassportPlaceholder')"
                    />
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
                    />
                  </el-form-item>
                </el-col>

                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.common.model')" prop="model">
                    <el-input
                      v-model="vehicle.model"
                      :placeholder="$t('forms.common.modelPlaceholder')"
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
                  >
                    <el-input-number
                      style="width: 100%"
                      v-model="vehicle.gross"
                      :placeholder="$t('forms.common.grossPlaceholder')"
                      :step="100"
                      :min="1500"
                      @change="calculateNet"
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
                      :min="1000"
                      @change="calculateNet"
                    />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
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
                      :min="500"
                      @change="handleNetChange"
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
                      :min="1"
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

                <el-col :xs="24" :md="12">
                  <el-form-item :label="$t('forms.common.color')" prop="color">
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
                        :min="1"
                        :max="30"
                        :step="0.1"
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
                        :min="1"
                        :max="30"
                        :step="0.1"
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
                        :min="1"
                        :max="30"
                        :step="0.1"
                      />
                    </el-form-item>
                  </FromGroup>
                </el-col>

                <el-col :xs="24" :md="12">
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
                        :min="1"
                        :max="30"
                        :step="0.1"
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
                        :min="1"
                        :max="30"
                        :step="0.1"
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
                        :min="1"
                        :max="30"
                        :step="0.1"
                      />
                    </el-form-item>
                  </FromGroup>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="VehicleEditForm__input-checkbox-group">
                    <el-checkbox
                      v-model="vehicle.hasGps"
                      :label="$t('forms.common.hasGps')"
                      border
                      size="small"
                    />
                    <el-checkbox
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
        <Button type="text" @click="goToStep(-1)">{{ $t('forms.common.back') }}</Button>

        <Button round type="primary" :loading="loading" @click="goToStep(1)">{{ mainBtnLabel }}</Button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Button from "@/components/Common/Buttons/Button";
import Fade from "@/components/Common/Transitions/Fade";
import FromGroup from "@/components/Common/FormElements/FormGroup";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";
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
import { VALIDATION_TRIGGER } from "@/utils/constants";
import { COLORS } from "@/utils/colors";
import { showErrorMessage } from "@/utils/messages";
import { getErrorMessage } from "@/utils/errors";

const getBlankVehicle = store => {
  const creation =
    store.state.vehicles.editing.type === EDIT_DIALOG_TYPES.CREATE;
  const vehicleStoreItem = { ...store.state.vehicles.item };
  return vehicleStoreItem.guid && !creation
    ? vehicleStoreItem
    : {
        vNumber: null,
        techPassport: null,
        model: null,
        brand: null,
        type:
          store.state.vehiclesTypes.list.length > 0
            ? store.state.vehiclesTypes.list[0]
            : null,
        subtype:
          store.state.vehiclesSubtypes.list.length > 0
            ? store.state.vehiclesSubtypes.list[0]
            : null,
        gross: 1500,
        tara: 1000,
        net: 500,
        cargoCapacity: 1,
        color: COLORS.WHITE,
        year: new Date().getFullYear(),
        width: 1,
        height: 1,
        length: 2,
        cWidth: 1,
        cHeight: 1,
        cLength: 2,
        hasGps: false,
        suitableForSealing: false
      };
};

const STEPS = {
  essential: 1,
  dimensions: 2
};

export default {
  name: "th-vehicle-edit-dialog",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element)],

  components: {
    Button,
    Fade,
    FromGroup
  },

  data() {
    const validation = {
      vNumber: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.vNumber")));
        }
        cb();
      },
      techPassport: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.techPassport")));
        }
        cb();
      },
      brand: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.brand")));
        }
        cb();
      },
      model: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.model")));
        }
        cb();
      },
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
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.height")));
        }
        cb();
      },
      width: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.width")));
        }
        cb();
      },
      length: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.length")));
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
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.fullWeight")));
        }
        cb();
      },
      tara: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.taraWeight")));
        }
        cb();
      },
      net: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.maxWeightCapacity")));
        }
        cb();
      },
      cargoCapacity: (rule, value, cb) => {
        if (!value) {
          cb(new Error(this.$t("forms.common.validation.cargoCapacity")));
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
              trigger: VALIDATION_TRIGGER
            }
          ],
          techPassport: [
            {
              validator: validation.techPassport,
              trigger: VALIDATION_TRIGGER
            }
          ],
          brand: [
            {
              validator: validation.brand,
              trigger: VALIDATION_TRIGGER
            }
          ],
          model: [
            {
              validator: validation.model,
              trigger: VALIDATION_TRIGGER
            }
          ],
          type: [
            {
              validator: validation.type,
              trigger: VALIDATION_TRIGGER
            }
          ],
          subtype: [
            {
              validator: validation.subtype,
              trigger: VALIDATION_TRIGGER
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
              trigger: VALIDATION_TRIGGER
            }
          ],
          cargoCapacity: [
            {
              validator: validation.cargoCapacity,
              trigger: VALIDATION_TRIGGER
            }
          ]
        }
      },

      activeStep: STEPS.essential,
      STEPS,

      COLORS
    };
  },

  computed: {
    currentFormRules() {
      let rules = this.rules.stepEssential;
      if (this.activeStep === STEPS.dimensions) {
        rules = this.rules.stepDimensions;
      }
      return rules;
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
      return this.$store.state.vehiclesSubtypes.list;
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
      return this.$store.state.vehicles.loading;
    }
  },

  methods: {
    fetch() {
      // Vehicles Types
      const {
        fetched: vehiclesTypesFethed,
        loading: vehiclesTypesLoading
      } = this.$store.state.vehiclesTypes;
      if (!vehiclesTypesFethed && !vehiclesTypesLoading) {
        this.$store.dispatch(
          `${VEHICLES_TYPES_STORE_MODULE_NAME}/${
            VEHICLES_TYPES_ACTIONS_KEYS.FETCH_LIST
          }`
        );
      }

      // Vehicles Subtypes
      const {
        fetched: vehiclesSubtypesFetched,
        loading: vehiclesSubtypesLoading
      } = this.$store.state.vehiclesSubtypes;
      if (!vehiclesSubtypesFetched && !vehiclesSubtypesLoading) {
        this.$store.dispatch(
          `${VEHICLES_SUBTYPES_STORE_MODULE_NAME}/${
            VEHICLES_SUBTYPES_ACTIONS_KEYS.FETCH_LIST
          }`
        );
      }
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

    calculateNet() {
      this.vehicle.net = this.vehicle.gross - this.vehicle.tara;
    },

    handleNetChange() {
      this.vehicle.gross = this.vehicle.tara + this.vehicle.net;
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
        this.$refs["form"].clearValidate();
      }
      this.vehicle = getBlankVehicle(this.$store);
      this.activeStep = STEPS.essential;
    },

    async createVehicle() {
      const errorKey = await this.$store.dispatch(
        `${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_ACTIONS_KEYS.CREATE_ITEM}`,
        {
          companyGuid: this.$store.state.companies.currentCompany.guid,
          payload: this.vehicle
        }
      );

      if (errorKey) {
        showErrorMessage(getErrorMessage(this, errorKey));
      } else {
        this.dialogVisible = false;
      }
    },

    async changeVehicle() {
      const errorKey = await this.$store.dispatch(
        `${VEHICLES_STORE_MODULE_NAME}/${VEHICLES_ACTIONS_KEYS.CHANGE_ITEM}`,
        {
          companyGuid: this.$store.state.companies.currentCompany.guid,
          vehicleGuid: this.vehicle.guid,
          payload: this.vehicle
        }
      );

      if (errorKey) {
        showErrorMessage(getErrorMessage(this, errorKey));
      } else {
        this.dialogVisible = false;
      }
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
