<template>
  <FormPattern>
    <FormElement></FormElement>
  </FormPattern>
</template>

<script>
import FormPattern from "@/components/Common/Pattern"
import FormElement from "@/components/Requests/FormElement"

import { STORE_MODULE_NAME } from '@/utils/requests'

export default {
  components: {
    FormPattern,
    FormElement
  },

  computed: {
    title () {
      const item = this.$store.state[STORE_MODULE_NAME].item
    	return this.$t('forms.request.title') + ': №' + item.number + ' - Transithub'
  	}
  },

  methods: {
    busListener() {
      this.$router.push(this.$i18n.path('workspace/requests'))
    }
  },

   head () {
    return {
      title: this.title
    }
  },

  async fetch({ store, route }) {
    await store.dispatch("railwayStations/loadCatalogStation")
    return await store.dispatch("requests/loadElement", route.params.guid)
  },

  beforeCreate() {
    if (!this.$store.state.requests.item.guid) {
      this.$nuxt.error({ statusCode: 404, message: this.$t('messages.noRequest') })
    }
  },

  mounted() {
    // Bus
    this.$bus.companies.currentCompanyChanged.on(this.busListener)
  },

  beforeDestroy() {
    // Bus
    this.$bus.companies.currentCompanyChanged.off(this.busListener)
  }
}
</script>
