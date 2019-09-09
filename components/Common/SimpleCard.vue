<template>
  <div
    class="rounded-lg p-4 bg-white shadow"
    :class="{
      'bg-primary': active,
      'hover:bg-primary': hover,
      'shadow-lg': active,
      'cursor-pointer': pointer
    }"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'th-simple-card',

  props: {
    active: Boolean,
    hover: Boolean,
    pointer: Boolean
  }
}
</script>
