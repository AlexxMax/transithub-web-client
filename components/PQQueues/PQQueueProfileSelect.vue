<template>
  <div>
    <el-select
      class="PQQueueProfileSelect"
      v-model="value"
      v-loading="loading"
      value-key="value"
      style="width: 100%;"
      @change="$emit('change', value)"
    >
      <el-option
        class="PQQueueProfileSelect__option"
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
import * as notify from '@/utils/notifications'

export default {
  name: 'th-select-queue-profile',
  
  props: {
    initValue: String,
    queueProfile: String
  },

  data: () => ({
    value: null,
    loading: false,
    options: [],
    currentCompany: String
  }),

  methods: {
    async fetchQueuesProfiles() {
      try {
        this.currentCompany = this.$store.state.companies.currentCompany.guid
        this.loading = true

        if (!this.currentCompany) {
          return;
        }

        const { status, items } = await this.$api.parkingQueueProfiles.getQueuesProfiles(this.currentCompany)

        if (status) {
          return items.map(item => ({ label: item.name, value: item.guid }))
        }
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

    queueProfile(value) {
      this.value = this.queueProfile
    },

    value(value) {
      this.$emit('update:queueProfile', value)
    }
  },

  async mounted() {
    this.options = await this.fetchQueuesProfiles()

    if (this.queueProfile) {
      this.value = this.queueProfile
    } else if (this.options.length > 0) {
      this.value = this.options[0].value
      this.$emit('mounted-change', this.value)
    }
  }
}
</script>