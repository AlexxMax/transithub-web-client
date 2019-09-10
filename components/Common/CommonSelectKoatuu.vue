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

  <!-- <pre>{{ point }}</pre> -->

  <el-form-item
    v-for="(input, key, index) in inputs"
    :key="index"
    :prop="input.prop"
    :label="input.label"
  >

    <el-select
      style="width: 100%"
      v-model="point[key].code"
      v-loading="point[key].loading"
      reserve-keyword
      filterable
      clearable
      remote
      :remote-method="search => handleSearch(search, input.kind, key)"
      @change="handleSelect(key)"
    >
      <el-option
        v-for="item in point[key].items"
        :key="item.id"
        :label="item.name"
        :value="item.code"
      >
        <span>{{ item.name }}</span>
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
        district: {
          label: this.$t('forms.pqWarehouses.general.labelDistrict'),
          prop: 'district',
          kind: 3
        },
        settlement: {
          label: this.$t('forms.pqWarehouses.general.labelSettlement'),
          prop: 'settlement',
          kind: 4
        }
      }

    }
  },

  async created() {
    this.settlement ? await this.setInputs(4, this.settlement, true) : null
  },

  methods: {
    async handleSearch(search, kind, key) {

      let { region: { code: regionCode }, district: { code: districtCode } } = this.point

      if (kind === 2) {

        this.point.region.items = null
        this.point.district.items = null
        this.point.settlement.items = null

        regionCode = null
        districtCode = null

      } else if (kind === 3) {

        this.point.settlement.items = null

        districtCode = null

      }

      this.point[key].loading = true

      const payload = [10, null, kind, null, regionCode, districtCode, search]

      try {

        const { status, items } = await this.$api.points.getPoints(...payload)
        this.point[key].items = status ? items.map(item => format(kind, item)) : null

      } catch ({ message }) { notify.error(message) }

      this.point[key].loading = false

    },

    async setInputs(kind, code, initial = false) {

      if (kind === 3) {
        this.point.region.loading = true
      } else if (kind === 4) {
        this.point.region.loading = true
        this.point.district.loading = true
      }
      this.point.settlement.loading = initial

      try {

        const { status, item } = await this.$api.points.getPoint(code, kind)

        if (status) {
          this.point.region.items = [{ code: item.regionCode, name: item.regionName }]
          this.point.region.code = item.regionCode

          if (kind === 4) {
            this.point.district.items = [{ code: item.districtCode, name: item.districtName }]
            this.point.district.code = item.districtCode
          }

          if (initial) {
            this.point.settlement.items = [{ code: item.koatuu, name: item.name }]
            this.point.settlement.code = item.koatuu
          }
        }

      } catch ({ message }) { notify.error(message) }

      Object.keys(this.point).forEach(key => this.point[key].loading = false)
    },

    async fetchByCode(kind, value) {

      if (
        (kind === 2 && this.point.region.code === value) ||
        (kind === 3 && this.point.district.code === value)
      ) return

      const key = kind === 2 ? 'region' : kind === 3 ? 'district' : kind === 4 ? 'settlement' : null

      this.point[key].loading = true

      try {

        const { status, item } = await this.$api.points.getPoint(value, kind)

        if (status) {
          this.point[key].items = [format(kind, item)]
          this.point[key].code = this.point[key].items[0].code

        } else {
          this.point[key].items = null
          this.point[key].code = null
        }

      } catch ({ message }) { notify.error(message) }

      this.point[key].loading = false

    },

    async handleSelect(key) {

      const { region, district, settlement } = this.point
      const selected = this.point[key].code ? this.point[key].items.filter(item => item.code === this.point[key].code)[0].raw : null

      this.$emit('select', selected)
      this.$emit(`select-${key}`, selected)

      if (key === 'region') {

        this.point.district.code = null
        this.point.district.items = null
        this.point.settlement.code = null
        this.point.settlement.items = null

      } else if (key === 'district') {

        this.point.settlement.code = null
        this.point.settlement.items = null

        if (selected) {
          selected.regionCode !== region.code ? this.setInputs(3, selected.districtCode) : null
        }

      } else if (key === 'settlement') {

        if (selected) {
          selected.districtCode !== district.code ? this.setInputs(4, selected.koatuu) : null

          this.$emit('update:lat', selected ? Number(selected.lat) : '')
          this.$emit('update:lng', selected ? Number(selected.lng) : '')
        }

      }

      this.$emit('update:address', selected ? selected.description : '')

    },

    getLabelHint(item, kind) {

      const { region: { code: regionCode }, district: { code: districtCode } } = this.point

      if (kind === 3)
        return regionCode ? '' : `(${item.raw.description.split(', ')[1]})`
      else if (kind === 4)
        return districtCode ? '' : `(${item.raw.description.split(', ')[2]})`
      else
        return ''

    }

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
