<template>
  <el-select
    style="width: 100%"
    v-model="value"
    value-key="value"
    :loading="loading"
    @change="$emit('change', value)"
  >
    <el-option
      v-for="item in options"
      :key="item.guid"
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
    initValue: String,
    warehouse: String
  },

  data: () => ({
    loading: false,
    value: null,
    options: []
  }),

  methods: {
    async fetchWarehouses() {
      try {
        const { status, items } = await this.$api.parkingQueueWarehouses.getPQWarehouses(null, null)
        if (status) {
          return items.map(item => ({
            id: item.guid,
            label: item.name,
            value: item.guid
          }))
        }
      } catch ({ message }) {
        notify.error(message)
      }
      return []
    },

    getValue() {
      return this.value
    }
  },

  watch: {
    initValue(value) {
      this.value = this.initValue
    },

    warehouse(value) {
      this.value = this.warehouse
    },

    value(value) {
      this.$emit('update:warehouse', value)
    }
  },

  async mounted() {
    this.options = await this.fetchWarehouses()
    if (this.initValue) {
      this.value = this.initValue
    } else if (this.options.length > 0) {
      this.value = this.options[0].value
      this.$emit('mounted-change', this.value)
    }
  }
}
</script>
