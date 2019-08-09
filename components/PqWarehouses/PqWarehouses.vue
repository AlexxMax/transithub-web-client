<template>
<div class="PQWarehouses">

  <div class="PQWarehouses__list">
    <CommonListsToolbar
      class="PQWarehouses__toolbar"
      :title="$t('lists.railwayAggregations')"
      burger
    />

    <PQWarehousesTabs />
  </div>

  <div class="PQWarehouses__filters">
    <CommonListsToolbar
      class="PQWarehouses__toolbar"
      :title="$t('lists.filter')"
    />
  </div>

</div>
</template>

<script>
import CommonListsToolbar from '@/components/Common/Lists/CommonListsToolbar'
import PQWarehousesTabs from '@/components/PQWarehouses/PQWarehousesTabs'

export default {
  components: {
    CommonListsToolbar,
    PQWarehousesTabs
  }
}
</script>

<style lang="scss" scoped>
.PQWarehouses {

    display: flex;

    &__toolbar {
        height: 36px;

        margin-bottom: 1rem;
    }

    &__list {
        width: 100%;
    }

    &__filters {
        min-width: 320px;

        padding-left: 20px;

        @include for-medium-and-less {
            display: none;
        }
    }
}
</style>
