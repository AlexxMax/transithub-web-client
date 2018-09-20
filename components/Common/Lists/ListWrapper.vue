<template>
  <div v-loading="loading">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'th-list-wrapper',

  props: {
    loading: Boolean
  }
}
</script>
