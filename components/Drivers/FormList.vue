<template>
  <div class="th-list-drivers">
    <th-common-list :count="count" @eventFetch="_fetch">
      <th-list :drivers="drivers"></th-list>
    </th-common-list>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List";
import List from "@/components/Drivers/List";

export default {
  components: {
    "th-common-list": CommonList,
    "th-list": List
  },

  computed: {
    drivers: function() {
      return this.$store.state.drivers.list;
    },
    count: function() {
      return this.$store.state.drivers.count;
    }
  },

  methods: {
    _fetch: function(limit, offset) {
      this.$emit("eventFetch", limit, offset);
    }
  }
};
</script>
