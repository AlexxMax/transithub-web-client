<template>
<div class="PqWarehousesTabsList">
  <ListWrapper>

    <PqWarehousesTabsListItem
      v-for="(n, index) in 3"
      :key="index"
    />

  </ListWrapper>
</div>
</template>

<script>
import ListWrapper from "@/components/Common/Lists/ListWrapper"
import PqWarehousesTabsListItem from '@/components/PqWarehouses/PqWarehousesTabsListItem'

export default {
  components: {
    ListWrapper,
    PqWarehousesTabsListItem
  }
}
</script>

<style lang="css" scoped>
</style>
