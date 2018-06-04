<template>
  <el-select class="th-company-select" :placeholder="currentCompany" :value="currentCompany" size="small" @change=selectCompany>
    <el-option
      v-for="(company, index) in companies"
      :key="index"
      :label="company.nameUa"
      :value="company.guid">
      <span style="float: left">{{ company.nameUa }}</span>
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
      EventBus.$emit('workspace-changed')
    }
  },

  computed: {
    currentCompany: function() {
      return this.$store.state.companies.currentCompany.nameUa
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

.th-company-select {
  line-height: 59px;

  .el-input {
    .el-input__inner {
      border: none;
      font-size: 16px;
      text-align: center;
      color: #606266;
    }

    &:not(.is-focus) {
      .el-input__inner {
        &:hover {
          background-color: rgba(0,0,0,0.08)
        }
      }
    }

    .el-input__suffix {
      display: none
    }
  }
}



</style>

