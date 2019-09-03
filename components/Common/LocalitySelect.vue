<template>
<el-select
  style="width: 100%"
  :disabled="isDisabled || initialLoading"
  v-loading="loading || initialLoading"
  v-model="value"
  filterable
  remote
  reserve-keyword
  :remote-method="handleRemoteSearch"
  @change="$emit('change', currentLocality)"
>
  <el-option
    v-for="item in options"
    :key="item.id"
    :label="item.label"
    :value="item.value"
  />
</el-select>
</template>

<script>
import * as notify from '@/utils/notifications'

export default {
  name: 'th-locality-select',

  props: {
    initValue: [Number, String],
    kind: {
      type: Number,
      default: 4,
      validator: value => [2, 3, 4].includes(value)
    },
    region: {
      type: String,
      default: ''
    },
    district: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    loading: false,
    initialLoading: false,
    value: null,
    options: []
  }),

  computed: {
    currentLocality() {
      const option = this.options.find(item => item.value === this.value)
      return option ? option.obj : null
    },

    isDisabled() {
      if (this.kind === 3)
        return !this.region
      else if (this.kind === 4)
        return !this.region || !this.district
      else
        return false
    },

    kinds() {
      return {
        region: this.kind === 2,
        district: this.kind === 3,
        settlement: this.kind === 4,
      }
    }
  },

  methods: {
    async handleRemoteSearch(query) {
      this.options = []
      if (query !== '') {
        this.loading = true
        this.options = await this.getOptions(query)
        this.loading = false
      }
    },

    async getOptions(query) {
      try {
        const { status, items } = await this.$api.points.getPoints(
          10, // limit
          null, // offset
          this.kind, // kind
          null, // country_code
          this.region || null, // region_code
          this.district || null, // district_code
          query // search
        )
        if (status) {

          // return []

          return items.map(item => ({
            id: item.guid,
            label: this.kinds.region ? item.description : this.kinds.district ? item.districtName : this.kinds.settlement ? item.name : '',
            value: this.kinds.region ? item.regionCode : this.kinds.district ? item.districtCode : this.kinds.settlement ? item.koatuu : '',
            obj: item
          }))


        }
      } catch ({ message }) {
        notify.error(message)
      }
      return []
    }
  },

  watch: {
    initValue(value) {
      this.value = this.initValue
    },

    region(value) {
      if (!this.kinds.region) {
        this.value = null
        this.options = []
      }
    },
    district(value) {
      if (!this.kinds.district) {
        this.value = null
        this.options = []
      }
    }
  },

  async mounted() {
    if (this.initValue) {
      this.initialLoading = true

      try {
        this.value = this.initValue
        const { status, item } = await this.$api.points.getPoint(this.initValue, this.kind)
        if (status) {
          this.options = [{
            id: item.guid,
            label: this.kinds.region ? item.description : this.kinds.district ? item.districtName : this.kinds.settlement ? item.name : '',
            value: this.kinds.region ? item.regionCode : this.kinds.district ? item.districtCode : this.kinds.settlement ? item.koatuu : '',
            obj: item
          }]
          this.$emit('mounted-change', this.currentLocality)
        }
      } catch ({ message }) {
        notify.error(message)
      }

      this.initialLoading = false
    }
  }
}
</script>
