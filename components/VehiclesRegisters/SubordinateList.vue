<template>
  <div>
    <ListWrapper
      :loading="loading"
      :list-is-empty="subordinateList.length === 0"
      :empty-list-title="$t('lists.vehiclesRegisterEmptyList')"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane v-if="incomeList.length > 0" :label="$t('forms.common.incomes')" :name="TABS.INCOME">
          <ListItem
            v-for="r of incomeList"
            :key="r.guid"
            :row="r"
            :open="handleOpenItem"
            :outcome="r.outcome"
            show-less-info
            @create-race="handleCreateRace(r.guid)"
          />
        </el-tab-pane>

        <el-tab-pane v-if="outcomeList.length > 0" :label="$t('forms.common.outcomes')" :name="TABS.OUTCOME">
          <ListItem
            v-for="r of outcomeList"
            :key="r.guid"
            :row="r"
            :open="handleOpenItem"
            :outcome="r.outcome"
            show-less-info
            @create-race="handleCreateRace(r.guid)"
          />
        </el-tab-pane>
      </el-tabs>
    </ListWrapper>

    <FastView
      subordinate
      :visible="vehicleRegisterVisible"
      :guid="vehicleRegisterGuid"
      :request-guid="requestGuid"
      @close="handleFastViewClose"
    />

    <RaceCreateNewDialog
      :key="keyRaceCreateNewDialog"
      ref="create-new-race-dialog"
      :vehicle-register-guid="vehicleRegisterGuid"
      @close="keyRaceCreateNewDialog += 1"
    />

  </div>
</template>

<script>
import ListWrapper from "@/components/Common/Lists/ListWrapper"
import ListItem from "@/components/VehiclesRegisters/ListItem"
import FastView from "@/components/VehiclesRegisters/FastView"
import RaceCreateNewDialog from "@/components/Races/CreateNewDialog"

const TABS = Object.freeze({
  INCOME: 'income',
  OUTCOME: 'outcome'
})

export default {
  name: "th-vehicles-registers-subordinate-list",

  components: {
    ListWrapper,
    ListItem,
    FastView,
    RaceCreateNewDialog
  },

  props: {
    requestGuid: String,
    instantFillUp: Boolean
  },

  data() {
    return {
      fetched: false,
      vehicleRegisterVisible: false,
      vehicleRegisterGuid: null,
      activeTabProxy: TABS.INCOME,

      TABS,

      keyRaceCreateNewDialog: 1
    };
  },

  computed: {
    subordinateList() {
      return this.$store.getters["vehiclesRegisters/getSubordinateList"](
        this.requestGuid
      )
    },
    incomeList() {
      return this.subordinateList.filter(item => item.outcome === false)
    },
    outcomeList() {
      return this.subordinateList.filter(item => item.outcome === true)
    },
    loading() {
      return this.$store.state.vehiclesRegisters.subordinateListLoading;
    },
    activeTab: {
      get() {
        if (this.incomeList.length === 0) {
          return TABS.OUTCOME
        }
        return this.activeTabProxy
      },
      set(value) {
        this.activeTabProxy = value
      }
    }
  },

  methods: {
    handleCreateRace(guid) {
      this.vehicleRegisterGuid = guid
      this.$refs['create-new-race-dialog'].show()
    },

    async fetch() {
      await this.$store.dispatch(
        "vehiclesRegisters/fetchSubordinateList",
        this.requestGuid
      );
    },
    async fillUp() {
      if (!this.fetched) {
        await this.fetch();
        this.fetched = true;
      }
    },
    handleOpenItem(vehicleRegisterGuid) {
      this.vehicleRegisterGuid = vehicleRegisterGuid;
      this.vehicleRegisterVisible = true;
    },
    handleFastViewClose() {
      this.vehicleRegisterVisible = false;
      this.vehicleRegisterGuid = null;
    }
  },

  async created() {
    if (this.instantFillUp) {
      await this.fillUp();
    }
  }
};
</script>
