<template>
  <el-select
    style="width: 100%"
    v-model="value"
    filterable
    remote
    reserve-keyword
    :remote-method="handleRemoteSearch"
    :loading="loading"
    placeholder="Select"
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
    initValue: [ Number, String ]
  },

  data: () => ({
    loading: false,
    value: null,
    options: []
  }),

  computed: {
    currentLocality() {
      const option = this.options.find(item => item.value === this.value)
      return option ? option.obj : null
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
        const { status, items } = await this.$api.points.getPoints(10, null, 4, null, null, null, query)
        if (status) {
          return items.map(item => ({
            id: item.guid,
            label: item.description,
            value: item.koatuu,
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
    }
  },

  async mounted() {
    if (this.initValue) {
      this.loading = true

      try {
        this.value = this.initValue
        const { status, item } = await this.$api.points.getPoint(this.initValue)
        if (status) {
          this.options = [{
            id: item.guid,
            label: item.description,
            value: item.koatuu,
            obj: item
          }]
          this.$emit('mounted-change', this.currentLocality)
        }
      } catch ({ message }) {
        notify.error(message)
      }

      this.loading = false
    }
  }
}
</script>
