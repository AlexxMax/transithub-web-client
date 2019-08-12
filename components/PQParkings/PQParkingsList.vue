<template>
  <div>
    <h3 class="PQParkingsList__title">
      {{ $t('forms.common.pqParkings') }}
    </h3>

    <CommonList
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

      <ToolbarRight
        class="PQParkingsList__toolbar"
        slot="toolbar"
        ref="toolbar"
      >
      </ToolbarRight>

      <ListWrapper :loading="loading">
        <ItemsWrapper no-header width="620px">
          <PQParkingsListItem
            v-for="parking of list"
            :key="parking.guid"
            :row="parking"
          />
        </ItemsWrapper>
      </ListWrapper>

    </CommonList>
  </div>
</template>

<script>
import CommonList from '@/components/Common/List'
import ListWrapper from '@/components/Common/Lists/ListWrapper'
import ItemsWrapper from '@/components/Common/Lists/ItemsWrapper'
import PQParkingsListItem from '@/components/PQParkings/PQParkingsListItem'
import ToolbarRight from '@/components/Common/Lists/ToolbarRight'

export default {
  name: 'th-pq-parkings-list',

  components: {
    CommonList,
    ToolbarRight,
    ListWrapper,
    ItemsWrapper,
    PQParkingsListItem
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
.PQParkingsList {
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
  .PQParkingsList {
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
