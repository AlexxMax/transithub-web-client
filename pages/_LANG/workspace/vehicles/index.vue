<template>
  <div>
    <th-list @eventFetch="_fetchVehicles"></th-list>
  </div>
</template>

<script>
import Pattern from "@/components/Common/Pattern";
import FormList from "@/components/Vehicles/FormList";

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
    EventBus.$on("refresh-vehicles-page", () => {
      this._fetchVehicles(this.limit, this.offset);
    });
  },

  async fetch({ store }) {
    await store.dispatch("vehicles/load");
  },

  methods: {
    _fetchVehicles: function(limit = PAGE_SIZE, offset = OFFSET) {
      this.limit = limit;
      this.offset = offset;
      this.$store.dispatch("vehicles/load", { limit, offset });
    }
  }
};
</script>
