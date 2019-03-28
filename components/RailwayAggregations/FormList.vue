<template>
  <div>
    <CommonList
      no-pagination
      :show-load-more="display === DISPLAYS.list"
      :loading="loading"
      :count="count"
      :loaded-count="loadedCount"
      :title="$t('lists.railwayAggregations')"
      store-module="railwayAggregations"
      :store-mutation="storeMutation"
      :offset-name="offsetName"
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

          <Button
            v-if="!$_smallDeviceMixin_isDeviceSmall"
            class="RailwayAggregationsFormList__toolbar-display"
            round
            plain
            icon-only
            :fa-icon="display === DISPLAYS.map ? 'list' : 'map-marked-alt'"
            :type="null"
            @click="handleDisplayChangeButton"
          >
            {{ display === DISPLAYS.map ? $t('forms.common.list') : $t('forms.common.map') }}
          </Button>

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

      <FastFilters/>

      <RailwayAggreagtionListAll
        v-if="display === DISPLAYS.list"
        :tab="tab"
        :list="list"
        :listByAuthor="listByAuthor"
        @tab-change="handleListTabChange"
      />
      <RailwayAggreagtionListMap v-else-if="display === DISPLAYS.map"/>

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
import Button from '@/components/Common/Buttons/Button'
import ButtonsGroup from '@/components/Common/Buttons/ButtonsGroup'
import RailwayAggregationEditForm from '@/components/RailwayAggregations/RailwayAggregationEditForm'
import FilterMenu from '@/components/RailwayAggregations/FilterMenu'
import InaccessibleFunctionality from '@/components/Common/InaccessibleFunctionality'
import ButtonTelegram from '@/components/Common/Buttons/ButtonTelegram'
import RailwayAggreagtionListAll from '@/components/RailwayAggregations/RailwayAggregationsList/RailwayAggregationsListAll'
import RailwayAggreagtionListMap from '@/components/RailwayAggregations/RailwayAggregationsList/RailwayAggregationsListMap'
import FastFilters from '@/components/RailwayAggregations/FastFilters'
// import CompaniesFilter from '@/components/Companies/CompaniesFilter'

import { SCREEN_TRIGGER_SIZES, screen } from '@/mixins/smallDevice'
import { LIST_TABS } from '@/utils/railway-aggregations'

const DISPLAYS = Object.freeze({
  list: 'list',
  map: 'map'
})

export default {
  name: 'th-railway-aggregations-list',

  mixins: [ screen(SCREEN_TRIGGER_SIZES.list) ],

  components: {
    CommonList,
    Toolbar,
    Button,
    ButtonTelegram,
    ButtonsGroup,
    RailwayAggregationEditForm,
    FilterMenu,
    InaccessibleFunctionality,
    // CompaniesFilter,
    RailwayAggreagtionListAll,
    RailwayAggreagtionListMap,
    FastFilters
  },

  props: {
    list: Array,
    listByAuthor: Array
  },

  data: () => ({
    display: DISPLAYS.list,
    tab: LIST_TABS.all,

    DISPLAYS: DISPLAYS,
    LIST_TABS: LIST_TABS
  }),

  computed: {
    loading() {
      return this.$store.state.railwayAggregations.loading
    },
    count() {
      const { count, countByAuthor } = this.$store.state.railwayAggregations
      return this.tab === LIST_TABS.all ? count : countByAuthor
    },
    loadedCount() {
      const { list, listByAuthor } = this.$store.state.railwayAggregations
      return this.tab === LIST_TABS.all ? list.length : listByAuthor.length
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
      return this.tab === LIST_TABS.my ? 'SET_OFFSET_BY_AUTHOR' : 'SET_OFFSET'
    },
    offsetName() {
      return this.tab === LIST_TABS.my ? 'offsetByAuthor' : 'offset'
    }
  },

  methods: {
    fetch() {
      console.log(this.tab);
      this.$emit("eventFetch", this.tab === LIST_TABS.my)
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

    //   if (tabName === LIST_TABS.all) {
    //     this.filterAuthor = false
    //   } else if (tabName === LIST_TABS.my) {
    //     this.filterAuthor = true
    //   }
    // },
    handleDisplayChangeButton() {
      this.display = this.display === DISPLAYS.list ? DISPLAYS.map : DISPLAYS.list
    },
    handleListTabChange(currentTab) {
      this.tab = currentTab
    }
  },

  created() {
    this.LIST_TABS = LIST_TABS
  }
}
</script>

<style lang="scss" scoped>
.FormList__inaccessible-functionality-btn {
  margin-top: 30px;
}

.RailwayAggregationsFormList__toolbar-display {
  margin-left: 5px;
}
</style>
