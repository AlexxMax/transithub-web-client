<template>
  <th-pattern>
    <th-form-element></th-form-element>
  </th-pattern>
</template>

<script>
import Pattern from "@/components/Common/Pattern"
import FormElement from "@/components/Vehicles/FormElement"

import EventBus from '@/utils/eventBus'

export default {
  components: {
    "th-pattern": Pattern,
    "th-form-element": FormElement
  },

  mounted() {
    EventBus.$on('workspace-changed', () => {
      this.$router.push(this.$i18n.path('workspace/vehicles'))
    })
  }
};
</script>
