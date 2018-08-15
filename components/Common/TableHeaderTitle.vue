<template>
  <div class="th-column-title" @click="click">
    {{ title }}
    <fa v-if="sort" :icon="icon" />
  </div>
</template>

<script>
import { SORTING_DIRECTION, nextSort, getIcon } from '@/utils/sorting'

export default {
  props: {
    col: {
      type: String,
      required: true
    },
    title: String,
    sort: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      direction: SORTING_DIRECTION.disabled
    }
  },

  computed: {
    icon: function() {
      return getIcon(this.direction)
    }
  },

  methods: {
    click: function() {
      this.direction = nextSort(this.direction)
      this.$emit('click', this.direction, this.col)
    }
  }
}
</script>

<style lang="scss" scoped>
.th-column-title {
  font-size: 12px;
  font-weight: 500;
  color: #606266;
}
</style>

