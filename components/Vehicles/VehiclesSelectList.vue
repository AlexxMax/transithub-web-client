<template>
  <div v-loading="loading">
    <div class="VehiclesSelectList">

      <el-row>
        <el-col :span="24">
          <el-input
            :placeholder="$t('forms.common.search')"
            v-model="input"
            size="small"
            clearable
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
      </el-row>

      <component
        :is="component"
        v-for="vehicle of searchedVehicles"
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
    </div>
  </div>
</template>

<script>
import { Drag } from 'vue-drag-drop'

import VehiclesCard from '@/components/Vehicles/VehiclesCard'

export default {
  name: 'th-vehicles-select-list',

  components: { Drag, VehiclesCard },

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
    showSelectButton: Boolean
  },

  data: () => ({ input: '' }),

  computed: {
    component() {
      return this.draggable ? 'Drag' : 'div'
    },

    searchedVehicles() {
      if (this.input) {
        return this.vehicles.filter(item => item.vNumber.toUpperCase().includes(this.input.toUpperCase()))
      }
      return this.vehicles
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
