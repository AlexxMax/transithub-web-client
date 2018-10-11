<template>
  <zoom-center-transition  >
    <slot/>
  </zoom-center-transition>
</template>

<script>
import { ZoomCenterTransition } from 'vue2-transitions'

export default {
  name: 'th-transition-zoom-center',

  components: {
    ZoomCenterTransition
  }
}
</script>
