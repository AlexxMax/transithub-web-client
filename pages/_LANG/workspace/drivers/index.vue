<template>
  <div>
    <th-list @eventFetch="_fetchDrives"></th-list>
  </div>
</template>

<script>
import FormList from "@/components/Drivers/FormList";

export default {
  components: {
    "th-list": FormList
  },

  async fetch({ store }) {
    await store.dispatch('drivers/load')
  },

  methods: {
    _fetchDrives: function(limit = 100, offset = 0) {
      this.$store.dispatch('drivers/load', { limit, offset })
    }
  }
};
</script>
