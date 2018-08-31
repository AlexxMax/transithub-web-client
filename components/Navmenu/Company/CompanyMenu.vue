<template>
  <div>
    <el-popover
      v-if="companiesQuantity != 0"
      ref="popover"
      placement="right"
      trigger="click">

      <div class="th-company-card">
        <p
          v-if="collapse && currentCompany.guid"
          class="th-company-card-title">
          {{ $t('links.navmenu.company.currentCompany') }}
        </p>
        <nuxt-link v-if="currentCompany.guid" class="th-link" :to="$i18n.path('company/profile')">
          <th-company-widget
            v-if="collapse"
            :name="currentCompany.name"
            :description="currentCompany.description ||currentCompany.fullname" >
            <div slot="addon">
              <span>{{ $t('links.navmenu.company.settings') }}</span>
            </div>
          </th-company-widget>

          <el-button
            v-if="!collapse"
            class="th-company-current-settings"
            type="primary"
            size="small">
            {{ $t('links.navmenu.company.currentCompanySettings') }}
          </el-button>
        </nuxt-link>

        <div class="th-company-card-title-wrapper">
          <p class="th-company-card-title">{{ $t('links.navmenu.company.companies') }}</p>
          <el-tooltip
            effect="dark"
            :content="$t('links.navmenu.company.createNewCompanyTooltip')"
            placement="top">
            <button class="th-company-new-btn" @click="onDialogNewCompanyOpen">
              <fa class="th-company-new-btn-icon" icon="plus" />
            </button>
          </el-tooltip>
        </div>
        <th-company-widget
          v-for="(company, index) of companies"
          :key="index"
          :name="company.name"
          :description="company.description || company.fullname"
          @click="selectCompany(company.guid)"
          @mouseover="currentCompanyIndex = index"
          @mouseout="currentCompanyIndex = null">
          <span
            slot="addon"
            v-show="currentCompanyIndex === index">
            {{ $t('links.navmenu.company.selectCompany') }}
          </span>
        </th-company-widget>

        <!-- <th-company-create-new v-if="companiesQuantity === 0" @click="onDialogNewCompanyOpen" /> -->
      </div>

      <div slot="reference" class="th-company-ref">
        <th-company-avatar
          class="th-company-avatar"
          :name="currentCompany.name"
          :size="refLogoSize"
          radius5px
          :style="`width: ${refLogoSize}px`"/>
        <span v-if="!collapse" style="font-size: 13px; font-weight: 500; color: #606266">{{ currentCompany.name }}</span>
      </div>
    </el-popover>

    <el-tooltip
      v-if="companiesQuantity === 0"
      effect="dark"
      :content="$t('links.navmenu.company.createNewCompanyTooltip')"
      placement="right">
      <button class="th-company-new-btn th-company-new-btn-nav" @click="onDialogNewCompanyOpen">
        <fa v-if="collapse" class="th-company-new-btn-icon" icon="plus" />
        <span v-else style="color: white; font-size: 13px; font-weight: 500;">{{ $t('links.navmenu.company.createNewCompany') }}</span>
      </button>
    </el-tooltip>
  </div>
</template>

<script>
import Avatar from "@/components/Common/Avatar"
import CompanyWidget from '@/components/Navmenu/Company/CompanyNavmenuWidget'
import CreateNewCompany from '@/components/Navmenu/Company/CreateNewButton'

import EventBus from '@/utils/eventBus'

export default {
  components: {
    "th-company-avatar": Avatar,
    "th-company-widget": CompanyWidget,
    "th-company-create-new": CreateNewCompany
  },

  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      visibleNewCompanyDialog: false,
      currentCompanyIndex: null
    }
  },

  computed: {
    currentCompany: function() {
      return this.$store.state.companies.currentCompany
    },
    companies: function() {
      const currentCompanyGuid = this.$store.state.companies.currentCompany.guid
      return this.$store.state.companies.list.filter(elem => elem.guid !== currentCompanyGuid)
    },
    refLogoSize: function() {
      return this.collapse ? 40 : 60
    },
    companiesQuantity: function() {
      return this.$store.state.companies.length
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
      if (this.$refs.popover) {
        this.$refs.popover.showPopper = false
      }
      this.$store.dispatch('companies/showCreateNewDialog', true)
    }
  }
};
</script>

<style lang="scss" scoped>
.th-company-card {
  padding: 10px 0;
  cursor: default;

  .th-company-card-title-wrapper {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .th-company-card-title {
    font-size: 11px;
    font-weight: 500;
    color: #A3A2A2;
    text-transform: uppercase;
    margin-bottom: 5px;
    padding-left: 10px;
  }

  .th-company-current-settings {
    width: 100%;
  }
}

.th-company-avatar {
    margin-top: 15px;
    margin-bottom: 5px;
    margin-left: auto;
    margin-right: auto;
}

.th-link {
  color: inherit;
}

.th-company-ref {
  cursor: pointer;
  text-align: center;
  margin-bottom: 15px;
}

.th-company-new-btn {
  border-width: 0px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: rgb(254, 205, 52);

  &.th-company-new-btn-nav {
    height: 50px;
    width: 80%;
    margin: auto;
    display: block;
    border-radius: 5px;
  }

  .th-company-new-btn-icon {
    color: white;
  }
}
</style>
