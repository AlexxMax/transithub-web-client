<template>
  <div>
    <th-list @eventFetch="_fetchDrives"></th-list>
  </div>
</template>

<script>
import Pattern from "@/components/Common/Pattern";
import FormList from "@/components/Drivers/FormList";

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
    EventBus.$on("refresh-drivers-page", () => {
      this._fetchDrives(this.limit, this.offset);
    });
  },

  async fetch({ store }) {
    await store.dispatch("drivers/load");
  },

  methods: {
    _fetchDrives: function(limit = PAGE_SIZE, offset = OFFSET) {
      this.limit = limit;
      this.offset = offset;
      this.$store.dispatch("drivers/load", { limit, offset });
    }
  }
};
</script>
