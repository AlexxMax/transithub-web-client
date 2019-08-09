<template>
<div class="PQWarehousesTabs">

  <el-tabs v-model="activeName">
    <el-tab-pane
      label="Все"
      name="all"
    >
      <PQWarehousesTabsList />
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
import PQWarehousesTabsList from '@/components/PQWarehouses/PQWarehousesTabsList'

export default {
  components: {
    PQWarehousesTabsList
  },

  data: () => ({
    activeName: 'all'
  })
}
</script>

<style lang="css" scoped>
</style>
