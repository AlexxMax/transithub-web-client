<template>
  <div class="th-list-orders">
    <th-common-list :count="count" @eventFetch="_fetch">
      <th-list :orders="orders"></th-list>
    </th-common-list>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List";
import List from "@/components/Orders/List";

export default {
  components: {
    "th-common-list": CommonList,
    "th-list": List
  },

  computed: {
    orders: function() {
      return this.$store.state.orders.list;
    },
    count: function() {
      return this.$store.state.orders.count;
    }
  },

  methods: {
    _fetch: function(limit, offset) {
      this.$emit("eventFetch", limit, offset);
    }
  }
};
</script>
