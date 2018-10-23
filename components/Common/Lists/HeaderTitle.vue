<template>
  <div class="th-column-title" @click="click">
    {{ title }}
    <fa v-if="sort" :icon="icon" />
  </div>
</template>

<script>
import { nextSort, getIcon } from '@/utils/sorting'
import { LIST_SORTING_DIRECTION } from '@/utils/defaultValues'

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
      direction: LIST_SORTING_DIRECTION
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

