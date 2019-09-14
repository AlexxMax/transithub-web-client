<template>
  <el-dialog
    append-to-body
    :title="$t('forms.common.creatingRace')"
    :visible.sync="dialogVisible"
    :width="$_smallDeviceMixin_isDeviceSmall ? '100%' : '40%'"
    :fullscreen="$_smallDeviceMixin_isDeviceSmall"
    :before-close="handleBeforeClose"
    :z-index="4000"
  >
    <div class="WaybillCreateForm">

      <span class="WaybillCreateForm__subtitle" style="font-size: 16px;">
        {{ $t('forms.common.waybillData') }}
      </span>

      <el-form
        ref="form"
        :model="race"
        label-position="top"
        label-width="100px"
        size="mini"
        :validate-on-rule-change="false"
        :rules="rules"
        style="margin-top: 14px;"
      >
        <el-row :gutter="20" style="margin-bottom: 5px;">
          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('forms.race.waybillNumber')" prop="waybillNumber">
              <el-input
                v-model="race.waybillNumber"
                :placeholder="$t('forms.race.waybillNumber')"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12">
            <el-form-item :label="$t('forms.race.waybillDate')" prop="waybillDate">
              <el-date-picker
                v-model="race.waybillDate"
                type="date"
                :placeholder="$t('forms.common.passDatePlaceholder')"
                format="dd.MM.yyyy"
                :clearable="false"
                :picker-options="datePickerOptions"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <span class="WaybillCreateForm__subtitle">
          {{ $t('forms.common.waybillWeigthSender') }}
        </span>

        <el-row :gutter="40" style="margin-top: 5px;">
          <el-col :xs="24" :sm="8">
            <el-form-item :label="$t('forms.race.waybillGross')" prop="waybillGross">
              <el-input-number
                v-model="race.waybillGross"
                :disabled="isDisabled"
                :placeholder="$t('forms.race.waybillGross')"
                :min="race.noWaybillWeight ? 0 : 1000"
                :step="1"
                style="width: 100%;"
                @change="handleWaybillGrossChange"
                :required="race.noWaybillWeight? true : false"

              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="8">
            <el-form-item :label="$t('forms.race.waybillTara')" prop="waybillTar">
              <el-input-number
                v-model="race.waybillTar"
                :disabled="isDisabled"
                :placeholder="$t('forms.race.waybillTara')"
                :min="race.noWaybillWeight ? 0 : 1000"
                
                :step="1"
                style="width: 100%"
                @change="handleWaybillTarChange"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="8">
            <el-form-item :label="$t('forms.race.waybillNet')" prop="waybillNet">
              <!-- <span 
                class="WaybillCreateForm__number-net" 
                :class="{ 'WaybillCreateForm__number-net--red': negativeNr }"
              >
                {{ race.waybillNet }}
              </span> -->

              <el-input-number
                v-model="race.waybillNet"
                :placeholder="$t('forms.race.waybillNet')"
                :step="1"
                style="width: 100%"
                @change="handleWaybillNetChange"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item prop="noWaybillWeight">
            <el-checkbox
              v-model="race.noWaybillWeight"
              @change="handleNoWaybillWeightChange"
            >
              {{ $t('forms.race.noWaybillWeight') }}
            </el-checkbox>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item :label="$t('forms.race.approximateQuantityT')" prop="quantity">
            <div class="block">
              <el-slider
                v-model="race.quantity"
                :disabled="isDisabledQuantity"
                show-input
                @change="handleQuantityChange"
              >
              </el-slider>
            </div>
          </el-form-item>

        </el-row>
      </el-form>

      <div class="WaybillCreateForm__footer">
        <Button
          round
          type=""
          @click="discard"
        >
          {{ $t('forms.common.discard') }}
        </Button>

        <Button
          :loading="loadingChange"
          round
          type="primary"
          @click="submit"
        >
          {{ $t('forms.common.save') }}
        </Button>
      </div>

    </div>
  </el-dialog>
</template>

<script>
import Button from "@/components/Common/Buttons/Button"

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"
import { VALIDATION_TRIGGER } from '@/utils/constants'
import closeDialog from '@/mixins/closeDialog'
import * as notify from '@/utils/notifications'
import { getErrorMessage } from '@/utils/errors'

import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS
} from '@/utils/races'

const getBlankRace = (checkDate) => {
 return {
    quantity: 0,
    waybillNumber: '',
    waybillDate: checkDate,
    waybillNet: 0,
    waybillGross: 1000,
    waybillTar: 1000,
    noWaybillWeight: false
  }
}

export default {
  name: 'th-race-create-dialog',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element), closeDialog('race') ],

  components: { Button },

  props: {
    vehicleRegisterGuid: String,
    requestDate: String
  },

  data() {
    const checkDate = this.requestDate ? this.requestDate.pToDate() : new Date()
    const minDate = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() - 1)
    const maxDate = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() + 1)

    const validation = {
      waybillNetRule: (rule, value, cb) => {
        if (value < 0) {
          cb(new Error(this.$t("forms.common.validation.negativeNumber")));
          this.race.waybillNet = 0
        }

        else if (value === 0) {
          cb(new Error(this.$t("forms.common.validation.minValue")));
        }
        cb()
      },

      waybillTarRule: (rule, value, cb) => {
        if (value > this.race.waybillGross) {
          //cb(new Error(this.$t("forms.common.validation.negativeNumber")));
          this.race.waybillTar = this.race.waybillGross
        }
        cb()
      }
    };

    const generateValidationFunction = (key, validate) => (rule, value, cb) => {
      if (validate && !value) {
        cb(new Error(this.$t(`forms.common.validation.${key}`)));
      }
      cb();
    };

    const generateValidator = (key, validate = true) => ({
      validator: generateValidationFunction(key, validate),
      trigger: VALIDATION_TRIGGER
    });

    const data = {
      race: getBlankRace(checkDate),

      rules: {
        waybillNumber: [{
          ...generateValidator('enterWaybillNumber'),
          required: true
        }],

        waybillDate: [{
          ...generateValidator('enterWaybillDate'),
          required: true
        }],

        waybillNet: [{
          validator: validation.waybillNetRule,
          required: true
        }],

        waybillTar: [{
          validator: validation.waybillTarRule
        }],

        // quantity: [{
        //   // required: true,
        //   trigger: VALIDATION_TRIGGER,
        //   validator: (rule, value, cb) => {
        //     const required = this.$t('forms.common.validation.enterQuantity')

        //     if (!value && this.race.noWaybillWeight)
        //       cb(new Error(required))
        //     else
        //       cb()
        //   }
        // }]
      },
      
      datePickerOptions: {
        disabledDate (date) {
          return date < minDate || date > maxDate
        }
      },

      dialogVisible: false,
      loadingChange: false
    }

    return data
  },

  computed: {
    negativeNr() {
      return this.race.waybillNet < 0 ? true : false
    },

    isDisabled() {
      const value = this.race.noWaybillWeight
      return value ? true : false
    },

    isDisabledQuantity() {
      const value = this.race.noWaybillWeight
      return !value ? true: false
    }
  },

  methods: {
    handleQuantityChange() {
      if (this.race.noWaybillWeight) {
        this.race.waybillNet = this.race.quantity * 1000
      }
    },

    calculateWaybillNet() {
      this.race.waybillNet = this.race.waybillGross - this.race.waybillTar
    },

    handleWaybillGrossChange() {
      this.calculateWaybillNet()
    },

    handleWaybillTarChange() {
      this.calculateWaybillNet()
    },

    handleWaybillNetChange() {
      if(!this.isDisabled) this.race.waybillGross = this.race.waybillNet + this.race.waybillTar
      if(!this.isDisabledQuantity) this.race.quantity = this.race.waybillNet / 1000
    },

    handleNoWaybillWeightChange() {
      if (this.race.noWaybillWeight) {
        this.race.waybillNet = this.race.quantity
        this.race.waybillGross = 0
        this.race.waybillTar = 0
      } else {
        this.race.quantity = 0
        this.race.waybillGross = 1000
        this.race.waybillTar = 1000
        this.calculateWaybillNet()
      }
    },

    show() {
      this.dialogVisible = true
    },

    handleBeforeClose() {
      this.$_closeDialogMixin_handleBeforeDialogClose(() => {
        this.dialogVisible = false
      })
    },

    discard() {
      return this.handleBeforeClose()
    },

    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.createRace()
        } else {
          return false;
        }
      })
    },

    validate(done) {
      this.$refs.form.validate(valid => {
        if (valid) {
          done(true);
        } else {
          done(false);
        }
      })
    },

    generatePayload() {
      return {
        ...this.race,
        vehicleRegisterGuid: this.vehicleRegisterGuid,
        userGuid: this.$store.state.user.guid
      }
    },

    async createRace() {
      this.loadingChange = true

      const errorKey = await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.CREATE_ITEM}`,
        this.generatePayload()
      )

      if (errorKey) {
        notify.error(getErrorMessage(this, errorKey))
      } else {
        notify.success(this.$t("forms.common.raceCreated", this.$store.state.user.language))
      }

      this.loadingChange = false,
      this.dialogVisible = false
    }
  },

  watch: {
    dialogVisible(value) {
      if (!value) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.WaybillCreateForm {
  &__subtitle {
    font-weight: 500;
    color: #000;
    margin-bottom: 14px;
  }

  &__number-net {
    font-size: 20px;
    color: $--color-primary;
    font-weight: 500;

    &--red {
      color: $--color-danger;
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
