<template>
  <th-pattern>
    <th-list @eventFetch="_fetchRequests"></th-list>
  </th-pattern>
</template>

<script>
import Pattern from "@/components/Common/Pattern";
import FormList from "@/components/Requests/FormList";

import EventBus from "@/utils/eventBus";
import { PAGE_SIZE, OFFSET } from "@/utils/defaultValues";

export default {
  components: {
    "th-pattern": Pattern,
    "th-list": FormList
  },

  data() {
    return {
      limit: PAGE_SIZE,
      offset: OFFSET
    };
  },

  mounted() {
    EventBus.$on("workspace-changed", () => {
      this._fetchRequests(this.limit, this.offset);
    });
  },

  async fetch({ store }) {
    await store.dispatch("requests/load");
  },

  methods: {
    _fetchRequests: function(limit = PAGE_SIZE, offset = OFFSET) {
      this.limit = limit;
      this.offset = offset;
      this.$store.dispatch("requests/load", { limit, offset });
    }
  }
};
</script>
