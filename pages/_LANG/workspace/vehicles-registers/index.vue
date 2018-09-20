<template>
  <PagePattern>
    <FormList @eventFetch="_fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from "@/components/Common/Pattern"
import FormList from "@/components/VehiclesRegisters/FormList"

import EventBus from "@/utils/eventBus"

export default {
  components: {
    PagePattern,
    FormList
  },

  mounted() {
    EventBus.$on("workspace-changed", async () => {
      await this._fetch()
    });
  },

  async created() {
    this.$store.commit('vehiclesRegisters/RESET')
    await this._fetch()
  },

  methods: {
    async _fetch() {
      return await this.$store.dispatch("vehiclesRegisters/load")
    }
  }
};
</script>
