<template>
  <div class="CompanyListItem">
    <Wrapper>
      <el-tooltip
        effect="dark"
        :content="name"
        placement="right">
        <div :class="{ 'CompanyListItem__current': isCurrent, 'CompanyListItem__unit': true }">
          <div class="CompanyListItem__items" @click="setAsCurrent">
            <Avatar
              :name="name"
              :size="40"
              radius5px
              :style="{ 'width': '40px' }"/>

              <div v-show="collapse">
                <div class="CompanyListItem__items-title">
                  <span class="CompanyListItem__items-title-name">{{ name }}</span>
                </div>
              </div>
          </div>
        </div>
      </el-tooltip>
    </Wrapper>

    <ZoomCenter v-if="isCurrent">
      <div class="CompanyListItem__settings-wrapper">
        <span
          class="CompanyListItem__settings"
          :style="{ 'border-radius': collapse ? '5px' : '50%' }"
          @click="toggleMenu">
          <span class="CompanyListItems__settings-icon">
            <fa icon="cog"/>
          </span>
          <span
            v-if="collapse"
            class="CompanyListItems__settings-title">{{ $t('links.navmenu.company.settings') }}</span>
        </span>
      </div>
    </ZoomCenter>
  </div>
</template>

<script>
import Wrapper from '@/components/Navmenu/CompaniesListElements/Wrapper'
import Avatar from '@/components/Common/Avatar'
import ZoomCenter from '@/components/Common/Transitions/ZoomCenter'

import EventBus from '@/utils/eventBus'

export default {
  name: 'th-company-list-item',

  components: {
    Wrapper,
    Avatar,
    ZoomCenter
  },

  props: {
    guid: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },

  computed: {
    isCurrent() {
      const currentCompany = this.$store.getters['companies/getCurrentCompany']
      return this.guid === currentCompany.guid
    },
    collapse() {
      return !this.$store.state.userSettings.navmenu.collapse
    }
  },

  methods: {
    setAsCurrent: function() {
      const company = this.$store.getters['companies/getCompanyByGuid'](this.guid)
      this.$store.dispatch('companies/setCurrentCompany', company)
      this.hideMenu()
      this.refreshCurrentPage()
    },
    refreshCurrentPage: function() {
      EventBus.$emit('workspace-changed')
    },
    toggleMenu() {
      if (this.$store.state.companies.navmenu.showCompanyMenu) {
        this.hideMenu()
      } else {
        this.showMenu()
      }
    },
    showMenu() {
      this.$store.commit('companies/SET_NAVMENU', {
        showCompanyMenu: true,
        companyGuid: this.guid
      })
    },
    hideMenu() {
      this.$store.commit('companies/SET_NAVMENU')
    }
  }
}
</script>

<style lang="scss" scoped>
.CompanyListItem {
  display: flex;
  flex-direction: column;

  .CompanyListItem__unit {
    padding: 3px;
    width: inherit;
    height: inherit;
    border-radius: inherit;

    &:hover {
      // background-color: #f8f8f8;
      background-color: #FECD34;
      color: white;
    }

    &.CompanyListItem__current {
      background-color: #FECD34;

      .CompanyListItem__items {
        color: white;
      }
    }

    .CompanyListItem__items {
      width: inherit;
      height: inherit;
      border-radius: inherit;
      display: flex;
      flex-direction: row;

      &:hover {
        color: white;
      }

      .CompanyListItem__items-title {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 122.5px;

        .CompanyListItem__items-title-name {
          margin: auto 0;
          font-weight: 500;
          width: inherit;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
        }
      }
    }
  }

  .CompanyListItem__settings-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 3px 0;

    .CompanyListItem__settings {
      padding: 5px;
      cursor: pointer;
      display: flex;

      &:hover {
        background-color: #f8f8f8;
        // background-color: #FECD34;
        // color: white;
      }

      .CompanyListItems__settings-icon {
        font-size: 20px;
        display: flex;
      }

      .CompanyListItems__settings-title {
        margin-left: 5px;
        line-height: 1.5;
        font-weight: 400;
      }
    }
  }
}
</style>
