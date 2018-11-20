<template>
  <FormPattern>
    <FormElement/>
  </FormPattern>
</template>

<script>
import FormPattern from '@/components/Common/Pattern'
import FormElement from '@/components/RailwayAggregations/FormElement'

import EventBus from '@/utils/eventBus'

export default {
  components: {
    FormPattern,
    FormElement
  },

  fetch({ store, route }) {
    return store.dispatch("railwayAggregations/loadElement", route.params.guid)
  },

  mounted() {
    EventBus.$on("workspace-changed", () => {
      if (this.$route.params.guid) {
        this.$router.push("/workspace/railway-aggregations")
      }
    })
  }
}
</script>
