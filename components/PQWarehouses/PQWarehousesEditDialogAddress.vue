<template>
<div class="PQWarehousesEditDialogAddress">

  <el-form
    ref="PQWarehousesEditDialogAddress__form"
    :model="form"
    :rules="rules"
    size="mini"
    status-icon
  >

    <CommonSelectKoatuu
      @select="clearInputs"
      :lat.sync="form.lat"
      :lng.sync="form.lng"
      :settlement.sync="form.settlement"
      :address.sync="address"
    />

    <div class="w-full md:flex md:justify-between">
      <el-form-item
        class="md:w-3/4"
        prop="street"
        :label="$t('forms.pqWarehouses.general.labelStreet')"
      >
        <el-input
          :placeholder="$t('forms.pqWarehouses.general.labelStreet')"
          :disabled="!form.settlement"
          clearable
          v-model.lazy="form.street"
        />

        <small :class="['PQWarehousesEditDialogAddress__hint', {'PQWarehousesEditDialogAddress__hint--error' : !isInUkrainian}]">{{ $t('forms.pqWarehouses.general.useOnlyUkranian') }}</small>
      </el-form-item>

      <el-form-item
        class="md:ml-5 md:w-1/4"
        prop="building"
        :label="$t('forms.pqWarehouses.general.labelBuilding')"
      >
        <!-- 8, 78, 99А, 3/4, 3а/4, 3/4а, а5 -->
        <el-input
          placeholder="3/4"
          :disabled="!form.street"
          clearable
          v-model.trim="form.building"
        />
      </el-form-item>
    </div>


    <el-form-item
      class="PQWarehousesEditDialogAddress__address"
      :label="$t('forms.pqWarehouses.general.labelFullAddress')"
    >
      <span v-if="address">{{ fullAddress }}</span>

      <span
        v-else
        class="PQWarehousesEditDialogAddress__placeholder"
      >{{ $t('forms.pqWarehouses.general.placeholderFullAddress') }}</span>
    </el-form-item>
  </el-form>

  <div class="PQWarehousesEditDialogAddress__footer">

    <Button
      round
      v-for="(button, index) in buttons"
      :type="button.type"
      :key="index"
      @click="button.function"
    >{{ button.text }}</Button>

  </div>

</div>
</template>

<script>
import _ from 'lodash'

import Button from '@/components/Common/Buttons/Button'
import CommonSelectKoatuu from '@/components/Common/CommonSelectKoatuu'

import { generateValidator } from '@/utils/validation'

const KIND = Object.freeze({
  region: 2,
  district: 3,
  settlement: 4
})

export default {

  components: {
    Button,
    CommonSelectKoatuu
  },

  props: {
    form: {
      type: Object,
      required: true
    }
  },

  data() {
    return {

      KIND,

      address: '',
      isInUkrainian: true,

      buttons: [{
          text: this.$t(`forms.pqWarehouses.pattern.buttonPrev`),
          type: '',
          function: this.handleClickPrev
        },
        {
          text: this.$t(`forms.pqWarehouses.pattern.buttonNext`),
          type: 'primary',
          function: this.handleClickNext
        }
      ],

      rules: {
        settlement: [generateValidator(this, 'settlement')],
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
        }],
      }

    }
  },

  watch: {
    'form.street'(value) {
      if (!value) this.form.building = ''
    },

    fullAddress(value) {
      this.form.fullAddress = value

      this.form.isFullAddressModified = !_.isEqual(this.initialFullAddress, this.form.fullAddress)
    }
  },

  computed: {

    fullAddress() {
      // const streetShort = this.$t('forms.pqWarehouses.general.labelStreetShort')
      let fullAddress = ''

      if (this.address) fullAddress = this.address
      if (this.form.street) fullAddress += `, вул. ${this.form.street}`
      if (this.form.building) fullAddress += `, ${this.form.building}`

      return fullAddress
    },

    position() {
      if (this.form.lat !== '' && this.form.lng !== '')
        return { lat: this.form.lat, lng: this.form.lng }
      else
        return {}
    }
  },

  methods: {
    handleClickPrev() {
      this.$emit('prev')
    },

    handleClickNext() {
      this.$refs['PQWarehousesEditDialogAddress__form'].validate(valid => valid ? this.$emit('next') : null)
    },

    clearInputs(inputs = []) {
      ['street', 'building', 'lat', 'lng'].forEach(input => this.form[input] = '')
    }
  },

  created() {
    this.initialFullAddress = this.form.fullAddress
  }

}
</script>

<style lang="scss" scoped>
.PQWarehousesEditDialogAddress {

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

    &__label {
        margin-bottom: 0.5rem;
    }

    &__footer {
        margin-top: 1rem;

        display: flex;
        justify-content: center;
    }

}
</style>
