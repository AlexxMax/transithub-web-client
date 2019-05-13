<template>
  <FormPattern>
    <DriverForm/>
  </FormPattern>
</template>

<script>
import DriverForm from "@/components/Drivers/DriverForm";
import FormPattern from '@/components/Common/Pattern'

import { STORE_MODULE_NAME, ACTIONS_KEYS } from "@/utils/drivers";

export default {
  components: {
    DriverForm,
    FormPattern
  },

  methods: {
    busListener() {
      this.$router.push(this.$i18n.path('workspace/drivers'))
    }
  },

  fetch({ store, route }) {
    return store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, {
      companyGuid: store.state.companies.currentCompany.guid,
      driverGuid: route.params.guid
    });
  },

  beforeCreate() {
    if (!this.$store.state.drivers.item.guid) {
      this.$nuxt.error({
        statusCode: 404,
        message: this.$t("messages.noDriver")
      });
    }
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
