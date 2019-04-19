<template>
  <PagePattern>
    <DriversList :list="$store.state.drivers.list" @fetch="fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from "@/components/Common/Pattern";
import DriversList from "@/components/Drivers/DriversList";

import { STORE_MODULE_NAME, ACTIONS_KEYS } from "@/utils/drivers";

export default {
  components: {
    PagePattern,
    DriversList
  },

  methods: {
    async fetch() {
      await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
        "0a95881c-4d20-a70a-5bdf-e8f9dab133c9"
        // this.$store.state.companies.currentCompany.guid
      );
    }
  },

  fetch({ store }) {
    return store.dispatch(
      `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
      "0a95881c-4d20-a70a-5bdf-e8f9dab133c9"
      // store.state.companies.currentCompany.guid
    );
  }
};
</script>

