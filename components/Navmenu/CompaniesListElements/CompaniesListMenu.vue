<template>
  <LeftView :show="show" @close="close">
    <div class="CompaniesListMenu">

      <div class="CompaniesListMenu__part">
        <span class="CompaniesListMenu__part-title">{{ $t('links.navmenu.company.currentCompany') }}</span>
        <i class="el-icon-close CompaniesListMenu__part-close" @click="close"></i>
      </div>

      <div class="CompaniesListMenu__body">

        <div class="CompaniesListMenu__body-company">
          <Avatar
            :name="company.name"
            :size="40"
            radius5px
            :style="{ 'width': '40px' }"/>

          <div>
            <div class="CompaniesListMenu__body-company-title">
              <span class="CompaniesListMenu__body-company-title-name">{{ company.name }}</span>
            </div>
          </div>
        </div>

        <div style="display: flex">
          <nuxt-link
            class="CompaniesListMenu__body-company-button"
            :to="$i18n.path('company/profile')">
            <Button type="primary">
              {{ $t('links.navmenu.company.editCompany') }}
            </Button>
          </nuxt-link>
        </div>

      </div>

      <div class="CompaniesListMenu__part" style="margin-top: 20px">
        <span class="CompaniesListMenu__part-title">{{ $t('links.navmenu.company.companiesList') }}</span>
      </div>

      <div class="CompaniesListMenu__body" style="margin-top: 10px">
        <div
          class="CompaniesListMenu__body-company CompaniesListMenu__Body-company-list-item"
          v-for="(c, index) of companies"
          :key="index"
          @click="setAsCurrent(c.guid)">
          <Avatar
            :name="c.name"
            :size="40"
            radius5px
            :style="{ 'width': '40px' }"/>

          <div>
            <div class="CompaniesListMenu__body-company-title">
              <span class="CompaniesListMenu__body-company-title-name">{{ c.name }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </LeftView>
</template>

<script>
import LeftView from '@/components/Common/LeftView'
import Avatar from '@/components/Common/Avatar'
import Button from '@/components/Common/Buttons/Button'

import EventBus from '@/utils/eventBus'

export default {
  name: 'th-companies-list-menu',

  components: {
    LeftView,
    Avatar,
    Button
  },

  computed: {
    show() {
      return this.$store.state.companies.navmenu.showCompaniesMenu
    },
    company() {
      return this.$store.getters['companies/getCurrentCompany']
    },
    companies() {
      return this.$store.state.companies.list.filter(item => item.guid !== this.company.guid)
    }
  },

  methods: {
    close() {
      this.$store.commit('companies/SET_NAVMENU')
    },
    setAsCurrent: function(guid) {
      const company = this.$store.getters['companies/getCompanyByGuid'](guid)
      this.$store.dispatch('companies/setCurrentCompany', company)
      this.refreshCurrentPage()
    },
    refreshCurrentPage: function() {
      EventBus.$emit('workspace-changed')
    },
  }
}
</script>

<style lang="scss" scoped>
.CompaniesListMenu {
  display: flex;
  flex-direction: column;
  color: #525252;

  .CompaniesListMenu__part {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #A3A2A2;

    .CompaniesListMenu__part-title {
      text-transform: uppercase;
      font-size: 11px;
      font-weight: 500;
    }

    .CompaniesListMenu__part-close {
      font-size: 16px;
    }
  }

  .CompaniesListMenu__body {
    margin-top: 20px;

    .CompaniesListMenu__body-company {
      display: flex;
      flex-direction: row;

      &.CompaniesListMenu__Body-company-list-item {
        margin: 10px 0;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: #f8f8f8;
        }

        .CompaniesListMenu__body-company-title {
           width: 180px;
        }
      }

      .CompaniesListMenu__body-company-title {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 210px;

        .CompaniesListMenu__body-company-title-name {
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

    .CompaniesListMenu__body-company-button {
      margin: 20px auto;
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
