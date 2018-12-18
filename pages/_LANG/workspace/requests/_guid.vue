<template>
  <FormPattern>
    <FormElement></FormElement>
  </FormPattern>
</template>

<script>
import FormPattern from "@/components/Common/Pattern"
import FormElement from "@/components/Requests/FormElement"

import EventBus from "@/utils/eventBus"

export default {
  components: {
    FormPattern,
    FormElement
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
    EventBus.$on("workspace-changed", () => {
      if (this.$route.params.guid) {
        this.$router.push("/workspace/requests")
      }
    })
  }
}
</script>
