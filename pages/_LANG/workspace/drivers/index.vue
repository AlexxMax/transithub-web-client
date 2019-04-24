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
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,this.$store.state.companies.currentCompany.guid
      );
    }
  },

  fetch({ store }) {
    return store.dispatch(
      `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
      store.state.companies.currentCompany.guid
    );
  }
};
</script>

