<template>
  <div>
    <th-list @eventFetch="_fetchDrives"></th-list>
  </div>
</template>

<script>
import FormList from "@/components/Vehicles/FormList";

export default {
  components: {
    "th-list": FormList
  },

  async fetch({ store }) {
    await store.dispatch("vehicles/load");
  },

  methods: {
    _fetchDrives: function(limit = 100, offset = 0) {
      this.$store.dispatch("vehicles/load", { limit, offset });
    }
  }
};
</script>