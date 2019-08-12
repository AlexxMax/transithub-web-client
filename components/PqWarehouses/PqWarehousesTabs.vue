<template>
<div class="PQWarehousesTabs">

  <el-tabs v-model="activeName">
    <el-tab-pane
      :label="`${$t('forms.common.all')} (${list.length}/${count})`"
      name="all"
    >
      <PQWarehousesTabsList :list="list" />
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

  props: {
    list: {
      type: Array,
      default: () => []
    },
    count: {
      type: [String, Number],
      default: 0
    }
  },

  data: () => ({
    activeName: 'all'
  })
}
</script>

<style lang="css" scoped>
</style>
