<template>
<div class="PQWarehousesEditDialogAddress">

  <!-- <pre>{{ form }}</pre> -->

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
      :address.sync="form.address"
    />

    <div class="w-full lg:flex lg:justify-between">
      <el-form-item
        class="lg:w-3/4"
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
        class="lg:ml-5 lg:w-1/4"
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
    </div>


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
import Button from '@/components/Common/Buttons/Button'
import CommonSelectKoatuu from '@/components/Common/CommonSelectKoatuu'
import MapSearch from '@/components/Common/MapSearch'

import { generateValidator } from '@/utils/validation'

const KIND = Object.freeze({
  region: 2,
  district: 3,
  settlement: 4
})

export default {

  components: {
    Button,
    CommonSelectKoatuu,
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
    return {

      KIND,

      zoom: this.form.settlement ? 12 : 6,

      buttons: [{
          text: this.$t(`forms.pqWarehouses.pattern.buttonPrev`),
          type: '',
          function: this.handleClickPrev
        },
        {
          text: this.creating ? this.$t('forms.pqWarehouses.pattern.buttonCreate') : this.$t('forms.pqWarehouses.pattern.buttonChange'),
          type: 'primary',
          function: this.handleClickSave
        }
      ],

      rules: {
        settlement: [generateValidator(this, 'settlement')],
      }

    }
  },

  watch: {
    'form.street'(value) {
      if (!value) this.form.building = ''
    },

    fullAddress(value) {
      this.form.fullAddress = value
    },

    form: {
      deep: true,
      immediate: true,
      handler(value) {
        const { region, district, settlement } = this.form
        settlement ? this.changeZoom(12) : district ? this.changeZoom(10) : region ? this.changeZoom(8) : this.changeZoom(6)
      }
    }
  },

  computed: {
    fullAddress() {
      const streetShort = this.$t('forms.pqWarehouses.general.labelStreetShort')
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

  created() {
    const { region, district, settlement } = this.form

    this.initValues = settlement ? [
      { kind: 2, value: Number(region) },
      { kind: 3, value: Number(district) },
      { kind: 4, value: Number(settlement) }
    ] : null
  },

  methods: {
    handleClickPrev() {
      this.$emit('prev')
    },

    handleClickSave() {
      this.$refs['PQWarehousesEditDialogAddress__form'].validate(valid => {
        if (valid) this.$emit('save')
      })
    },

    clearInputs(inputs = []) {
      ['street', 'building', 'lat', 'lng'].forEach(input => this.form[input] = '')
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
