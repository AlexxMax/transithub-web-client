<template>
  <PagePattern>
    <FormList @eventFetch="_fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from '@/components/Common/Pattern'
import FormList from '@/components/Races/FormList'

import EventBus from "@/utils/eventBus"

export default {
  components: {
    PagePattern,
    FormList
  },

  methods: {
    async _fetch() {
      return await this.$store.dispatch("races/load")
    }
  },

  async created() {
    this.$store.commit('races/RESET')
    await this._fetch()
  },

  mounted() {
    EventBus.$on("workspace-changed", async () => {
      await this._fetch()
    });
  }
}
</script>
