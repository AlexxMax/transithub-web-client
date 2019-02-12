<template>
  <div>
    <CommonList
      :count="count"
      :title="$t('lists.railwayRequests')"
      store-module="railwayRequests"
      @eventFetch="fetch">

      <Toolbar
        slot="toolbar"
        ref="toolbar"
        @onSearch="handleSearch">

        <el-radio-group v-model="listType" size="small">
          <el-radio-button :label="LIST_TYPE.outcome">{{ $t('forms.common.propositionsOut') }}</el-radio-button>
          <el-radio-button :label="LIST_TYPE.income">{{ $t('forms.common.propositionsIn') }}</el-radio-button>
        </el-radio-group>

        <ButtonsGroup slot="items">
          <FilterMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
          />

          <CompaniesFilter v-if="listType === LIST_TYPE.outcome" @change="fetch"/>
        </ButtonsGroup>

        <div slot="menu-items">
          <FilterMenu flat @close="closeToolbar"/>
        </div>

      </Toolbar>

      <ListWrapper :loading="$store.state.railwayRequests.loading">
        <ItemsWrapper no-header>

          <ListItem
            v-for="ra of list"
            :key="ra.guid"
            :row="ra"/>

        </ItemsWrapper>
      </ListWrapper>

    </CommonList>
  </div>
</template>

<script>
import CommonList from '@/components/Common/List'
import Toolbar from '@/components/Common/Lists/Toolbar'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import ListItem from '@/components/RailwayRequests/ListItem'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import FilterMenu from '@/components/RailwayRequests/FilterMenu'
import CompaniesFilter from '@/components/Companies/CompaniesFilter'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'

const LIST_TYPE = {
  income: 1,
  outcome: 0
}

export default {
  name: 'th-railway-requests-list',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    CommonList,
    Toolbar,
    ListWrapper,
    ItemsWrapper,
    ListItem,
    ButtonsGroup,
    FilterMenu,
    CompaniesFilter
  },

  props: {
    list: Array,
  },

  computed: {
    count() {
      return this.$store.state.railwayRequests.count
    },
    userHasCompany() {
      return !!this.$store.state.companies.currentCompany.guid
    },
    listType: {
      get() {
        return this.$store.state.railwayRequests.filters.set.income || LIST_TYPE.outcome
      },
      set(value) {
        this.handleInputOutputChange(value)
      }
    }
  },

  methods: {
    fetch() {
      this.$emit("eventFetch")
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu()
    },
    handleSearch(value) {
      this.$store.dispatch('railwayRequests/setSearch', value)
    },
    handleInputOutputChange(value) {
      this.$store.dispatch('railwayRequests/setFilterIncome', value)
    }
  },

  created() {
    this.LIST_TYPE = LIST_TYPE
  }
}
</script>

<style lang="scss" scoped>
// .FormList__inaccessible-functionality-btn {
//   margin-top: 30px;
// }
</style>
