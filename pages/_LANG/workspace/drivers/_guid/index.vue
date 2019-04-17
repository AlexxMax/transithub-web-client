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

  fetch({ store, route }) {
    return store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, {
      companyGuid: "0a95881c-4d20-a70a-5bdf-e8f9dab133c9",
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
  }
};
</script>
