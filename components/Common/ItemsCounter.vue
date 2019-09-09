<template>
  <div class="rounded bg-gray-800 text-white px-1 text-sm font-bold">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'th-items-counter',

  props: {
    loadedCount: {
      type: Number,
      default: 0
    },
    allCount: {
      type: Number,
      default: 0
    },
  },

  computed: {
    title() {
      return `${this.loadedCount}/${this.allCount}`
    }
  }
}
</script>
