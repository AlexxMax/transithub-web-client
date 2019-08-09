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

  computed: {
    list() {
      return this.$store.state.pqWarehouses.list
    }
  },
}
</script>

<style lang="css" scoped>
</style>
