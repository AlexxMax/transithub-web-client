<template>
  <div>
    <CommonList
      no-pagination
      show-load-more
      :loading="$store.state.vehicles.loading"
      :count="$store.state.vehicles.count"
      :loaded-count="$store.state.vehicles.list.length"
      :store-mutation="MUTATIONS_KEYS.SET_OFFSET"
      store-module="vehicles"
      offset-name="offset"
      @eventFetch="$emit('fetch')"
    >

      <ToolbarRight
        slot="toolbar"
        ref="toolbar"
        @onSearch="handleSearch"
      />

      <ListWrapper :loading="$store.state.vehicles.loading">
        <ItemsWrapper no-header width="620px">
          <VehiclesListItem
            v-for="vehicle of list"
            :key="vehicle.guid"
            :row="vehicle"
          />
        </ItemsWrapper>
      </ListWrapper>

    </CommonList>
  </div>
</template>

<script>
import CommonList from "@/components/Common/List"
import ToolbarRight from "@/components/Common/Lists/ToolbarRight"
import ListWrapper from "@/components/Common/Lists/ListWrapper"
import ItemsWrapper from "@/components/Common/Lists/ItemsWrapper"
import VehiclesListItem from '@/components/Vehicles/VehiclesListItem'

import { MUTATIONS_KEYS } from '@/utils/vehicles'

export default {
  name: 'th-vehicles-list',

  components: {
    CommonList,
    ToolbarRight,
    ListWrapper,
    ItemsWrapper,
    VehiclesListItem
  },

  props: {
    list: Array
  },

  data: () => ({
    MUTATIONS_KEYS
  }),

  methods: {
    handleSearch(value) {

    },
  }
}
</script>

<style lang='scss' scoped>

</style>
