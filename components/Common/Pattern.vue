<template>
  <div>
    <slot></slot>
    <Backtop/>
  </div>
</template>

<script>
import Backtop from '@/components/Common/Buttons/BacktopButton'

export default {
  name: 'th-pattern',

  components: { Backtop }
}
</script>
