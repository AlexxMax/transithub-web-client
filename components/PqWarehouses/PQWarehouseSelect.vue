<template>
  <el-select
    style="width: 100%"
    v-model="value"
    value-key="value"
    v-loading="loading"
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

        this.loading = true

        const { status, items } = await this.$api.parkingQueueWarehouses.getPQWarehouses(null, null)

        if (status) return items.map(({ guid, name }) => ({ id: guid, label: name, value: guid }))

      } catch ({ message }) {
        notify.error(message)
      } finally {
        this.loading = false
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
    console.log('mounted');
    this.options = await this.fetchWarehouses()

    if (this.initValue)
      this.value = this.initValue

    else if (this.options.length > 0) {
      this.value = this.options[0].value
      this.$emit('mounted-change', this.value)
    }

  }
}
</script>
