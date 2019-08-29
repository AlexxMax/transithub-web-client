<template>
<div>

  <CommonListsToolbar
    class="PQWarehouses__toolbar"
    :title="$t('forms.common.pqWarehouses')"
    burger
  />

  <CommonList
    style="margin: 0"
    no-pagination
    show-load-more
    :loading="loading"
    :count="count"
    :loaded-count="listLength"
    :store-mutation="storeMutation"
    :store-module="storeModuleName"
    :offset-name="offsetName"
    @eventFetch="$emit('fetch')"
  >

    <ListWrapper :loading="loading">
      <ItemsWrapper
        no-header
        width="620px"
      >
        <PQWarehousesListItem
          v-for="warehouse of list"
          :key="warehouse.guid"
          :row="warehouse"
        />
      </ItemsWrapper>
    </ListWrapper>

  </CommonList>
</div>
</template>

<script>
import CommonList from '@/components/Common/List'
import CommonListsToolbar from '@/components/Common/Lists/CommonListsToolbar'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import PQWarehousesListItem from '@/components/PQWarehouses/PQWarehousesListItem'

export default {
  components: {
    CommonList,
    CommonListsToolbar,
    ListWrapper,
    ItemsWrapper,
    PQWarehousesListItem
  },

  props: {
    list: {
      type: Array,
      required: true
    },
    loading: Boolean,
    count: Number,
    listLength: Number,
    storeModuleName: {
      type: String,
      required: true
    },
    offsetName: {
      type: String,
      required: true
    },
    storeMutation: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
.PQWarehousesList {
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
    .PQWarehousesList {
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
