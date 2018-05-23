<template>
  <el-select class="th-company-select" :placeholder="currentCompany" size="small" @change=selectCompany>
    <el-option
      v-for="(company, index) in companies"
      :key="index"
      :label="company.name"
      :value="company.guid">
      <span style="float: left">{{ company.name }}</span>
    </el-option>
  </el-select>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  methods: {
    selectCompany: function(companyGuid) {
      const company = this.$store.getters['companies/getCompanyByGuid'](companyGuid)
      this.$store.dispatch('companies/setCurrentCompany', company)
      this.refreshCurrentPage()
    },

    refreshCurrentPage: function() {
      const pagePath = this.$route.fullPath.replace(`/${this.$store.state.locale}/workspace/`, '')
      const parts = pagePath.split('/')
      if (parts.length === 1 && parts[0] === 'vehicles') {
        EventBus.$emit('refresh-vehicles-page')
      } else if (parts.length === 1 && parts[0] === 'drivers') {
        EventBus.$emit('refresh-drivers-page')
      } else if (parts.length === 1 && parts[0] === 'orders') {
        EventBus.$emit('refresh-orders-page')
      }
    }
  },

  computed: {
    currentCompany: function() {
      return this.$store.state.companies.currentCompany.name
    },

    companies: function() {
      const list = [ ...this.$store.state.companies.list ]
      const currentCompany = this.$store.state.companies.currentCompany
      const index = list.findIndex(elem => elem.guid === currentCompany.guid)
      list.splice(index, 1)
      return list
    }
  }
}
</script>

<style lang="scss" >
.th-current-company-name-wrapper {
  margin-left: 10px;
}

.th-current-company-name {
  color: white;
}

.th-company-select {
  line-height: 59px;

  .el-input{
    &:not(.is-focus) {
      .el-input__inner {
        background-color: rgba(0,0,0,0);
        border-width: 0px;

        &:hover {
          background-color: rgba(0,0,0,0.2)
        }
      }
    }

    .el-input__suffix {
      display: none
    }
  }
}



</style>

