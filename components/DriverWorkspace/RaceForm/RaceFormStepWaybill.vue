<template>
<div class="RaceFormStepWaybill">
  <Scaffold
    :title="title"
    :subtitle="subtitle"
    :percentage="percentage"
    :buttons="buttons"
    @close="$emit('close')"
  >
    <div class="RaceFormStepWaybill__content">

      <Group :title="$t('forms.common.waybill')">
        <div class="RaceFormStepWaybill__content__input-group">
          <RaceFormInput
            class="RaceFormStepWaybill__content__form-item"
            prop="waybillNumber"
            :label="$t('forms.common.number')"
            :placeholder="$t('forms.common.vNumberPlaceholder')"
            :value="form.waybillNumber"
            @input="waybillNumber => handleInput('waybillNumber', waybillNumber)"
          />

          <RaceFormDatePicker
            class="RaceFormStepWaybill__content__form-item"
            prop="waybillDate"
            :picker-options="pickerOptions"
            :label="$t('forms.common.date')"
            :value="form.waybillDate"
            @input="waybillDate => handleInput('waybillDate', waybillDate)"
          />
        </div>
      </Group>

      <Group :title="$t('forms.common.waybillWeight')">
        <div class="RaceFormStepWaybill__content__input-group RaceFormStepWaybill__content__input-group--numbers">

          <RaceFormInput
            class="RaceFormStepWaybill__content__form-item RaceFormStepWaybill__content__form-item--number"
            prop="waybillGross"
            number
            :min="form.noWaybillWeight ? 0 : 1000"
            :disabled="form.noWaybillWeight"
            :label="$t('forms.race.waybillGross')"
            :value="form.waybillGross"
            @input="waybillGross => handleInput('waybillGross', waybillGross)"
          />

          <RaceFormInput
            class="RaceFormStepWaybill__content__form-item RaceFormStepWaybill__content__form-item--number"
            prop="waybillTara"
            number
            :min="form.noWaybillWeight ? 0 : 1000"
            :max="form.waybillGross"
            :disabled="form.noWaybillWeight"
            :label="$t('forms.race.waybillTara')"
            :value="form.waybillTara"
            @input="waybillTara => handleInput('waybillTara', waybillTara)"
          />

          <RaceFormInput
            class="RaceFormStepWaybill__content__form-item RaceFormStepWaybill__content__form-item--number"
            prop="waybillNet"
            number
            :input="form.noWaybillWeight"
            :label="$t('forms.race.waybillNet')"
            :value="form.waybillNet"
            @input="handleSelectWaybillNet"
          />

        </div>

        <el-checkbox
          class="RaceFormStepWaybill__content__form-item RaceFormStepWaybill__content__form-item--checkbox"
          :value="form.noWaybillWeight"
          @input="noWaybillWeight => handleInput('noWaybillWeight', noWaybillWeight)"
        >{{ $t('forms.race.noWaybillWeight') }}</el-checkbox>

        <div class="RaceFormStepWaybill__content__label">
          <span style="font-weight: 600;">Приблизна кількість</span>
          <span style="display: block; margin-left: .25rem">(в тоннах):</span>
          <span class="RaceFormStepWaybill__content__label-number">{{ Math.round(form.quantity) }}</span>
        </div>

        <el-slider
          :disabled="!form.noWaybillWeight"
          :max="50"
          :show-tooltip="false"
          :marks="{ 0: '0', 50: '50' }"
          :value="form.quantity"
          @input="handleSelectQuantity"
        >
        </el-slider>
      </Group>
    </div>
  </Scaffold>
</div>
</template>

<script>
import moment from 'moment'

import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormScaffold'
import Group from '@/components/DriverWorkspace/RaceForm/RaceFormGroup'
import RaceFormInput from '@/components/DriverWorkspace/RaceForm/RaceFormInput'
import RaceFormDatePicker from '@/components/DriverWorkspace/RaceForm/RaceFormDatePicker'

export default {
  name: 'th-driver-workspace-race-form-waybill',

  components: {
    Scaffold,
    Group,
    RaceFormInput,
    RaceFormDatePicker
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    percentage: Number,
    buttons: Array,
    form: {
      type: Object,
      required: true,
    }
  },

  data() {
    return {
      from: moment(new Date(), 'DD.MM.YYYY').subtract(11, 'd').format('YYYY-MM-DD'),
      to: moment(new Date(), 'DD.MM.YYYY').add(1, 'd').format('YYYY-MM-DD')
    }
  },

  computed: {
    pickerOptions() {

      return {
        disabledDate: time => !moment(time).isBetween(this.from, this.to)
      }

    }
  },

  watch: {
    'form.waybillGross'(gross) {
      this.handleInput('waybillNet', gross - this.form.waybillTara)
    },
    'form.waybillTara': {
      immediate: true,
      handler(tara) {
        this.handleInput('waybillNet', this.form.waybillGross - tara)
      }
    },
    'form.noWaybillWeight'(value) {
      if (value) {
        this.$emit('change-form', { ...this.form, waybillGross: 0, waybillTara: 0 })
      } else {
        this.$emit('change-form', { ...this.form, waybillGross: 1000, waybillTara: 1000, quantity: 0 })
      }
    }
  },

  methods: {
    handleInput(key, value) {
      this.$emit('change-form', { ...this.form, [key]: value })
    },

    handleSelectWaybillNet(waybillNet) {
      this.$emit('change-form', {
        ...this.form,
        quantity: waybillNet / 1000,
        waybillNet
      })
    },

    handleSelectQuantity(quantity) {
      this.handleInput('waybillNet', quantity * 1000)
    },

  }
}
</script>

<style lang='scss'>
.RaceFormStepWaybill {
    .el-form-item {
        margin-bottom: 0;
    }
    .el-slider__button-wrapper {
        z-index: 2;
    }
}
</style>

<style lang='scss' scoped>
.RaceFormStepWaybill {
    &__content {

        &__input-group {
            display: flex;
            flex-direction: row;

            &--numbers {
                @include for-extra-small {
                    flex-wrap: wrap;
                }
            }
        }

        &__label {
            margin: 4rem 0 0.5rem;

            line-height: 1rem;

            display: flex;
        }

        &__label-number {
            margin-left: 1rem;

            display: block;

            font-size: 1rem;
            line-height: 1rem;
            font-weight: 600;
            color: $--color-primary;
        }

        &__slider-label {
            z-index: 2;
        }

        &__expander {
            width: 80px;
        }

        &__form-item {
            flex-grow: 1;

            &--number {
                @include for-extra-small {
                    margin-bottom: 1rem;
                }
            }

            &--checkbox {
                margin-top: 1rem;
            }
        }
    }
}
</style>
