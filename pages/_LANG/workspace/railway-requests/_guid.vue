<template>
  <FormPattern>
    <FormElement/>
  </FormPattern>
</template>

<script>
import FormPattern from '@/components/Common/Pattern'
import FormElement from '@/components/RailwayRequests/FormElement'

export default {
  components: {
    FormPattern,
    FormElement
  },

  methods: {
    busListener() {
      this.$router.push(this.$i18n.path('workspace/railway-requests'))
    }
  },

  fetch({ store, route }) {
    return store.dispatch("railwayRequests/loadElement", route.params.guid)
  },

  beforeCreate() {
    if (!this.$store.state.railwayRequests.item.guid) {
      this.$nuxt.error({ statusCode: 404, message: this.$t('messages.noRailwayRequest') })
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
