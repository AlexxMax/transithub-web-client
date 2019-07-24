<template>
  <div id="RailwayAggregation">
    <FormElement demo/>
  </div>
</template>

<script>
import FormElement from '@/components/RailwayAggregations/FormElement'

import { STORE_MODULE_NAME } from '@/utils/railway-aggregations'

export default {
  layout: "public",

  components: {
    FormElement
  },

  computed: {
    title () {
      const item = this.$store.state[STORE_MODULE_NAME].item
    	return this.$t('forms.railwayAggregator.title') + ': №' + item.number + ' - Transithub'
  	}
  },

  head () {
    return {
      title: this.title
    }
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
