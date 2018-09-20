<template>
  <div>
    <!-- <th-breadcrumbs></th-breadcrumbs> -->
    <slot></slot>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/Common/Breadcrumbs'

export default {
  name: 'th-pattern',

  components: {
    "th-breadcrumbs": Breadcrumbs
  }
}
</script>
