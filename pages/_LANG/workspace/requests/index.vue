<template>
  <th-pattern>
    <th-list @eventFetch="_fetch"></th-list>
  </th-pattern>
</template>

<script>
import Pattern from '@/components/Common/Pattern'
import FormList from '@/components/Requests/FormList'

import EventBus from "@/utils/eventBus"

export default {
  components: {
    "th-pattern": Pattern,
    "th-list": FormList
  },

  mounted() {
    EventBus.$on("workspace-changed", async () => {
      await this.$store.dispatch("requests/load")
    });
  },

  fetch({ store }) {
    return store.dispatch("requests/load")
  },

  methods: {
    async _fetch() {
      await this.$store.dispatch("requests/load")
    }
  }
}
</script>
