<template>
  <FormPattern>
    <FormElement/>
  </FormPattern>
</template>

<script>
import FormPattern from '@/components/Common/Pattern'
import FormElement from '@/components/RailwayAggregations/FormElement'

export default {
  components: {
    FormPattern,
    FormElement
  },

  fetch({ store, route }) {
    return store.dispatch("railwayAggregations/loadElement", route.params.guid)
  },

  beforeCreate() {
    if (!this.$store.state.railwayAggregations.item.guid) {
      this.$nuxt.error({ statusCode: 404, message: this.$t('messages.noRailwayAggregation') })
    }
  }
}
</script>
