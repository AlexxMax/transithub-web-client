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
    @change="$emit('change', currentWarehouse)"
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
  name: 'th-warehouse-select',

  props: {
    initValue: [ Number, String ]
  },

  data: () => ({
    loading: false,
    value: null,
    options: []
  }),

  computed: {
    currentWarehouse() {
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
        const { status, items } = await this.$api.pqWarehouses.getPQWarehouses(null, null)
        if (status) {
          return items.map(item => ({
            id: item.guid,
            label: item.name,
            value: item.guid,
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
        const { status, item } = await this.$api.pqWarehouses.getPQWarehouses(null, null, this.initValue)
        if (status) {
          this.options = [{
            id: item.guid,
            label: item.name,
            value: item.guid,
            obj: item
          }]
          this.$emit('mounted-change', this.currentWarehouse)
        }
      } catch ({ message }) {
        notify.error(message)
      }

      this.loading = false
    }
  }
}
</script>
