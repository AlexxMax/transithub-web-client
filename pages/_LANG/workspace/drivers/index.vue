<template>
  <PagePattern>
    <DriversList :list="$store.state.drivers.list" @fetch="fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from "@/components/Common/Pattern";
import DriversList from "@/components/Drivers/DriversList";

import { STORE_MODULE_NAME, ACTIONS_KEYS, MUTATIONS_KEYS } from "@/utils/drivers";

export default {
  components: {
    PagePattern,
    DriversList
  },

  methods: {
    async fetch() {
      await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
        this.$store.state.companies.currentCompany.guid
      );
    },

    async busListener() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_OFFSET}`, 0)
      await this.fetch()
    }
  },

  fetch({ store }) {
    return store.dispatch(
      `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
      store.state.companies.currentCompany.guid
    );
  },

  mounted() {
    // Bus
    this.$bus.companies.currentCompanyChanged.on(this.busListener)
  },

  beforeDestroy() {
    // Bus
    this.$bus.companies.currentCompanyChanged.off(this.busListener)
  }
};
</script>

