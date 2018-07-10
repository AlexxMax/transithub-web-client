<template>
  <div>
    <el-dialog
      :gutter="20"
      :visible="visible"
      :title="$t('forms.company.dialog.accredCompanys')"
      top="50px"
      width="60%"
      @close="$emit('close')">

      <el-row :gutter="20">
        <el-col :span="24">
          <th-company-widget
            v-for="(company, index) of accredCompanies.list"
            :key="index"
            :name="company.opponentWorkName"
            :description="company.description"
            :active="!!company.active"
            :date="company.accredDateUtc"
            :period="company.accredPeriod"
            @onCompanyActivation="company.active = !company.active" />
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import CompanyWidget from '@/components/Companies/CompanyWidget'

export default {
  components: {
    "th-company-widget": CompanyWidget,
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      accredCompanies: { list: [], count: 0 },
    }
  },

  async created() {
    await this.fetchCompanyAccredCompanies()
    for (const company of this.$store.state.companies.accredCompanies.list) {
      this.accredCompanies.list.push({ ...company })
    }
    this.accredCompanies.count = this.$store.state.companies.accredCompanies.count
  },

  methods: {
    fetchCompanyAccredCompanies: async function() {
      await this.$store.dispatch('companies/loadCompanyAccredCompanies')
    },
  }
}
</script>

<style>

</style>
