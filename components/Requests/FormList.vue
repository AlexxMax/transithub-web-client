<template>
  <div class="th-list-requests">
    <th-common-list :count="count" @eventFetch="_fetch">
      <th-list :requests="requests"></th-list>
    </th-common-list>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List";
import List from "@/components/Requests/List";

export default {
  components: {
    "th-common-list": CommonList,
    "th-list": List
  },

  computed: {
    requests: function() {
      return this.$store.state.requests.list;
    },
    count: function() {
      return this.$store.state.requests.count;
    }
  },

  methods: {
    _fetch: function(limit, offset) {
      this.$emit("eventFetch", limit, offset);
    }
  }
};
</script>
