<template>
<div class="PqWarehouses">

  <div class="PqWarehouses__list">
    <CommonListsToolbar
      class="PqWarehouses__toolbar"
      :title="$t('lists.railwayAggregations')"
      burger
    />

    <PqWarehousesTabs />
  </div>

  <div class="PqWarehouses__filters">
    <CommonListsToolbar
      class="PqWarehouses__toolbar"
      :title="$t('lists.filter')"
    />
  </div>

</div>
</template>

<script>
// import CommonList from '@/components/Common/List'
import CommonListsToolbar from '@/components/Common/Lists/CommonListsToolbar'
import PqWarehousesTabs from '@/components/PqWarehouses/PqWarehousesTabs'

export default {
  components: {
    // CommonList,
    CommonListsToolbar,
    PqWarehousesTabs
  }
}
</script>

<style lang="scss" scoped>
.PqWarehouses {

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
