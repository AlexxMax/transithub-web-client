<template>
  <FormPattern>
    <FormElement></FormElement>
  </FormPattern>
</template>

<script>
import FormPattern from "@/components/Common/Pattern"
import FormElement from "@/components/Requests/FormElement"

export default {
  components: {
    FormPattern,
    FormElement
  },

  methods: {
    busListener() {
      this.$router.push(this.$i18n.path('workspace/requests'))
    }
  },

  fetch({ store, route }) {
    return store.dispatch("requests/loadElement", route.params.guid)
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
