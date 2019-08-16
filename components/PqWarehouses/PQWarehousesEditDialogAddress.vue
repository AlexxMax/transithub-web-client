<template>
<div class="PQWarehousesPatternAddress">

  <el-form
    ref="PQWarehousesPatternAddress__form"
    :model="form"
    :rules="rules"
    size="mini"
    status-icon
  >
    <el-form-item
      prop="region"
      label="Область"
    >
      <LocalitySelect
        :kind="KIND.region"
        @change="handleSelectRegion"
      />
    </el-form-item>

    <el-form-item
      prop="district"
      label="Район"
    >
      <LocalitySelect
        :kind="KIND.district"
        :region="form.region"
        @change="handleSelectDistrict"
      />
    </el-form-item>

    <el-form-item
      prop="settlement"
      label="Населенный пункт"
    >
      <LocalitySelect
        :kind="KIND.settlement"
        :region="form.region"
        :district="form.district"
        @change="handleSelectSettlement"
      />
    </el-form-item>

    <el-form-item
      prop="address"
      label="Улица"
    >
      <el-input
        placeholder="Улица"
        :disabled="!form.settlement"
        clearable
        v-model.lazy="form.street"
      />
    </el-form-item>

    <el-form-item
      prop="address"
      label="Номер здания"
    >
      <el-input
        placeholder="Номер здания"
        :disabled="!form.street"
        clearable
        v-model.number="form.building"
      />
    </el-form-item>

    <el-form-item
      class="PQWarehousesPatternAddress__address"
      label="Полный адрес"
    >
      <span v-if="fullAddress">{{ fullAddress }}</span>

      <span
        v-else
        class="PQWarehousesPatternAddress__placeholder"
      >{{ $t('forms.pqWarehouses.general.placeholderFullAddress') }}</span>
    </el-form-item>
  </el-form>

  <MapSearch
    :query="fullAddress"
    :zoom="zoom"
  />

  <div class="PQWarehousesPatternAddress__footer">

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

import { VALIDATION_TRIGGER } from '@/utils/constants'

import Button from '@/components/Common/Buttons/Button'
import LocalitySelect from '@/components/Common/LocalitySelect'
import MapSearch from '@/components/Common/MapSearch'

const KIND = Object.freeze({
  region: 2,
  district: 3,
  settlement: 4
})

export default {

  components: {
    Button,
    LocalitySelect,
    MapSearch
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
      zoom: 6,

      buttons: [{
          text: this.$t('forms.pqWarehouses.pattern.buttonPrev'),
          type: '',
          function: this.handleClickPrev
        },
        {
          text: this.$t('forms.pqWarehouses.pattern.buttonNext'),
          type: 'primary',
          function: this.handleClickNext
        }
      ],

      meta: [],

      rules: {
        region: [{
          required: true,
          trigger: 'change',
          validator: (rule, value, cb) => {
            const required = this.$t('forms.pqWarehouses.pattern.steps.location.validationRequiredSettlement')

            if (!value)
              cb(new Error(required))
            else
              cb()
          }
        }],
        district: [{
          required: true,
          trigger: 'change',
          validator: (rule, value, cb) => {
            const required = this.$t('forms.pqWarehouses.pattern.steps.location.validationRequiredSettlement')

            if (!value)
              cb(new Error(required))
            else
              cb()
          }
        }],
        settlement: [{
          required: true,
          trigger: 'change',
          validator: (rule, value, cb) => {
            const required = this.$t('forms.pqWarehouses.pattern.steps.location.validationRequiredSettlement')

            if (!value)
              cb(new Error(required))
            else
              cb()
          }
        }],
      }

    }
  },

  watch: {
    'form.street'(value) {
      if (!value) this.form.building = ''
    }
  },

  computed: {
    fullAddress() {
      let fullAddress = ''

      if (this.form.address) fullAddress = this.form.address
      if (this.form.street) fullAddress += `, вул. ${this.form.street}`
      if (this.form.building) fullAddress += `, ${this.form.building}`

      return fullAddress
    }
  },

  methods: {
    handleClickPrev() {
      this.$emit('prev')
    },
    handleClickNext() {
      this.$refs['PQWarehousesPatternAddress__form'].validate(valid => {

        if (valid) this.$emit('next')

      })
    },

    handleSelectRegion(region) {
      this.zoom = 8
      this.form.region = region.regionCode
      this.form.address = region.description

      this.clearInputs(['district'])
    },
    handleSelectDistrict(district) {
      this.zoom = 10
      this.form.district = district.districtCode
      this.form.address = district.description

      this.clearInputs(['settlement'])
    },
    handleSelectSettlement(settlement) {
      this.zoom = 12
      this.form.settlement = settlement.koatuu
      this.form.address = settlement.description

      this.clearInputs()

      this.form.lat = settlement.lat
      this.form.lng = settlement.lng
    },
    handleMapPointSelect({ lat, lng }) {
      this.form.lat = lat
      this.form.lng = lng
    },

    clearInputs(inputs = []) {
      [...inputs, 'street', 'building', 'lat', 'lng'].forEach(input => this.form[input] = '')
    }

    // handleSelectLocation(locality) {
    //   const locale = this.$store.state.locale
    //   const getName = name => locality[`${name}${_.capitalize(locale)}`] || locality[name] || '?'
    //
    //   this.meta = [{
    //     title: this.$t('forms.pqWarehouses.general.labelRegion'),
    //     text: getName('regionName')
    //   }, {
    //     title: this.$t('forms.pqWarehouses.general.labelDistrict'),
    //     text: getName('districtName')
    //   }, {
    //     title: this.$t('forms.pqWarehouses.general.labelSettlement'),
    //     text: getName('name')
    //   }]
    //
    //   this.form.location = locality.koatuu
    //   this.form.address = locality.description
    //
    //   this.form.lat = locality.lat
    //   this.form.lng = locality.lng
    // },

    // handleLocalityCreatedSelect(locality) {
    //   this.meta = [{
    //     title: this.$t('forms.pqWarehouses.general.labelRegion'),
    //     text: locality.regionName
    //   }, {
    //     title: this.$t('forms.pqWarehouses.general.labelDistrict'),
    //     text: locality.districtName
    //   }, {
    //     title: this.$t('forms.pqWarehouses.general.labelSettlement'),
    //     text: locality.name
    //   }]
    // },
  }

}
</script>

<style lang="scss" scoped>
.PQWarehousesPatternAddress {

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
        margin-top: 1rem;

        display: flex;
        justify-content: center;
    }

}
</style>
