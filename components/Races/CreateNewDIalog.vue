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

      <span class="WaybillCreateForm__subtitle">
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
        <el-row :gutter="20">
          <el-col :xs="12">
            <el-form-item :label="$t('forms.race.waybillNumber')" prop="waybillNumber">
              <el-input
                v-model="race.waybillNumber"
                :placeholder="$t('forms.race.waybillNumber')"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :xs="12">
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

        <el-row :gutter="20">
          <el-col :xs="24" :md="8">
            <el-form-item :label="$t('forms.race.waybillGross')" prop="waybillGross">
              <el-input-number
                v-model="race.waybillGross"
                :disabled="isDisabled"
                :placeholder="$t('forms.race.waybillGross')"
                :min="0"
                :step="1"
                style="width: 170px;"
                @change="handleWaybillGrossChange"
                v-bind:required="race.noWaybillWeight? true : false"
           
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item :label="$t('forms.race.waybillTar')" prop="waybillTar">
              <el-input-number
                v-model="race.waybillTar"
                :disabled="isDisabled"
                :placeholder="$t('forms.race.waybillTar')"
                :min="0"
                :step="1"
                style="width: 170px;"
                @change="handleWaybillTarChange"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item :label="$t('forms.race.waybillNet')" prop="waybillNet">
              <el-input-number
                v-model="race.waybillNet"
                :placeholder="$t('forms.race.waybillNet')"
                :min="0"
                :step="race.noWaybillWeight ? 1000 : 1"
                style="width: 170px;"
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

const blankRace = {
  quantity: 0,
  waybillNumber: '',
  waybillDate: new Date(),
  waybillNet: 0,
  waybillGross: 0,
  waybillTar: 0,
  noWaybillWeight: false
}

export default {
  name: 'th-race-create-dialog',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element), closeDialog('race') ],

  components: { Button },

  props: {
    vehicleRegisterGuid: String
  },

  data() {
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
      race: { ...blankRace },
      
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
          ...generateValidator('enterWaybillNet'),
          required: true
        }],

        waybillTar: [{
          required: true,
          trigger: VALIDATION_TRIGGER,
          validator: (rule, value, cb) => {
            const required = this.$t('forms.common.validation.enterWaybillTar')

            if (!value && !this.race.noWaybillWeight)
              cb(new Error(required))
            else
              cb()
          }
        }],

        waybillGross: [{
          required: true,
          trigger: VALIDATION_TRIGGER,
          validator: (rule, value, cb) => {
            const required = this.$t('forms.common.validation.enterWaybillGross')

            if (!value && !this.race.noWaybillWeight)
              cb(new Error(required))
            else
              cb()
          }
        }],

        quantity: [{
          required: true,
          trigger: VALIDATION_TRIGGER,
          validator: (rule, value, cb) => {
            const required = this.$t('forms.common.validation.enterQuantity')

            if (!value && this.race.noWaybillWeight)
              cb(new Error(required))
            else
              cb()
          }
        }]
      },

      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },

      dialogVisible: false,
      loadingChange: false
    }

    return data
  },

  computed: {
    isDisabled() {
      const value = this.race.noWaybillWeight
      return value ? true : false
    }
  },

  methods: {
    handleQuantityChange() {
      if (this.race.noWaybillWeight) {
        this.race.waybillNet = this.race.quantity * 1000
      }
    },

    handleWaybillNetChange() {
      if (this.race.noWaybillWeight) {
        this.race.quantity = Math.round(this.race.waybillNet / 1000)
      } else {
        this.race.waybillGross = this.race.waybillTar + this.race.waybillNet
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

    handleNoWaybillWeightChange() {
      if (this.race.noWaybillWeight) {
        this.race.waybillNet = this.race.quantity
        this.race.waybillGross = 0
        this.race.waybillTar = 0
      } else {
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

  &__footer {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>