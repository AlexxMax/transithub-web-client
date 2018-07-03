<template>
  <th-button style="width: 100%; fontSize: 13px" @click="$emit('onClick')">
    <slot />
  </th-button>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'

export default {
  components: {
    "th-button": Button
  }
}
</script>

<style>

</style>
