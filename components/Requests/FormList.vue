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
      @eventFetch="_fetch"
    >
      <ToolbarRight class="RequestsFormList__toolbar-right" slot="toolbar" ref="toolbar">
        <div slot="items">
          <ButtonsGroup>
            <!-- <CompaniesFilter class="RequestsFormList__companies-filter" @change="_fetch"/> -->
            <FilterMenu v-if="!$_smallDeviceMixin_isDeviceSmall" @close="closeToolbar"/>
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

      <!-- <ListWrapper :loading="$store.state.requests.loading">
        <ItemsWrapper no-header>
          <div v-if="grouped">
            <ListItemGroupe
              v-for="(r, index) of groupedList"
              :ref="`g-${index}`"
              :key="r.group"
              :title="r.group"
              :value="r.group"
              :count="r.items.length"
            >
              <ListItem
                v-for="vr of r.items"
                :key="vr.guid"
                :row="vr"
                @open-vehicle-register-generation-form="showVehicleRegisterGenerationForm"
              />
            </ListItemGroupe>
          </div>

          <div v-else>
            <ListItem
              v-for="vr of list"
              :key="vr.guid"
              :row="vr"
              @open-vehicle-register-generation-form="showVehicleRegisterGenerationForm"
            />
          </div>
        </ItemsWrapper>
      </ListWrapper> -->

      <el-tabs v-model="listType">
        <el-tab-pane
          :label="`${$t('forms.common.listNew')} ${countListNew}/${loadedListNew}`"
          :name="LIST_TYPE.NEW"
        >
          <RequestsList
            :loading="$store.state.requests.loading"
            :list="listNew"
            @open-vehicle-register-generation-form="showVehicleRegisterGenerationForm"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="`${$t('forms.common.listInWork')} ${countListInWork}/${loadedListInWork}`"
          :name="LIST_TYPE.IN_WORK"
        >
          <RequestsList
            :loading="$store.state.requests.loading"
            :list="listInWork"
            @open-vehicle-register-generation-form="showVehicleRegisterGenerationForm"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="`${$t('forms.common.listArchived')} ${countListArchived}/${loadedListArchived}`"
          :name="LIST_TYPE.ARCHIVED"
        >
          <RequestsList
            :loading="$store.state.requests.loading"
            :list="listArchived"
            @open-vehicle-register-generation-form="showVehicleRegisterGenerationForm"
          />
        </el-tab-pane>
      </el-tabs>
    </CommonList>

    <VehiclesRegistersGenerationForm
      ref="vehicles-registers-generation-form"
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
    },
    loading: Boolean
  },

  methods: {
    openVehicleRegister(request) {
      this.$emit('open-vehicle-register-generation-form', request)
    }
  },

  render(h) {
    const self = this
    return h(ListWrapper, { props: { loading: this.loading } }, [
      h(
        ItemsWrapper,
        { props: { noHeader: true, withTabs: true } },
        this.list.map(function(item) {
          return h(
            ListItem,
            {
              key: item.guid,
              props: { row: item },
              on: {
                'open-vehicle-register-generation-form': self.openVehicleRegister
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

  mixins: [screen(SCREEN_TRIGGER_SIZES.list), grouping],

  components: {
    CommonList,
    ToolbarRight,
    ButtonsGroup,
    FilterMenu,
    // GroupsMenu,
    // SortingMenu,
    VehiclesRegistersGenerationForm,
    // CompaniesFilter,
    RequestsList
  },

  props: {
    list: Array,
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
    loading() {
      return this.$store.state.requests.loading;
    },
    listNew() {
      return this.list.filter(item => item.userStatus === USER_STATUSES.NEW)
    },
    listInWork() {
      return this.list.filter(item => item.userStatus === USER_STATUSES.IN_WORK)
    },
    listArchived() {
      return this.list.filter(item => item.userStatus === USER_STATUSES.ARCHIVED)
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
    }
  }
};
</script>

<style lang="scss" scoped>
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
  margin-bottom: 40px;
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

