<template>
<div class="PqWarehousesTabs">

  <el-tabs v-model="activeName">
    <el-tab-pane
      label="Все"
      name="all"
    >
      <PqWarehousesTabsList />
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
import PqWarehousesTabsList from '@/components/PqWarehouses/PqWarehousesTabsList'

export default {
  components: {
    PqWarehousesTabsList
  },

  data: () => ({
    activeName: 'all'
  })
}
</script>

<style lang="css" scoped>
</style>
