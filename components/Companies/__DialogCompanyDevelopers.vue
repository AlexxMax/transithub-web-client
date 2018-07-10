<template>
  <div>
    <el-dialog
      :gutter="20"
      :visible="visible"
      :title="$t('forms.company.dialog.develop')"
      top="50px"
      width="60%"
      @close="$emit('close')">

      <el-row :gutter="20">
        <el-col :span="24">
          <span>API Token:
            <span style="font-weight: bold">{{ apiToken }}</span>
          </span>
          <th-button type="text" @click="generateApiToken" style="margin-left: 5px">{{ $t('forms.apis.dialog.generate') }}</th-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

export default {
  components: {
    "th-button": Button
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      apiToken: ''
    }
  },

  async created() {
    this.apiToken = this.$store.state.companies.currentCompany.apiToken
  },

  methods: {
    async generateApiToken() {
      await this.$store.dispatch('companies/generateApiToken')
      this.apiToken = this.$store.state.companies.currentCompany.apiToken
    }
  }
}
</script>

<style>

</style>
