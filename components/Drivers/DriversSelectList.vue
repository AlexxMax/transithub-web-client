<template>
  <div v-loading="loading">
    <div class="DriversSelectList">

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
        v-for="driver of searchedDrivers"
        :key="driver.guid"
        :transfer-data="{ ...driver, _type: 'driver' }"
      >
        <DriversCard
          class="DriversSelectList__item"
          :draggable="draggable"
          :driver="driver"
          show-open-button
          @open="$emit('item-open', driver)"
        />
      </component>
    </div>
  </div>
</template>

<script>
import { Drag } from 'vue-drag-drop'

import DriversCard from '@/components/Drivers/DriversCard'

export default {
  name: 'th-drivers-select-list',

  components: { Drag, DriversCard },

  props: {
    draggable: Boolean,
    drivers: {
      type: Array,
      required: true
    },
    loading: Boolean
  },

  data: () => ({ input: '' }),

  computed: {
    component() {
      return this.draggable ? 'Drag' : 'div'
    },

    searchedDrivers() {
      if (this.input) {
        return this.drivers.filter(item => item.fullName.toUpperCase().includes(this.input.toUpperCase()))
      }
      return this.drivers
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
