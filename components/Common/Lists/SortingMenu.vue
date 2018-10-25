<template>
  <div :style="{ 'margin-left': leftMargin }">
    <div
      v-if="flat"
      class="SortingMenu__btn-flat"
      @click="openMenu">
      <fa icon="sort-alpha-down"/>
      <span class="SortingMenu__btn-title">
        {{ $t('lists.sorting') }}
      </span>
    </div>

    <Button v-else type="" @click="openMenu">
      <fa icon="sort-alpha-down"/>
      <span class="SortingMenu__btn-title">
        {{ $t('lists.sorting') }}
      </span>
    </Button>

    <RightView
      :visible="menuVisible"
      :title="$t('lists.sorting')"
      @close="closeMenu">

      <div
        class="SortingMenu__item"
        v-for="(s, index) of items"
        :key="index"
        @click="handleSort(s)">
        <span><fa :icon="sortIcon(s)"/></span>
        <span class="SortingMenu__item-title">{{ s.title }}</span>
      </div>

    </RightView>
  </div>
</template>

<script>
import Button from '@/components/Common/Buttons/Button'
import RightView from '@/components/Common/RightView'

import { SORTING_DIRECTION } from '@/utils/sorting'

export default {
  name: 'th-sorting-menu',

  components: {
    Button,
    RightView
  },

  props: {
    items: {
      type: Array,
      required: true
    },
    sort: Function,
    flat: Boolean
  },

  data() {
    return {
      menuVisible: false,
      leftMargin: '0px'
    }
  },

  methods: {
    openMenu() {
      this.menuVisible = true
      this.$emit('open')
    },
    closeMenu() {
      this.menuVisible = false
      this.$emit('close')
    },
    handleSort(s) {
      s.direction = s.direction === SORTING_DIRECTION.asc ? SORTING_DIRECTION.desc : SORTING_DIRECTION.asc

      if (this.sort) {
        this.sort(s.key, s.direction)
      }
    },
    sortIcon(s) {
      return s.direction === SORTING_DIRECTION.asc ? 'sort-alpha-up' : 'sort-alpha-down'
    }
  },

  mounted() {
    if (this.$parent.$el.className === 'ButtonsGroup' || this.$parent.$parent.$el.className === 'ButtonsGroup') {
      this.leftMargin = '5px'
    }
  }
}
</script>

<style lang="scss" scoped>
.SortingMenu__btn-flat {
  cursor: pointer;
  margin: 10px 0;
  padding: 10px;
  font-size: 13px;
  border-radius: 5px;

  &:hover {
    background-color: #f8f8f8;
  }
}

.SortingMenu__btn-title {
  margin-left: 5px;
}

.SortingMenu__item {
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 5px;
  line-height: 1.5;
  margin: 10px 0;
  border: 1px solid #f8f8f8;
  cursor: move;
  color: #606266;

  &:hover {
    background-color: #f8f8f8;
  }

  .SortingMenu__item-title {
    width: 100%;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
}
</style>
