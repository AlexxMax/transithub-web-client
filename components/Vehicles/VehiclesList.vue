<template>
  <div>
    <h3 class="VehiclesList__title">{{ $t('forms.common.vehicles') }}</h3>

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
        class="VehiclesList__toolbar"
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
.VehiclesList {
  &__title {
    display: flex;
    font-size: 18px;
    font-weight: 500;
    color: #606266;
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;
  }

  &__toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 35px;
  }
}
@media (max-width: 600px) {
  .VehiclesList {
    &__title {
      width: 108%;
      margin: -35px;
      justify-content: center;
      align-items: center;
    }

    &__toolbar {
      margin-top: 50px;
      display: block;
      justify-content: center;
      align-items: center;
      margin-left: -15px;
    }
  }
}
</style>
