<template>
  <div>
    <div class="PQStatus" :class="style">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'th-pq-status',

  props: {
    title: String
  },

  computed: {
    style() {
      return "pr-4 pl-4 pt-1 pb-1 mt-3 mb-3 rounded-full text-center text-xs text-white"
    }
  }
}
</script>

<style lang="scss" scoped>
.PQStatus {
  background-color: $--color-danger;
  max-width: 6rem;
}
</style>