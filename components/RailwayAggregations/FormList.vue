<template>
  <div>
    <CommonList
      no-pagination
      show-load-more
      :loading="loading"
      :count="count"
      :loaded-count="loadedCount"
      :title="$t('lists.railwayAggregations')"
      store-module="railwayAggregations"
      :store-mutation="storeMutation"
      @eventFetch="fetch"
    >

      <Toolbar
        slot="toolbar"
        ref="toolbar"
        @onSearch="handleSearch">

        <ButtonsGroup slot="items">
          <FilterMenu
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            @close="closeToolbar"
          />

          <!-- <CompaniesFilter/> -->
        </ButtonsGroup>

        <ButtonsGroup>
          <ButtonTelegram style="margin-right: 10px"/>

          <Button
            type="primary"
            round
            @click="handleCreateRailwayAggregation">
            {{ $t('forms.railwayAggregator.createAggregation') }}
          </Button>
        </ButtonsGroup>

        <div slot="menu-items">
          <ButtonTelegram flat/>

          <Button
            flat
            type="primary"
            round
            @click="handleCreateRailwayAggregation">
            {{ $t('forms.railwayAggregator.createAggregation') }}
          </Button>

          <FilterMenu flat @close="closeToolbar"/>
        </div>

      </Toolbar>

      <el-tabs v-model="tab">
        <el-tab-pane
          :label="`${$t('forms.common.all')} (${loadedCountAll}/${countAll})`"
          :name="TABS.all"
        >
          <RailwayAggreagtionList
            :loading="loading"
            :list="list"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="`${$t('forms.common.my')} (${loadedCountByAuthor}/${countByAuthor})`"
          :name="TABS.my"
        >
          <RailwayAggreagtionList
            :loading="loadingByAuthor"
            :list="listByAuthor"
          />
        </el-tab-pane>
      </el-tabs>

    </CommonList>

    <RailwayAggregationEditForm
      ref="edit-form"
      creation
    />

    <InaccessibleFunctionality
      ref="inaccessible-functionality"
      :text="$t('forms.common.inaccessibleFunctionalityRailwayAggregationsCreateWithoutCompany')"
      no-login-btn
    >
      <Button
        class="FormList__inaccessible-functionality-btn"
        type="primary"
        round
        @click="handleCreateCompany"
      >
        {{ $t('links.navmenu.company.createNewCompany') }}
      </Button>
    </InaccessibleFunctionality>
  </div>
</template>

<script>
import CommonList from '@/components/Common/List'
import Toolbar from '@/components/Common/Lists/Toolbar'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import ListItem from '@/components/RailwayAggregations/ListItem'
import Button from '@/components/Common/Buttons/Button'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import RailwayAggregationEditForm from '@/components/RailwayAggregations/RailwayAggregationEditForm'
import FilterMenu from '@/components/RailwayAggregations/FilterMenu'
import InaccessibleFunctionality from '@/components/Common/InaccessibleFunctionality'
import ButtonTelegram from '@/components/Common/Buttons/ButtonTelegram'
// import CompaniesFilter from '@/components/Companies/CompaniesFilter'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import grouping from '@/mixins/listGrouping'

const RailwayAggreagtionList = {
  name: 'th-railway-aggregation-list',

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

const TABS = Object.freeze({
  all: 'all',
  my: 'my'
})

export default {
  name: 'th-railway-aggregations-list',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    CommonList,
    Toolbar,
    // ListWrapper,
    // ItemsWrapper,
    // ListItem,
    Button,
    ButtonTelegram,
    ButtonsGroup,
    RailwayAggregationEditForm,
    FilterMenu,
    InaccessibleFunctionality,
    // CompaniesFilter,
    RailwayAggreagtionList
  },

  props: {
    list: Array,
    listByAuthor: Array
  },

  data: () => ({
    tab: TABS.all
  }),

  computed: {
    loading() {
      return this.$store.state.railwayAggregations.loading
    },
    loadingByAuthor() {
      return this.$store.state.railwayAggregations.loadingByAuthor
    },
    countAll() {
      return this.$store.state.railwayAggregations.count
    },
    loadedCountAll() {
      return this.$store.state.railwayAggregations.list.length
    },
    countByAuthor() {
      return this.$store.state.railwayAggregations.countByAuthor
    },
    loadedCountByAuthor() {
      return this.$store.state.railwayAggregations.listByAuthor.length
    },
    count() {
      const { count, countByAuthor } = this.$store.state.railwayAggregations
      return this.tab === TABS.all ? count : countByAuthor
    },
    loadedCount() {
      const { list, listByAuthor } = this.$store.state.railwayAggregations
      return this.tab === TABS.all ? list.length : listByAuthor.length
    },
    userHasCompany() {
      return !!this.$store.state.companies.currentCompany.guid
    },
    filterAuthor: {
      get() {
        return this.$store.state.railwayAggregations.filters.set.author ? true : false
      },
      set(value) {
        // this.$store.commit('railwayAggregations/RESET')
        // this.$store.dispatch('railwayAggregations/setFilterAuthor', value ? this.$store.state.user.guid : null)
      }
    },
    storeMutation() {
      return this.tab === TABS.my ? 'SET_OFFSET_BY_AUTHOR' : 'SET_OFFSET'
    }
  },

  methods: {
    fetch() {
      this.$emit("eventFetch", this.tab === TABS.my)
    },
    handleCreateRailwayAggregation() {
      this.closeToolbar()
      if (this.userHasCompany) {
        this.$refs['edit-form'].show()
      } else {
        this.$refs['inaccessible-functionality'].show()
      }
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu()
    },
    handleSearch(value) {
      this.$store.dispatch('railwayAggregations/setSearch', value)
    },
    handleCreateCompany() {
      this.$store.dispatch('companies/showCreateNewDialog', true)
      this.$refs['inaccessible-functionality'].hide()
    },
    // handleTabClick({ name: tabName }) {
    //   if (this.tab === tabName) {
    //     return;
    //   }

    //   if (tabName === TABS.all) {
    //     this.filterAuthor = false
    //   } else if (tabName === TABS.my) {
    //     this.filterAuthor = true
    //   }
    // }
  },

  created() {
    this.TABS = TABS
  }
}
</script>

<style lang="scss" scoped>
.FormList__inaccessible-functionality-btn {
  margin-top: 30px;
}
</style>
