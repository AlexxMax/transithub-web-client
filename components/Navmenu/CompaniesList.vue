<template>
  <div class="CompaniesList">
    <div>
      <Item
        v-for="(c, index) of companies"
        :key="index"
        :guid="c.guid"
        :name="c.name"/>

      <Button
        v-if="showCompaniesList"
        :icon="companiesMenuIcon"
        :tooltip="$t('links.navmenu.company.companiesListTooltip')"
        @click="$store.commit('companies/SET_NAVMENU', { showCompaniesMenu: true })"/>
      <Button
        icon="plus"
        :tooltip="$t('links.navmenu.company.createNewCompanyTooltip')"
        @click="$store.dispatch('companies/showCreateNewDialog', true)"/>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Navmenu/CompaniesListElements/CompanyListItem'
import Button from '@/components/Navmenu/CompaniesListElements/CompanyListButton'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

export default {
  name: 'th-companies-list',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.element) ],

  components: {
    Item,
    Button
  },

  computed: {
    companies() {
      const currentCompany = this.$store.getters['companies/getCurrentCompany']
      let companies = []
      if (!this.$_smallDeviceMixin_isDeviceSmall) {
        companies = this.$store.state.companies.list.filter(item => item.guid !== currentCompany.guid).slice(0, 2)
      }

      if (currentCompany.guid) {
        companies.unshift(currentCompany)
      }
      return companies
    },
    showCompaniesList() {
      if (this.$_smallDeviceMixin_isDeviceSmall) {
        return this.$store.state.companies.list.length > 1
      } else {
        return this.$store.state.companies.list.length > 3
      }
    },
    companiesMenuIcon() {
      return this.$store.state.companies.navmenu.showCompaniesMenu ? 'angle-double-left' : 'angle-double-right'
    }
  }
}
</script>

<style lang="scss" scoped>
.CompaniesList {
  display: flex;
  flex-direction: row;
  color: #525252;
  margin-bottom: 30px;

  .CompaniesList__side-menu {
    width: 8px;
    margin: 5px -8px 0;
    border-radius: 5px 0 0 5px;

    &:hover {
      background-color: #f8f8f8;
    }

    .CompaniesList__side-menu-icon {
      position: relative;
      float: left;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
