<!--

Emits:

@select="" - on every option select
@select-region="" - on select region
@select-district="" - on select district
@select-settlement="" - on select settlement

Also emits values as:

settlement, lat, lng, address e.g. :settlement.sync=""

-->

<template>
<div class="CommonSelectKoatuu">

  <el-form-item
    v-for="(input, key, index) in inputs"
    :key="index"
    :prop="input.prop"
    :label="input.label"
    :show-message="false"
  >

    <el-select
      style="width: 100%"
      v-model="point[key].code"
      v-loading="point[key].loading"
      filterable
      clearable
      remote
      :remote-method="search => handleSearch(search, input.kind, key)"
      @change="handleSelect(key)"
    >
      <el-option
        v-for="item in point[key].items"
        :key="item.id"
        :label="getLabel(item, input.kind)"
        :value="item.code"
      >
        <span>{{ item.type }} {{ item.name }}</span>
        <span class="CommonSelectKoatuu__hint">{{ getLabelHint(item, input.kind) }}</span>
      </el-option>
    </el-select>

  </el-form-item>

</div>
</template>

<script>
import * as notify from '@/utils/notifications'

const format = (kind, item) => {
  const labelKey = kind === 2 ? 'regionName' : kind === 3 ? 'districtName' : 'name'
  const valueKey = kind === 2 ? 'regionCode' : kind === 3 ? 'districtCode' : 'koatuu'

  return { id: item.guid, name: item[labelKey], code: item[valueKey], type: item.type, raw: item }
}

export default {

  props: {
    lat: {
      type: [Number, String],
      required: false
    },
    lng: {
      type: [Number, String],
      required: false
    },
    settlement: {
      type: [Number, String],
      required: false
    },
    address: {
      type: String,
      required: false
    },
    settlementPropName: {
      type: String,
      default: 'settlement'
    },

    showDistrict: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({

    point: {
      region: {
        loading: false,
        items: null,
        code: null
      },
      district: {
        loading: false,
        items: null,
        code: null
      },
      settlement: {
        loading: false,
        items: null,
        code: null
      }
    }

  }),

  watch: {
    'point.settlement.code': {
      deep: true,
      handler(value) {
        this.$emit('update:settlement', value ? value : '')
      }
    }
  },

  computed: {
    inputs() {

      return {
        region: {
          label: this.$t('forms.pqWarehouses.general.labelRegion'),
          prop: 'region',
          kind: 2
        },
        ...this.showDistrict && {
          district: {
            label: this.$t('forms.pqWarehouses.general.labelDistrict'),
            prop: 'district',
            kind: 3
          }
        },
        settlement: {
          label: this.$t('forms.pqWarehouses.general.labelSettlement'),
          prop: this.settlementPropName,
          kind: 4
        }
      }

    }
  },

  async created() {
    this.settlement ? await this.setInputsBySettlement(this.settlement) : null
  },

  methods: {
    async handleSearch(search, kind, key) {

      let { region: { code: regionCode }, district: { code: districtCode } } = this.point

      if (kind === 2) {

        regionCode = null
        districtCode = null

      } else if (kind === 3) {

        districtCode = null

      }

      this.point[key].loading = true

      const payload = [30, null, kind, null, regionCode, null, search]

      try {

        const { status, items } = await this.$api.points.getPoints(...payload)
        this.point[key].items = status ? items.map(item => format(kind, item)) : null

      } catch ({ message }) { notify.error(message) }

      this.point[key].loading = false

    },

    async setInputsBySettlement(code) {

      Object.keys(this.point).forEach(key => this.point[key].loading = true)

      try {

        const { status, item } = await this.$api.points.getPoint(code, 4)

        if (status) {
          this.point.region.items = [{ code: item.regionCode, name: item.regionName, type: item.type }]
          this.point.region.code = item.regionCode

          this.point.district.items = [{ code: item.districtCode, name: item.districtName, type: item.type }]
          this.point.district.code = item.districtCode

          this.point.settlement.items = [{ code: item.koatuu, name: item.name, type: item.type }]
          this.point.settlement.code = item.koatuu

          this.$emit('update:address', item ? item.descriptionUa : '')
        }

      } catch ({ message }) { notify.error(message) }

      Object.keys(this.point).forEach(key => this.point[key].loading = false)

    },

    async handleSelect(key) {

      const { region, district, settlement } = this.point
      const selected = this.point[key].code ? this.point[key].items.filter(item => item.code === this.point[key].code)[0].raw : null

      this.$emit('select', selected ? selected : {})
      this.$emit(`select-${key}`, selected ? selected : {})

      if (key === 'region') {

        this.point.district.code = null
        this.point.district.items = null
        this.point.settlement.code = null
        this.point.settlement.items = null

      } else if (key === 'district') {

        this.point.settlement.code = null
        this.point.settlement.items = null

        if (selected) {
          this.point.region.items = [{ code: selected.regionCode, name: selected.regionName, type: selected.type }]
          setTimeout(() => this.point.region.code = selected.regionCode)

          this.point.district.items = this.point.district.items.filter(item => item.code === this.point.district.code)
        }

      } else if (key === 'settlement') {

        if (selected) {

          this.point.region.items = [{ code: selected.regionCode, name: selected.regionName, type: selected.type }]
          this.point.district.items = [{ code: selected.districtCode, name: selected.districtName, type: selected.type }]

          setTimeout(() => {
            this.point.region.code = selected.regionCode
            this.point.district.code = selected.districtCode
          })

          this.point.settlement.items = this.point.settlement.items.filter(item => item.code === this.point.settlement.code)

          this.$emit('update:lat', selected ? Number(selected.lat) : '')
          this.$emit('update:lng', selected ? Number(selected.lng) : '')
        }

      }

      this.$emit('update:address', selected ? selected.descriptionUa : '')

    },

    getLabel: (item, kind) => kind === 4 ? `${item.type} ${item.name}` : item.name,

    getLabelHint(item, kind) {

      const { region: { code: regionCode }, district: { code: districtCode } } = this.point

      try {

        if (['Місто', 'Город'].includes(item.type))
          return ''

        if (kind === 3)
          return regionCode ? '' : `(${item.raw.description.split(', ')[1]})`
        else if (kind === 4)
          return districtCode ? '' : `(${item.raw.description.split(', ')[2]})`
        else
          return ''

      } catch (e) {}

    },

  }
}
</script>

<style lang="scss" scoped>
.CommonSelectKoatuu {
    &__hint {
        color: $--color-info;
    }
}
</style>
