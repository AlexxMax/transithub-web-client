<template>
  <div class="th-list-requests">
    <CommonList
      :count="count"
      :title="$t('lists.requests')"
      store-module="requests"
      @eventFetch="_fetch">
      <th-list :requests="requests"></th-list>
      <th-toolbar slot="toolbar"/>
    </CommonList>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List"
import List from "@/components/Requests/List"
import Toolbar from '@/components/Requests/ListToolbar'

export default {
  components: {
    CommonList,
    "th-list": List,
    'th-toolbar': Toolbar
  },

  computed: {
    requests: function() {
      return this.$store.state.requests.list.slice()
    },
    count: function() {
      return this.$store.state.requests.count
    }
  },

  methods: {
    _fetch: function() {
      this.$emit("eventFetch")
    }
  }
};
</script>
