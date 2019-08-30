<template>
<div class="PQWarehousesEditDialogAddress">

  <el-form
    ref="PQWarehousesEditDialogAddress__form"
    :model="form"
    :rules="rules"
    size="mini"
    status-icon
  >
    <el-form-item
      prop="region"
      :label="$t('forms.pqWarehouses.general.labelRegion')"
    >
      <LocalitySelect
        :kind="KIND.region"
        @change="handleSelectRegion"
        :init-value="form.region"
      />
    </el-form-item>

    <el-form-item
      prop="district"
      :label="$t('forms.pqWarehouses.general.labelDistrict')"
    >
      <LocalitySelect
        :kind="KIND.district"
        :region="form.region"
        @change="handleSelectDistrict"
        :init-value="form.district"
      />
    </el-form-item>

    <el-form-item
      prop="settlement"
      :label="$t('forms.pqWarehouses.general.labelSettlement')"
    >
      <LocalitySelect
        :kind="KIND.settlement"
        :region="form.region"
        :district="form.district"
        @change="handleSelectSettlement"
        :init-value="form.settlement"
      />
    </el-form-item>

    <el-form-item
      prop="address"
      :label="$t('forms.pqWarehouses.general.labelStreet')"
    >
      <el-input
        :placeholder="$t('forms.pqWarehouses.general.labelStreet')"
        :disabled="!form.settlement"
        clearable
        v-model.lazy="form.street"
      />
    </el-form-item>

    <el-form-item
      prop="building"
      :label="$t('forms.pqWarehouses.general.labelBuilding')"
    >
      <el-input
        :placeholder="$t('forms.pqWarehouses.general.labelBuilding')"
        :disabled="!form.street"
        clearable
        v-model.number="form.building"
      />
    </el-form-item>

    <el-form-item
      class="PQWarehousesEditDialogAddress__address"
      :label="$t('forms.pqWarehouses.general.labelFullAddress')"
    >
      <span v-if="fullAddress">{{ fullAddress }}</span>

      <span
        v-else
        class="PQWarehousesEditDialogAddress__placeholder"
      >{{ $t('forms.pqWarehouses.general.placeholderFullAddress') }}</span>
    </el-form-item>
  </el-form>

  <div class="PQWarehousesEditDialogAddress__label">
    <span>{{ $t('forms.pqWarehouses.general.labelSelectPointOnMap') }}</span>
  </div>

  <MapSearch
    :query="fullAddress"
    :zoom="zoom"
    :marker="position"
    @on-map-click="({ lat, lng }) => { form.lat = lat; form.lng = lng }"
  />

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
    },

    creating: {
      type: Boolean,
      default: false
    }
  },

  data() {

    const locationRules = [{
      required: true,
      trigger: 'change',
      validator: (rule, value, cb) => value ? cb() : cb(new Error(
        this.$t(`forms.pqWarehouses.pattern.steps.location.validationRequiredSettlement`))
      )
    }]

    return {

      KIND,

      zoom: this.form.settlement ? 12 : 6,

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

      meta: [],

      rules: {
        region: locationRules,
        district: locationRules,
        settlement: locationRules,
      }

    }
  },

  watch: {
    'form.street'(value) {
      if (!value) this.form.building = ''
    },

    fullAddress(value) {
      this.form.fullAddress = value
    }
  },

  computed: {
    fullAddress() {
      const streetShort = this.$t('forms.pqWarehouses.general.labelSelectPointOnMap')
      let fullAddress = ''

      if (this.form.address) fullAddress = this.form.address
      if (this.form.street) fullAddress += `, ${streetShort}. ${this.form.street}`
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
      this.$refs['PQWarehousesEditDialogAddress__form'].validate(valid => {

        if (valid) this.$emit('next')

      })
    },

    handleSelectRegion(region) {
      this.form.region = region.regionCode
      this.form.address = region.description
      this.changeZoom(8)

      this.clearInputs(['district'])
    },
    handleSelectDistrict(district) {
      this.form.district = district.districtCode
      this.form.address = district.description
      this.changeZoom(10)

      this.clearInputs(['settlement'])
    },
    handleSelectSettlement(settlement) {
      this.form.settlement = settlement.koatuu
      this.form.address = settlement.description
      this.changeZoom(12)

      this.clearInputs()

      this.form.lat = Number(settlement.lat)
      this.form.lng = Number(settlement.lng)
    },
    handleMapPointSelect({ lat, lng }) {
      this.form.lat = lat
      this.form.lng = lng
    },

    clearInputs(inputs = []) {
      [...inputs, 'street', 'building', 'lat', 'lng'].forEach(input => this.form[input] = '')
    },

    changeZoom(zoom) {
      setTimeout(() => this.zoom = zoom, 1000)
    }
  }

}
</script>

<style lang="scss" scoped>
.PQWarehousesEditDialogAddress {

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