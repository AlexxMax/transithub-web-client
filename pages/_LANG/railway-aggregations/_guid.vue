<template>
  <div id="RailwayAggregation">
    <FormElement demo/>
  </div>
</template>

<script>
import FormElement from '@/components/RailwayAggregations/FormElement'

export default {
  layout: "public",

  components: {
    FormElement
  },

  fetch({ store, route }) {
    return store.dispatch("railwayAggregations/loadElement", route.params.guid)
  }
}
</script>

<style lang="scss" scoped>
#RailwayAggregation {
  margin-top: 70px;
  padding: 30px 20px;
  background-color: #FAFAFA;
}
</style>
