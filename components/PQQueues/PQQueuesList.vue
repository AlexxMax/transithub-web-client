<template>
  <div>
    <h3 class="PQQueuesList__title">
      {{ $t('forms.queue.queues') }}
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
        class="PQQueuesList__toolbar"
        slot="toolbar"
        ref="toolbar"
      >
      </ToolbarRight>

      <!-- <PQQueuesList
        v-loading="loading"
        :list="list"
      /> -->

      <ListWrapper :loading="loading">
        <ItemsWrapper no-header width="620px">
          <PQQueuesListItem
            v-for="queue of list"
            :key="queue.guid"
            :row="queue"
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
import PQQueuesListItem from '@/components/PQQueues/PQQueuesListItem'
import ToolbarRight from '@/components/Common/Lists/ToolbarRight'

// const PQQueuesList = {
//   name: 'th-pq-queues-list',

//   components: {
//     ListWrapper,
//     ItemsWrapper,
//     PQQueuesListItem
//   },

//   // props: {
//   //   list: {
//   //     type: Array,
//   //     default: []
//   //   },
//   //   loading: Boolean,
//   //   count: Number,
//   //   listLength: Number,
//   //   storeModuleName: {
//   //     type: String,
//   //     required: true
//   //   },
//   //   offsetName: {
//   //     type: String,
//   //     required: true
//   //   },
//   //   storeMutation: {
//   //     type: String,
//   //     required: true
//   //   }
//   // },

//   render(h) {
//     const self = this
//     return h(
//       ListWrapper,
//       { props: {
//         loading: self.loading,
//         listIsEmpty: self.list.length === 0,
//         emptyListTitle: self.$t('lists.queuesEmptyList')
//       } },
//       [h(
//         ItemsWrapper,
//         { props: { noHeader: true, width: "620px" } },
//         self.list.map(function(item) {
//           return h(
//             PQQueuesListItem,
//             {
//               key: item.guid,
//               props: { row: item }
//             },
//           );
//         })
//       )
//     ]);
//   }
// }

export default {
  name: 'th-pq-queues-list',

  components: {
    CommonList,
    ToolbarRight,
    ListWrapper,
    ItemsWrapper,
    PQQueuesListItem
    // PQQueuesList
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
.PQQueuesList {
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
  .PQQueuesList {
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
