<template>
  <Select
    ref="select"
    :list="companies"
    :init-key="currentCompanyGuid"
    search-placeholder="Search"
    @select="handleSelect">

    <Company
      slot="avatar"
      :name="selectedCompanyName"
      avatar-only
      :avatar-size="30"
      style="margin-top: 5px"
    />

    <template slot-scope="slotProps">
      <Company :name="slotProps.text" :avatar-size="30" />
    </template>

  </Select>
</template>

<script>
import Select from '@/components/Common/Select'
import Company from '@/components/Companies/Company'

export default {
  name: 'th-select-company',

  components: {
    Select,
    Company
  },

  props: {
    initValue: [ String ]
  },

  data: () => ({
    companyGuid: null
  }),

  computed: {
    companies() {
      const list = this.$store.state.companies.list.map(item => ({
        text: item.name,
        key: item.guid
      }))

      return list
    },
    currentCompanyGuid() {
      return this.initValue || this.$store.state.companies.currentCompany.guid
    },
    selectedCompanyName() {
      const company = this.$store.state.companies.list.find(item => item.guid === this.companyGuid)
      if (company) {
        return company.name
      }
      return this.$store.state.companies.currentCompany.name
    }
  },

  methods: {
    handleSelect(key) {
      this.companyGuid = key
    },
    reset() {
      this.companyGuid = this.currentCompanyGuid
      if (this.$refs['select']) {
        this.$refs['select'].reset()
      }
    },
    getCompanyGuid() {
      return this.companyGuid
    }
  },

  created() {
    this.reset()
  }
}
</script>
