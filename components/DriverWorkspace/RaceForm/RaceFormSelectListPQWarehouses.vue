<template>
  <div class="RaceFormSelectListPQWarehouse" v-loading="loading">
    <Scaffold :title="title" :visible.sync="innerVisible">
      <div>
        <el-input
          class="RaceFormSelectListPQWarehouse__search"
          clearable
          prefix-icon="el-icon-search"
          :placeholder="$t('lists.search')"
          :value="search"
          @input="(value) => { handlerSearch(value) }"
        />

        <div class="RaceFormSelectListPQWarehouse__list">
          <Item
            v-for="item of items"
            :key="item.guid"
            :item="item"
            @click.native="$emit('select', item)"
          />
        </div>
      </div>
    </Scaffold>
  </div>
</template>

<script>
import Scaffold from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListScaffold'
import Item from '@/components/DriverWorkspace/RaceForm/RaceFormSelectListItemPQWarehouses'

export default {
  name: 'th-driver-workspace-race-form-select-list-warehouses',

  components: { Scaffold, Item, },

  props: {
    title: {
      type: String,
      required: true,
    },
    visible: Boolean,
    search: String,
    handlerSearch: {
      type: Function,
      required: true,
    },
    items: Array,
    loading: Boolean
  },

  computed: {
    innerVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },
}
</script>

<style lang='scss' scoped>
.RaceFormSelectListPQWarehouse {
  &__search {
    margin: 10px 0;
  }

  &__list {
    height: calc(100vh - 177px);
    overflow-y: auto;
  }
}
</style>
