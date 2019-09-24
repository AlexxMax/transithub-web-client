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
        @create="activeTab === TABS.parkings ? subordinate.openDialog() : subordinate.create()"
        @select="(item) => { subordinate.select && subordinate.select(item) }"
        @load-more="subordinate.fetch(true)"
        @delete="(item) => { subordinate.select && subordinate.unbindWithQueueProfile(item) }"
      />
    </keep-alive>

    <ParkingSelectDialog
      ref="parking-select-dialog"
      :title="$t('forms.common.pqParkings')"
      :loading="parkingsAllItemsLoading"
      :active-item="activeParkingItem"
      :items="calculateParkingsItems"
      @select="(item) => { subordinate.bindWithQueueProfile(item) }"
      @create="subordinate.create()"
    />
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/Common/FormElements/FormScaffold'
import EmptyPlace from '@/components/Common/EmptyPlace'
import Details from '@/components/PQQueueProfiles/PQQueueProfilesCatalogItemDetails'
import ParkingSelectDialog from '@/components/PQParkings/PQParkingsCatalogListSelectDialog'

import EventBus from '@/utils/eventBus'

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

const Parkings = () => ({
  component: import(/* webpackChunkName: 'PQQueueProfilesCatalogItemParkings' */ '@/components/PQQueueProfiles/PQQueueProfilesCatalogItemParkings'),
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
  QUEUES_ACTIONS_KEYS,

  PARKINGS_STORE_MODULE_NAME,
  PARKINGS_MUTATIONS_KEYS,
  PARKINGS_ACTIONS_KEYS
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

import {
  STORE_MODULE_NAME as PQ_PARKINGS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_PARKINGS_MUTATIONS_KEYS,
  EDIT_DIALOG_TYPES as PQ_PARKINGS_EDIT_DIALOG_TYPES,
  ACTIONS_KEYS as PQ_PARKINGS_ACTIONS_KEYS
} from '@/utils/pq.parkings'


const TABS = Object.freeze({
  details: 'details',
  warehouses: 'warehouses',
  queues: 'queues',
  parkings: 'parkings'
})

export default {
  name: 'th-pq-queue-profiles-catalog-item',

  components: { Scaffold, Details, ParkingSelectDialog },

  props: {
    item: {
      type: Object,
      required: true,
    },
    showBack: Boolean,
    showClose: Boolean,
    embed: Boolean,

    isBindListParkings: {
      type: Boolean,
      default: true
    }
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
        const { itemsKey, countKey, loadingKey, create, openDialog, select, fetch, fetchAllParkings, bindWithQueueProfile, unbindWithQueueProfile } = subordinate
        return {
          items: this[itemsKey],
          count: this[countKey],
          loading: this[loadingKey],
          create,
          openDialog,
          select,
          fetch,
          fetchAllParkings,
          bindWithQueueProfile,
          unbindWithQueueProfile
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

    /* Parkings */

    parkingsItems() {
      return this.$store.state[STORE_MODULE_NAME].parkings.list
    },

    parkingsCount() {
      return this.$store.state[STORE_MODULE_NAME].parkings.count
    },

    parkingsLoading() {
      return this.$store.state[STORE_MODULE_NAME].parkings.loading
    },

    parkingsAllItemsLoading() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].loading
    },

    parkingsAllItems() {
      return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].list
    },

    calculateParkingsItems() {
      return this.parkingsAllItems.filter(x => !this.parkingsItems.filter(y => y.parkingGuid === x.guid).length)
    },

    activeParkingItem: {
      get() {
        return this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].item
      },
      set(value) {
        this.$store.commit(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_MUTATIONS_KEYS.SET_ITEM}`, value)
      }
    }
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

    /* Parkings */

    createParking() {
      EventBus.$emit('createParkingClicked', this.isBindListParkings)

      this.$store.dispatch(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_MUTATIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: PQ_PARKINGS_EDIT_DIALOG_TYPES.CREATE
      })
    },

    async openParkingSelectDialog() {
      this.$refs['parking-select-dialog'].show()
      //await this.fetchAllParkings()
    },

    selectParking({ parkingGuid }) {
      this.$router.push(this.$i18n.path(`workspace/pq-parkings/${parkingGuid}`))
    },

    async fetchParkings(loadMore = false) {
      let nextOffset = 0

      if (loadMore) {
        const { offset, limit } = this.$store.state[STORE_MODULE_NAME].parkings
        nextOffset = offset + limit
      }

      this.$store.commit(`${PARKINGS_STORE_MODULE_NAME}/${PARKINGS_MUTATIONS_KEYS.SET_OFFSET}`, nextOffset)
      await this.$store.dispatch(`${PARKINGS_STORE_MODULE_NAME}/${PARKINGS_ACTIONS_KEYS.FETCH_LIST}`, this.item.guid)
    },

    async fetchAllParkings() {
    this.$store.commit(`${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_MUTATIONS_KEYS.SET_LIMIT}`, 10000)

      await this.$store.dispatch(
        `${PQ_PARKINGS_STORE_MODULE_NAME}/${PQ_PARKINGS_ACTIONS_KEYS.FETCH_LIST}`,
        this.$store.state.companies.currentCompany.guid
      )

      this.activeParkingItem = null
    },

    bindWithQueueProfile(item) {
      this.activeParkingItem = item
      
      const selectedParking = this.$store.state[PQ_PARKINGS_STORE_MODULE_NAME].item.guid
      this.$store.dispatch(`${PARKINGS_STORE_MODULE_NAME}/${PARKINGS_ACTIONS_KEYS.BIND_PARKING_WITH_QUEUE_PROFILE}`, selectedParking)

      this.$refs['parking-select-dialog'].hide()
    },

    async unbindWithQueueProfile({ parkingGuid }) {
      this.$store.dispatch(`${PARKINGS_STORE_MODULE_NAME}/${PARKINGS_ACTIONS_KEYS.UNBIND_PARKING_WITH_QUEUE_PROFILE}`, parkingGuid)
    }
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
    }, {
      name: TABS.parkings,
      title: this.$t('forms.common.pqParkings'),
      handler: handleClickTab,
    }]

    this.components = {
      [TABS.details]: Details,
      [TABS.warehouses]: Warehouses,
      [TABS.queues]: Queues,
      [TABS.parkings]: Parkings
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
      },

      [TABS.parkings]: {
        touched: false,
        itemsKey: 'parkingsItems',
        countKey: 'parkingsCount',
        loadingKey: 'parkingsLoading',
        openDialog: this.openParkingSelectDialog,
        create: this.createParking,
        select: this.selectParking,
        fetch: this.fetchParkings,
        fetchAllParkings: this.fetchAllParkings,
        bindWithQueueProfile: this.bindWithQueueProfile,
        unbindWithQueueProfile: this.unbindWithQueueProfile
      }
    }
  },

  watch: {
    activeTab(value) {
      const subordinate = this.subordinates[value]
      if (subordinate && !subordinate.touched) {
        subordinate.fetch()
        subordinate.touched = true

        if(this.activeTab === TABS.parkings) {
          this.fetchAllParkings()
        }
      }
    }
  }
}
</script>
