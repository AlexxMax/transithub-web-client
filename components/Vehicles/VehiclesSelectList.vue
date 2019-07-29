<template>
  <div v-loading="loading">
    <div class="VehiclesSelectList">

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
        v-for="vehicle of vehicles"
        :key="vehicle.guid"
        :transfer-data="{ ...vehicle, _type: type }"
      >
        <VehiclesCard
          class="VehiclesSelectList__item"
          :draggable="draggable"
          :vehicle="vehicle"
          show-open-button
          :show-select-button="showSelectButton"
          @open="$emit('item-open', vehicle)"
          @select="$emit('item-select', vehicle)"
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

import VehiclesCard from '@/components/Vehicles/VehiclesCard'
import LoadMore from '@/components/Common/Lists/ListsLoadMore'

export default {
  name: 'th-vehicles-select-list',

  components: { Drag, VehiclesCard, LoadMore },

  props: {
    draggable: Boolean,
    vehicles: {
      type: Array,
      required: true
    },
    loading: Boolean,
    type: {
      type: String,
      default: 'truck'
    },
    showSelectButton: Boolean,
    showLoadMore: Boolean,
    search: String
  },

  data: () => ({ input: '' }),

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
.VehiclesSelectList {
  padding: 5px;

  &__item {
    margin: 8px 0;
  }
}
</style>
