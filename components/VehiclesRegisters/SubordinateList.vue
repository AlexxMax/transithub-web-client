<template>
  <div>
    <ListWrapper
      :loading="loading"
      :list-is-empty="list.length === 0"
      :empty-list-title="$t('lists.vehiclesRegisterEmptyList')"
    >
      <ListItem
        v-for="r of list"
        :key="r.guid"
        :row="r"
        :open="handleOpenItem"
        show-less-info
      />
    </ListWrapper>

    <FastView
      subordinate
      :visible="vehicleRegisterVisible"
      :guid="vehicleRegisterGuid"
      :request-guid="requestGuid"
      @close="handleFastViewClose"
    />
  </div>
</template>

<script>
import ListWrapper from "@/components/Common/Lists/ListWrapper";
import ListItem from "@/components/VehiclesRegisters/ListItem";
import FastView from "@/components/VehiclesRegisters/FastView";

export default {
  name: "th-vehicles-registers-subordinate-list",

  components: {
    ListWrapper,
    ListItem,
    FastView
  },

  props: {
    requestGuid: String,
    instantFillUp: Boolean
  },

  data() {
    return {
      fetched: false,
      vehicleRegisterVisible: false,
      vehicleRegisterGuid: null
    };
  },

  computed: {
    list() {
      return this.$store.getters['vehiclesRegisters/getSubordinateList'](this.requestGuid)
    },
    loading() {
      return this.$store.state.vehiclesRegisters.subordinateListLoading
    }
  },

  methods: {
    async fetch() {
      await this.$store.dispatch('vehiclesRegisters/fetchSubordinateList', this.requestGuid)
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
