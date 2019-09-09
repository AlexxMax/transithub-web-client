<template>
<div class="CommonSelectKoatuu">

  <pre>{{ point.region.code }}</pre>
  <pre>{{ point.district.code }}</pre>
  <pre>{{ point.settlement.code }}</pre>

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
      />
    </el-select>

  </el-form-item>

</div>
</template>

<script>
import * as notify from '@/utils/notifications'

export default {

  props: {
    settlement: {
      type: Boolean,
      default: true
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

  computed: {
    inputs() {

      const main = {
        region: {
          label: this.$t('forms.pqWarehouses.general.labelRegion'),
          prop: 'region',
          kind: 2
        },
        district: {
          label: this.$t('forms.pqWarehouses.general.labelDistrict'),
          prop: 'district',
          kind: 3
        }
      }

      const settlement = {
        label: this.$t('forms.pqWarehouses.general.labelSettlement'),
        prop: 'settlement',
        kind: 4
      }

      return this.settlement ? { ...main, settlement } : main

    }
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

      } else if (kind === 4) {

      }

      this.point[key].loading = true

      const payload = [10, null, kind, null, regionCode, districtCode, search]

      try {

        const { status, items } = await this.$api.points.getPoints(...payload)
        this.point[key].items = status ? this.format(kind, items) : null

        if (!this.settlement)
          this.$emit('handle-settlements', this.point[key].items)

      } catch ({ message }) { notify.error(message) }

      this.point[key].loading = false

    },

    async fetchByCode({ kind, regionCode, districtCode, settlementCode }) {

      if (
        (kind === 2 && this.point.region.code === regionCode) ||
        (kind === 3 && this.point.district.code === districtCode)
      ) return

      const key = kind === 2 ? 'region' : kind === 3 ? 'district' : kind === 4 ? 'settlement' : null
      const payload = [10, null, kind, null, regionCode, districtCode, null]

      this.point[key].loading = true

      try {

        const { status, items } = await this.$api.points.getPoints(...payload)

        if (status) {
          this.point[key].items = this.format(kind, items)
          this.point[key].code = this.point[key].items[0].code

          this.$emit(`select-${key}`, this.point[key].items[0].raw)
        } else {
          this.point[key].items = null
          this.point[key].code = null
        }

      } catch ({ message }) { notify.error(message) }

      this.point[key].loading = false

    },

    async handleSelect(key) {

      const selected = this.point[key].code ? this.point[key].items.filter(item => item.code === this.point[key].code)[0].raw : null

      if (key === 'region') {

        this.point.district.code = null
        this.point.settlement.code = null

        if (selected)
          setTimeout(_ => this.point.region.items = null, 500)

        this.$emit('select-region', selected)

      } else if (key === 'district') {

        this.point.settlement.code = null

        if (selected) {
          setTimeout(_ => this.point.district.items = null, 500)

          await this.fetchByCode({ kind: 2, regionCode: selected.regionCode })
        }

        this.$emit('select-district', selected)

      } else if (key === 'settlement') {

        if (selected) {
          setTimeout(_ => this.point.settlement.items = null, 500)

          await this.fetchByCode({ kind: 2, regionCode: selected.regionCode })
          await this.fetchByCode({ kind: 3, districtCode: selected.districtCode })
        }

        this.$emit('select-settlement', selected)

      }

    },

    format(kind, items) {
      const labelKey = kind === 2 ? 'description' : kind === 3 ? 'districtName' : 'name'
      const valueKey = kind === 2 ? 'regionCode' : kind === 3 ? 'districtCode' : 'koatuu'

      return items.map(item => ({ id: item.guid, name: item[labelKey], code: item[valueKey], type: item.type, raw: item }))
    },

    getLabel(item) {

    }

  }
}
</script>

<style lang="scss" scoped>
</style>
