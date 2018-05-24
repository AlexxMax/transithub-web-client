<template>
  <th-pattern>
    <th-form-element></th-form-element>
  </th-pattern>
</template>

<script>
import Pattern from "@/components/Common/Pattern"
import FormElement from "@/components/Orders/FormElement"

export default {
  components: {
    "th-pattern": Pattern,
    "th-form-element": FormElement
  },
}
</script>
