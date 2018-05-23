<template>
  <div>
    <th-list @eventFetch="_fetchOrders"></th-list>
  </div>
</template>

<script>
import FormList from "@/components/Orders/FormList"

import EventBus from '@/utils/eventBus'
import { PAGE_SIZE, OFFSET } from "@/utils/defaultValues"

export default {
  components: {
    "th-list": FormList
  },

  data() {
    return {
      limit: PAGE_SIZE,
      offset: OFFSET
    }
  },

  mounted() {
    EventBus.$on('refresh-orders-page', () => {
      this._fetchOrders(this.limit, this.offset)
    })
  },

  async fetch({ store }) {
    await store.dispatch("orders/load");
  },

  methods: {
    _fetchOrders: function(limit = PAGE_SIZE, offset = OFFSET) {
      this.limit = limit
      this.offset = offset
      this.$store.dispatch("orders/load", { limit, offset });
    }
  }
};
</script>
