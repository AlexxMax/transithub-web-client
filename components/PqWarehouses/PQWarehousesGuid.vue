<template>
<div class="PQWarehousesGuid">

  <div class="PQWarehousesGuid__sidebar">
    <PQWarehousesGuidSidebar :item="item" />
  </div>

  <div class="PQWarehousesGuid__content">
    <PQWarehousesGuidContent
      :item="item"
      @openPattern="dialog = true"
    />
  </div>

  <PQWarehousesPattern
    :default="item"
    :visible.sync="dialog"
    @close="dialog = false"
  />

</div>
</template>

<script>
import PQWarehousesGuidSidebar from '@/components/PQWarehouses/PQWarehousesGuidSidebar'
import PQWarehousesGuidContent from '@/components/PQWarehouses/PQWarehousesGuidContent'
import PQWarehousesPattern from '@/components/PQWarehouses/PQWarehousesPattern'

export default {
  components: {
    PQWarehousesGuidSidebar,
    PQWarehousesGuidContent,
    PQWarehousesPattern
  },

  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    dialog: false
  })
}
</script>

<style lang="scss" scoped>
.PQWarehousesGuid {
    height: 100%;

    margin: -20px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__content {
        width: 100%;
    }
}
</style>
