<template>
  <div class="th-list-requests">
    <h3 class="RequestsFormList__title">{{ $t('lists.requests') }}</h3>

    <CommonList
      no-pagination
      show-load-more
      :loading="loading"
      :count="count"
      :loaded-count="loadedCount"
      store-module="requests"
      :store-mutation="storeMutation"
      :offset-name="offsetName"
      @eventFetch="_fetch"
    >
      <ToolbarRight
        class="RequestsFormList__toolbar-right"
        slot="toolbar"
        ref="toolbar"
      >
        <div slot="items">
          <ButtonsGroup>
            <!-- <CompaniesFilter class="RequestsFormList__companies-filter" @change="_fetch"/> -->
            <FilterMenu
              class="RequestsFormList__filter-float"
              @close="closeToolbar"
              style="margin-left: 7px;"
            />

            <!-- <GroupsMenu
              v-if="!$_smallDeviceMixin_isDeviceSmall"
              @close="closeToolbar"
              @grouping="type => $_listGrouping_handleGrouping(type, groupedList)"
            /> -->
            <!-- <SortingMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/> -->
          </ButtonsGroup>
        </div>

        <div slot="menu-items">
          <FilterMenu flat @close="closeToolbar"/>
          <!-- <GroupsMenu flat @close="closeToolbar"/> -->
          <!-- <SortingMenu flat @close="closeToolbar"/> -->
        </div>
      </ToolbarRight>

      <SimpleFilters/>

      <FastFilters/>

      <div class="th-list-requests__content">
        <el-tabs class="th-list-requests__tabs" v-model="listType">
          <el-tab-pane
            :label="`${$t('forms.common.listNew')} ${loadedListNew}/${countListNew}`"
            :name="LIST_TYPE.NEW"
          >
            <RequestsList
              :loading="loadingNew"
              :list="listNew"
              @open-vehicle-register-generation-form="showVehicleRegisterGenerationForm"
              @open-races-form="showRacesForm"
            />
          </el-tab-pane>

          <el-tab-pane
            :label="`${$t('forms.common.listInWork')} ${loadedListInWork}/${countListInWork}`"
            :name="LIST_TYPE.IN_WORK"
          >
            <RequestsList
              :loading="loadingInWork"
              :list="listInWork"
              @open-vehicle-register-generation-form="showVehicleRegisterGenerationForm"
              @open-races-form="showRacesForm"
            />
          </el-tab-pane>

          <el-tab-pane
            :label="`${$t('forms.common.listArchived')} ${loadedListArchived}/${countListArchived}`"
            :name="LIST_TYPE.ARCHIVED"
          >
            <RequestsList
              v-loading="loadingArchived"
              :list="listArchived"
              @open-vehicle-register-generation-form="showVehicleRegisterGenerationForm"
              @open-races-form="showRacesForm"
            />
          </el-tab-pane>
        </el-tabs>

        <!-- <div class="th-list-requests__sidebar">

          <FilterMenu
            :isShow="!$_smallDeviceMixin_isDeviceSmall"
            :floating="false"
            @close="closeToolbar"
            style="margin-left: 7px;"
          />

        </div> -->
    </div>

    </CommonList>

    <VehiclesRegistersGenerationForm
      ref="vehicles-registers-generation-form"
      :request="currentRequest"
    />

    <RacesRightView
      ref="races-form"
      :request="currentRequest"
    />
  </div>
</template>

<script>
import CommonList from "@/components/Common/List";
import ToolbarRight from "@/components/Common/Lists/ToolbarRight";
import ListWrapper from "@/components/Common/Lists/ListWrapper";
import ItemsWrapper from "@/components/Common/Lists/ItemsWrapper";
import ListItemGroupe from "@/components/Common/Lists/ItemGroupe";
import ListItem from "@/components/Requests/ListItem";
import ButtonsGroup from "@/components/Common/Buttons/ButtonsGroup";
import FilterMenu from "@/components/Requests/FilterMenu";
// import GroupsMenu from "@/components/Requests/GroupsMenu";
// import SortingMenu from "@/components/Requests/SortingMenu";
import VehiclesRegistersGenerationForm from '@/components/VehiclesRegisters/VehiclesRegistersGeneration/VehiclesRegistersGenerationForm'
import FastFilters from '@/components/Requests/FastFilters'
import SimpleFilters from '@/components/Requests/SimpleFilters'
import RacesRightView from '@/components/Races/RacesRightViewList/RacesRightView'
// import CompaniesFilter from "@/components/Companies/CompaniesFilter";

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice";
import grouping from "@/mixins/listGrouping";
import { USER_STATUSES } from "@/utils/requests";

const RequestsList = {
  name: 'th-requests-list',

  components: {
    ListWrapper,
    ItemsWrapper,
    ListItem
  },

  props: {
    list: {
      type: Array,
      default: []
    }
  },

  methods: {
    openVehicleRegister(request) {
      this.$emit('open-vehicle-register-generation-form', request)
    },
    openRaces(request) {
      this.$emit('open-races-form', request)
    }
  },

  render(h) {
    const self = this
    return h(
      ListWrapper,
      { props: {
        loading: self.loading,
        listIsEmpty: self.list.length === 0,
        emptyListTitle: self.$t('lists.requestsEmptyList')
      } },
      [h(
        ItemsWrapper,
        { props: { noHeader: true, withTabs: true } },
        self.list.map(function(item) {
          return h(
            ListItem,
            {
              key: item.guid,
              props: { row: item },
              on: {
                'open-vehicle-register-generation-form': self.openVehicleRegister,
                'open-races-form': self.openRaces
              }
            },
          );
        })
      )
    ]);
  }
}

const LIST_TYPE = Object.freeze({
  NEW: 'new',
  IN_WORK: 'inWork',
  ARCHIVED: 'archived'
})

export default {
  name: "th-requests-list",

  mixins: [screen(SCREEN_TRIGGER_SIZES.element), grouping],

  components: {
    CommonList,
    ToolbarRight,
    ButtonsGroup,
    FilterMenu,
    // GroupsMenu,
    // SortingMenu,
    VehiclesRegistersGenerationForm,
    // CompaniesFilter,
    RequestsList,
    FastFilters,
    SimpleFilters,
    RacesRightView
  },

  props: {
    listNew: Array,
    listInWork: Array,
    listArchived: Array,
    groupedList: Array,
    grouped: Boolean
  },

  data: () => ({
    currentRequest: {},

    listType: LIST_TYPE.NEW,
    LIST_TYPE,
    USER_STATUSES
  }),

  computed: {
    storeMutation() {
      let mutation = 'SET_OFFSET'
      if (this.listType === LIST_TYPE.IN_WORK) {
        mutation = 'SET_OFFSET_IN_WORK'
      } else if (this.listType === LIST_TYPE.ARCHIVED) {
        mutation = 'SET_OFFSET_ARCHIVED'
      }
      return mutation
    },
    offsetName() {
      let offset = 'offset'
      if (this.listType === LIST_TYPE.IN_WORK) {
        offset = 'offsetInWork'
      } else if (this.listType === LIST_TYPE.ARCHIVED) {
        offset = 'offsetArchived'
      }
      return offset
    },
    loadingNew() {
      return this.$store.state.requests.loading
    },
    loadingInWork() {
      return this.$store.state.requests.loadingInWork
    },
    loadingArchived() {
      return this.$store.state.requests.loadingArchived
    },
    loading() {
      return this.loadingNew || this.loadingInWork || this.loadingArchived
    },
    countListNew() {
      return this.$store.state.requests.count.new
    },
    countListInWork() {
      return this.$store.state.requests.count.inWork
    },
    countListArchived() {
      return this.$store.state.requests.count.archived
    },
    count() {
      let count = this.countListNew
      if (this.listType === LIST_TYPE.IN_WORK) {
        count = this.countListInWork
      } else if (this.listType === LIST_TYPE.ARCHIVED) {
        count = this.countListArchived
      }
      return count
    },
    loadedListNew() {
      return this.listNew.length
    },
    loadedListInWork() {
      return this.listInWork.length
    },
    loadedListArchived() {
      return this.listArchived.length
    },
    loadedCount() {
      let loadedCount = this.loadedListNew
      if (this.listType === LIST_TYPE.IN_WORK) {
        loadedCount = this.loadedListInWork
      } else if (this.listType === LIST_TYPE.ARCHIVED) {
        loadedCount = this.loadedListArchived
      }
      return loadedCount
    }
  },

  methods: {
    _fetch: function() {
      let userStatus = USER_STATUSES.NEW
      if (this.listType === LIST_TYPE.IN_WORK) {
        userStatus = USER_STATUSES.IN_WORK
      } else if (this.listType === LIST_TYPE.ARCHIVED) {
        userStatus = USER_STATUSES.ARCHIVED
      }
      this.$emit('eventFetch', userStatus)
    },
    closeToolbar() {
      this.$refs.toolbar.closeMenu();
    },
    showVehicleRegisterGenerationForm(request) {
      this.currentRequest = request
      this.$refs['vehicles-registers-generation-form'].show()
    },
    showRacesForm(request) {
      this.currentRequest = request
      this.$refs['races-form'].show()
    }
  }
};
</script>

<style lang="scss" scoped>
.th-list-requests {

  &__content {
    display: flex;
  }

  &__tabs {
    width: 100%;
  }

  &__sidebar {
    width: 300px;
    @media (max-width: 1199px) {
      display: none;
    }
  }
}

.RequestsFormList__title {
  display: flex;
  font-size: 18px;
  font-weight: 500;
  color: #606266;
  position: absolute;
  margin: 5px 7px;
}

.RequestsFormList__toolbar-right {
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  margin-bottom: 0;
}

.RequestsFormList__toolbar-display {
  margin-left: 5px;
}

@media (max-width: 880px) {
  .RequestsFormList__toolbar-display {
    margin: 12px 0;
  }

  .RequestsFormList__title {
    width: 104%;
    display: flex;
    margin: -35px;
    justify-content: center;
    align-items: center;
  }

  .RequestsFormList__toolbar-right {
    margin-top: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
}

@media (max-width: 770px) {
  .RequestsFormList__toolbar-right {
    display: flex;
    margin-left: -8px;
  }

  .RequestsFormList__companies-filter {
    display: flex;
    height: 10px;
    position: relative;
  }
}

@media (max-width: 600px) {
  .RequestsFormList__toolbar-right {
    display: block;
    width: 100%;
    margin-left: -7px;
  }

  .RequestsFormList__companies-filter {
    display: flex;
    width: 100%;
    position: relative;
    justify-content: center;
    margin: 10px 0 8px 40px;
  }

  .RailwayAggregationsFormList__button-support-telegram {
    display: none;
  }
}

@media (max-width: 450px) {
  .RequestsFormList__title {
    width: 107%;
  }

  .RequestsFormList__companies-filter {
    display: flex;
    width: 100%;
    position: relative;
    margin-right: -10px;
  }
}
</style>
