<template>
<div class="PQWarehouses">

  <div class="PQWarehouses__list">
    <CommonListsToolbar
      class="PQWarehouses__toolbar"
      :title="$t('lists.pqWarehouses')"
      burger
    />

    <CommonList
      no-pagination
      show-load-more
      :loading="loading"
      :count="count"
      :loaded-count="list.length"
      :store-mutation="MUTATIONS_KEYS.SET_OFFSET"
      :store-module="STORE_MODULE_NAME"
      @eventFetch="fetch"
    >
      <PQWarehousesTabs
        :list="list"
        :count="count"
      />
    </CommonList>
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
import { STORE_MODULE_NAME, ACTIONS_KEYS, MUTATIONS_KEYS } from '@/utils/pq.warehouses'

import CommonList from '@/components/Common/List'
import CommonListsToolbar from '@/components/Common/Lists/CommonListsToolbar'
import PQWarehousesTabs from '@/components/PQWarehouses/PQWarehousesTabs'

export default {
  components: {
    CommonList,
    CommonListsToolbar,
    PQWarehousesTabs
  },

  data: () => ({
    STORE_MODULE_NAME,
    MUTATIONS_KEYS
  }),

  computed: {
    list() {
      return this.$store.state[STORE_MODULE_NAME].list
    },
    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    },
    count() {
      return this.$store.state[STORE_MODULE_NAME].count
    }
  },

  methods: {
    async fetch() {
      await this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`)
    }
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
