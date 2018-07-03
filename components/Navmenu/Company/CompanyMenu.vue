<template>
  <el-popover
    ref="popover"
    placement="right"
    width="400"
    size="40"
    trigger="click">

    <div class="th-company-card">
      <span class="th-company-card-title">{{ $t('links.navmenu.company.currentCompany') }}</span>
      <nuxt-link class="th-link" :to="$i18n.path('workspace/company')">
        <th-company-widget
          :name="currentCompany.name"
          :description="currentCompany.description ||currentCompany.fullname" />
      </nuxt-link>

      <span class="th-company-card-title">{{ $t('links.navmenu.company.companies') }}</span>
      <th-company-widget
        v-for="(company, index) of companies"
        :key="index"
        :name="company.name"
        :description="company.description || company.fullname"
        @click="selectCompany(company.guid)" />

      <th-company-create-new @click="onDialogNewCompanyOpen" />
    </div>

    <th-company-avatar
      slot="reference"
      :name="currentCompany.name"
      class="th-company-avatar"
      :size="40"
      :rounded=false />
  </el-popover>
</template>

<script>
import Avatar from "@/components/Common/Avatar"
import Button from '@/components/Common/Buttons/Button'
import CompanyWidget from '@/components/Navmenu/Company/CompanyNavmenuWidget'
import CreateNewCompany from '@/components/Navmenu/Company/CreateNewButton'

import EventBus from '@/utils/eventBus'

export default {
  components: {
    "th-company-avatar": Avatar,
    "th-company-widget": CompanyWidget,
    "th-company-create-new": CreateNewCompany
  },

  data() {
    return {
      visibleNewCompanyDialog: false
    }
  },

  computed: {
    currentCompany: function() {
      return this.$store.state.companies.currentCompany
    },
    companies: function() {
      const currentCompanyGuid = this.$store.state.companies.currentCompany.guid
      return this.$store.state.companies.list.filter(elem => elem.guid !== currentCompanyGuid)
    }
  },

  methods: {
    selectCompany: function(companyGuid) {
      const company = this.$store.getters['companies/getCompanyByGuid'](companyGuid)
      this.$store.dispatch('companies/setCurrentCompany', company)
      this.refreshCurrentPage()
    },

    refreshCurrentPage: function() {
      EventBus.$emit('workspace-changed')
    },

    onDialogNewCompanyOpen: function() {
      this.$refs.popover.showPopper = false
      this.$store.dispatch('companies/showCreateNewDialog', true)
    }
  }
};
</script>

<style lang="scss" scoped>
.th-company-card {
  padding: 10px 0;
  cursor: default;

  .th-company-card-title {
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
}

.th-company-avatar {
    width: 40px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: auto;
    margin-right: auto;
}

.th-link {
  color: inherit;
}
</style>
