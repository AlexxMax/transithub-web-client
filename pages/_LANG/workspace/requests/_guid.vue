<template>
  <FormPattern>
    <th-form-element></th-form-element>
  </FormPattern>
</template>

<script>
import FormPattern from "@/components/Common/Pattern"
import FormElement from "@/components/Requests/FormElement"

import EventBus from "@/utils/eventBus"

export default {
  components: {
    FormPattern,
    "th-form-element": FormElement
  },

  fetch({ store, route }) {
    return store.dispatch("requests/loadElement", route.params.guid)
  },

  mounted() {
    EventBus.$on("workspace-changed", () => {
      if (this.$route.params.guid) {
        this.$router.push("/workspace/requests")
      }
    })
  }
};
</script>
