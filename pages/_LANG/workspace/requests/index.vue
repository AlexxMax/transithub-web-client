<template>
  <th-pattern>
    <th-list @eventFetch="_fetch"></th-list>
  </th-pattern>
</template>

<script>
import Pattern from "@/components/Common/Pattern";
import FormList from "@/components/Requests/FormList";

import EventBus from "@/utils/eventBus"

export default {
  components: {
    "th-pattern": Pattern,
    "th-list": FormList
  },

  mounted() {
    EventBus.$on("workspace-changed", async () => {
      await this._fetch()
    });
  },

  async created() {
    await this._fetch()
  },

  methods: {
    async _fetch() {
      const res = await this.$store.dispatch("requests/load")
      return res
    }
  }
};
</script>
