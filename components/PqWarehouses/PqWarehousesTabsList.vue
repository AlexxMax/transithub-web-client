<template>
<div class="PQWarehousesTabsList">
  <ListWrapper>

    <PQWarehousesTabsListItem
      v-for="item in list"
      :key="item.guid"
      :data="item"
    />

  </ListWrapper>
</div>
</template>

<script>
import ListWrapper from "@/components/Common/Lists/ListWrapper"
import PQWarehousesTabsListItem from '@/components/PQWarehouses/PQWarehousesTabsListItem'

export default {
  components: {
    ListWrapper,
    PQWarehousesTabsListItem
  },

  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="css" scoped>
</style>
