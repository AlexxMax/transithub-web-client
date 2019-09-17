<template>
  <Scaffold
    :buttons="buttons"
    :tabs="tabs"
    :active-tab="activeTab"
    :show-back="showBack"
    :show-close="showClose"
    :embed="embed"
    @close="$emit('close')"
  >
    <keep-alive>
      <component
        :is="component"
        :item="item"
        :items="subordinate.items"
        :count="subordinate.count"
        :loading="subordinate.loading"
        @create="subordinate.create()"
        @select="(item) => { subordinate.select && subordinate.select(item) }"
        @load-more="subordinate.fetch(true)"
      />
    </keep-alive>
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/Common/FormElements/FormScaffold'
import EmptyPlace from '@/components/Common/EmptyPlace'
import Details from '@/components/PQQueueProfiles/PQQueueProfilesCatalogItemDetails'

const Warehouses = () => ({
  component: import(/* webpackChunkName: 'PQQueueProfilesCatalogItemWarehouses' */ '@/components/PQQueueProfiles/PQQueueProfilesCatalogItemWarehouses'),
  loading: EmptyPlace,
  error: EmptyPlace
})

const Queues = () => ({
  component: import(/* webpackChunkName: 'PQQueueProfilesCatalogItemQueues' */ '@/components/PQQueueProfiles/PQQueueProfilesCatalogItemQueues'),
  loading: EmptyPlace,
  error: EmptyPlace
})

import {
  STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES,
  ACTIONS_KEYS,

  WAREHOUSES_STORE_MODULE_NAME,
  WAREHOUSES_MUTATIONS_KEYS,
  WAREHOUSES_ACTIONS_KEYS,

  QUEUES_STORE_MODULE_NAME,
  QUEUES_MUTATIONS_KEYS,
  QUEUES_ACTIONS_KEYS
} from "@/utils/pq.queueProfiles"

import {
  STORE_MODULE_NAME as PQ_WAREHOUSES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_WAREHOUSES_MUTATIONS_KEYS,
  EDIT_DIALOG_TYPES as PQ_WAREHOUSES_EDIT_DIALOG_TYPES
} from '@/utils/pq.warehouses'

import {
  STORE_MODULE_NAME as PQ_QUEUES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_QUEUES_MUTATIONS_KEYS,
  EDIT_DIALOG_TYPES as PQ_QUEUES_EDIT_DIALOG_TYPES
} from '@/utils/pq.queues'


const TABS = Object.freeze({
  details: 'details',
  warehouses: 'warehouses',
  queues: 'queues'
})

export default {
  name: 'th-pq-queue-profiles-catalog-item',

  components: { Scaffold, Details },

  props: {
    item: {
      type: Object,
      required: true,
    },
    showBack: Boolean,
    showClose: Boolean,
    embed: Boolean,
  },

  data: () => ({
    activeTab: TABS.details
  }),

  computed: {
    component() {
      return this.components[this.activeTab]
    },

    subordinate() {
      const subordinate = this.subordinates[this.activeTab]
      if (subordinate) {
        const { itemsKey, countKey, loadingKey, create, select, fetch } = subordinate
        return {
          items: this[itemsKey],
          count: this[countKey],
          loading: this[loadingKey],
          create,
          select,
          fetch
        }
      }
      return {}
    },

    /* Warehouses */

    warehousesItems() {
      return this.$store.state[STORE_MODULE_NAME].warehouses.list
    },

    warehousesCount() {
      return this.$store.state[STORE_MODULE_NAME].warehouses.count
    },

    warehousesLoading() {
      return this.$store.state[STORE_MODULE_NAME].warehouses.loading
    },

     /* Queues */

    queuesItems() {
      return this.$store.state[STORE_MODULE_NAME].queues.list
    },

    queuesCount() {
      return this.$store.state[STORE_MODULE_NAME].queues.count
    },

    queuesLoading() {
      return this.$store.state[STORE_MODULE_NAME].queues.loading
    },
  },

  methods: {
    handleEdit() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: EDIT_DIALOG_TYPES.EDIT
      })
    },

    /* Warehouses */

    createWarehouse() {
      this.$store.dispatch(`${PQ_WAREHOUSES_STORE_MODULE_NAME}/${PQ_WAREHOUSES_MUTATIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: PQ_WAREHOUSES_EDIT_DIALOG_TYPES.CREATE
      })
    },

    selectWarehouse({ guid }) {
      this.$router.push(this.$i18n.path(`workspace/pq-warehouses/${guid}`))
    },

    async fetchWarehouses(loadMore = false) {
      let nextOffset = 0
      if (loadMore) {
        const { offset, limit } = this.$store.state[STORE_MODULE_NAME].warehouses
        nextOffset = offset + limit
      }
      this.$store.commit(`${WAREHOUSES_STORE_MODULE_NAME}/${WAREHOUSES_MUTATIONS_KEYS.SET_OFFSET}`, nextOffset)
      await this.$store.dispatch(`${WAREHOUSES_STORE_MODULE_NAME}/${WAREHOUSES_ACTIONS_KEYS.FETCH_LIST}`, this.item.guid)
    },

    /* Queues */

    createQueue() {
      this.$store.dispatch(`${PQ_QUEUES_STORE_MODULE_NAME}/${PQ_QUEUES_MUTATIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: PQ_QUEUES_EDIT_DIALOG_TYPES.CREATE
      })
    },

    selectQueue({ guid }) {
      this.$router.push(this.$i18n.path(`workspace/pq-queues/${guid}`))
    },

    async fetchQueues(loadMore = false) {
      let nextOffset = 0
      if (loadMore) {
        const { offset, limit } = this.$store.state[STORE_MODULE_NAME].queues
        nextOffset = offset + limit
      }
      this.$store.commit(`${QUEUES_STORE_MODULE_NAME}/${QUEUES_MUTATIONS_KEYS.SET_OFFSET}`, nextOffset)
      await this.$store.dispatch(`${QUEUES_STORE_MODULE_NAME}/${QUEUES_ACTIONS_KEYS.FETCH_LIST}`, this.item.guid)
    },
  },

  created() {
    this.TABS = TABS

    this.buttons = [{
      name: 'edit',
      icon: 'pen',
      tooltip: this.$t('forms.common.edit'),
      handler: this.handleEdit
    }]

    const handleClickTab = ({ name }) => this.activeTab = name

    this.tabs = [{
      name: TABS.details,
      title: this.$t('forms.common.pqQueueProfile'),
      handler: handleClickTab,
    }, {
      name: TABS.warehouses,
      title: this.$t('forms.common.pqWarehouses'),
      handler: handleClickTab,
    }, {
      name: TABS.queues,
      title: this.$t('forms.common.pqQueuesTypes'),
      handler: handleClickTab,
    }]

    this.components = {
      [TABS.details]: Details,
      [TABS.warehouses]: Warehouses,
      [TABS.queues]: Queues
    }

    this.subordinates = {
      [TABS.warehouses]: {
        touched: false,
        itemsKey: 'warehousesItems',
        countKey: 'warehousesCount',
        loadingKey: 'warehousesLoading',
        create: this.createWarehouse,
        select: this.selectWarehouse,
        fetch: this.fetchWarehouses
      },

      [TABS.queues]: {
        touched: false,
        itemsKey: 'queuesItems',
        countKey: 'queuesCount',
        loadingKey: 'queuesLoading',
        create: this.createQueue,
        select: this.selectQueue,
        fetch: this.fetchQueues
      }
    }
  },

  watch: {
    activeTab(value) {
      const subordinate = this.subordinates[value]
      if (subordinate && !subordinate.touched) {
        subordinate.fetch()
        subordinate.touched = true
      }
    },
  },
}
</script>
