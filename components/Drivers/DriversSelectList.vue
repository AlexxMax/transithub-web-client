<template>
  <div v-loading="loading">
    <div class="DriversSelectList">

      <el-row>
        <el-col :span="24">
          <el-input
            :placeholder="$t('forms.common.search')"
            :value="search"
            size="small"
            clearable
            @input="value => { $emit('on-search', value) }"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
      </el-row>

      <component
        :is="component"
        v-for="driver of drivers"
        :key="driver.guid"
        :transfer-data="{ ...driver, _type: 'driver' }"
      >
        <DriversCard
          class="DriversSelectList__item"
          :draggable="draggable"
          :driver="driver"
          show-open-button
          :show-select-button="showSelectButton"
          @open="$emit('item-open', driver)"
          @select="$emit('item-select', driver)"
        />
      </component>

      <LoadMore
        v-if="showLoadMore"
        :loading="loading"
        :on-load-more="handleFetchMore"
      />
    </div>
  </div>
</template>

<script>
import { Drag } from 'vue-drag-drop'

import DriversCard from '@/components/Drivers/DriversCard'
import LoadMore from '@/components/Common/Lists/ListsLoadMore'

export default {
  name: 'th-drivers-select-list',

  components: { Drag, DriversCard, LoadMore },

  props: {
    draggable: Boolean,
    drivers: {
      type: Array,
      required: true
    },
    loading: Boolean,
    showSelectButton: Boolean,
    showLoadMore: Boolean,
    search: String
  },

  computed: {
    component() {
      return this.draggable ? 'Drag' : 'div'
    }
  },

  methods: {
    handleFetchMore() {
      this.$emit('fetch-more')
    }
  }
}
</script>

<style lang='scss' scoped>
.DriversSelectList {
  padding: 5px;

  &__item {
    margin: 8px 0;
  }
}
</style>
