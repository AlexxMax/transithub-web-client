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

      <el-tabs v-model="listType">
        <el-tab-pane :label="$t('forms.common.propositionsOut')" :name="LIST_TYPE.outcome">
          <RailwayRequestsList
            :loading="$store.state.railwayRequests.loading"
            :list="list"
          />
        </el-tab-pane>

        <el-tab-pane :label="$t('forms.common.propositionsIn')" :name="LIST_TYPE.income">
          <RailwayRequestsList
            :loading="$store.state.railwayRequests.loading"
            :list="list"
          />
        </el-tab-pane>
      </el-tabs>

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

const RailwayRequestsList = {
  name: 'th-railway-requests-list',

  components: {
    ListWrapper,
    ItemsWrapper,
    ListItem
  },

  props: {
    list: {
      type: Array,
      default: []
    },
    loading: Boolean
  },

  render(h) {
    return h(ListWrapper,
      { props: { loading: this.loading } }, [
      h(ItemsWrapper,
        { props: { noHeader: true, withTabs: true } },
        this.list.map(function(item) {
          return h(ListItem, { key: item.guid, props: { row: item } })
        })
      )
    ])
  }
}

const LIST_TYPE = Object.freeze({
  income: 'in',
  outcome: 'out'
})

export default {
  name: 'th-railway-requests-list',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    CommonList,
    Toolbar,
    ButtonsGroup,
    FilterMenu,
    CompaniesFilter,
    RailwayRequestsList
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
        return this.$store.state.railwayRequests.filters.set.income === 0
          ? LIST_TYPE.outcome
          : LIST_TYPE.income
      },
      set(value) {
        this.$store.dispatch('railwayRequests/setFilterIncome', value === LIST_TYPE.outcome ? 0 : 1)
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
