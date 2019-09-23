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
        @create="subordinate.openDialog()"
        @select="(item) => { subordinate.select && subordinate.select(item) }"
        @load-more="subordinate.fetch(true)"
        @delete="(item) => { subordinate.select && subordinate.unbindWithParking(item) }"
      />
    </keep-alive>

    <QueueProfileSelectDialog
      ref="queue-profile-select-dialog"
      :title="$t('forms.common.pqQueueProfiles')"
      :loading="loadingQueueProfilesItems"
      :active-item="activeQueueProfileItem"
      :items="calculateQueueProfilesItems"
      @select="(item) => { subordinate.bindWithParking(item) }"
    />
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/Common/FormElements/FormScaffold'
import Details from '@/components/PQParkings/PQParkingsCatalogItemDetails'
import EmptyPlace from '@/components/Common/EmptyPlace'
import QueueProfileSelectDialog from '@/components/PQQueueProfiles/PQQueueProfilesCatalogListSelectDialog'

const QueueProfiles = () => ({
  component: import(/* webpackChunkName: 'PQParkingsCatalogItemQueueProfiles' */ '@/components/PQParkings/PQParkingsCatalogItemQueueProfiles'),
  loading: EmptyPlace,
  error: EmptyPlace
})

import {
  STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES,
  ACTIONS_KEYS,

  QUEUE_PROFILES_STORE_MODULE_NAME,
  QUEUE_PROFILES_MUTATIONS_KEYS,
  QUEUE_PROFILES_ACTIONS_KEYS
} from "@/utils/pq.parkings"

import {
  STORE_MODULE_NAME as PQ_QUEUE_PROFILES_STORE_MODULE_NAME,
  MUTATIONS_KEYS as PQ_QUEUE_PROFILES_MUTATIONS_KEYS,
  EDIT_DIALOG_TYPES as PQ_QUEUE_PROFILES_EDIT_DIALOG_TYPES,
  ACTIONS_KEYS as PQ_QUEUE_PROFILES_ACTIONS_KEYS
} from '@/utils/pq.queueProfiles'

const TABS = Object.freeze({
  details: 'details',
  queueProfiles: 'queueProfiles'
})

export default {
  name: 'th-pq-parkings-catalog-item',

  components: { Scaffold, Details, QueueProfileSelectDialog },

  props: {
    item: {
      type: Object,
      required: true
    },
    showBack: Boolean,
    showClose: Boolean,
    embed: Boolean
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
        const { itemsKey, countKey, loadingKey, openDialog, select, fetch, fetchAllQueueProfiles, bindWithParking, unbindWithParking } = subordinate
        return {
          items: this[itemsKey],
          count: this[countKey],
          loading: this[loadingKey],
          //create,
          openDialog,
          select,
          fetch,
          fetchAllQueueProfiles,
          bindWithParking,
          unbindWithParking
        }
      }
      return {}
    },

    /* Queue Profiles */

    queueProfilesItems() {
      return this.$store.state[STORE_MODULE_NAME].queueProfiles.list
    },

    queueProfilesCount() {
      return this.$store.state[STORE_MODULE_NAME].queueProfiles.count
    },

    queueProfilesLoading() {
      return this.$store.state[STORE_MODULE_NAME].queueProfiles.loading
    },

    queueProfilesAllItems() {
      return this.$store.state[PQ_QUEUE_PROFILES_STORE_MODULE_NAME].list
    },

    loadingQueueProfilesItems() {
      return this.$store.state[PQ_QUEUE_PROFILES_STORE_MODULE_NAME].loading
    },

    calculateQueueProfilesItems() {
      return this.queueProfilesAllItems.filter(x => !this.queueProfilesItems.filter(y => y.queueProfileGuid === x.guid).length)
    },

    activeQueueProfileItem: {
      get() {
        return this.$store.state[PQ_QUEUE_PROFILES_STORE_MODULE_NAME].item
      },
      set(value) {
        this.$store.commit(`${PQ_QUEUE_PROFILES_STORE_MODULE_NAME}/${PQ_QUEUE_PROFILES_MUTATIONS_KEYS.SET_ITEM}`, value)
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

    async openQueueProfileSelectDialog() {
      this.$refs['queue-profile-select-dialog'].show()
      //await this.fetchAllQueueProfiles()
    },

    selectQueueProfile({ queueProfileGuid }) {
      console.log({ queueProfileGuid })
      this.$router.push(this.$i18n.path(`workspace/pq-queue-profiles/${queueProfileGuid}`))
    },

    async fetchQueueProfiles(loadMore = false) {
      let nextOffset = 0

      if (loadMore) {
        const { offset, limit } = this.$store.state[STORE_MODULE_NAME].queueProfiles
        nextOffset = offset + limit
      }

      this.$store.commit(`${QUEUE_PROFILES_STORE_MODULE_NAME}/${QUEUE_PROFILES_MUTATIONS_KEYS.SET_OFFSET}`, nextOffset)
      await this.$store.dispatch(`${QUEUE_PROFILES_STORE_MODULE_NAME}/${QUEUE_PROFILES_ACTIONS_KEYS.FETCH_LIST}`, this.item.guid)
    },

    async fetchAllQueueProfiles() {
      this.$store.commit(`${PQ_QUEUE_PROFILES_STORE_MODULE_NAME}/${PQ_QUEUE_PROFILES_MUTATIONS_KEYS.SET_LIMIT}`, 10000)

      await this.$store.dispatch(
        `${PQ_QUEUE_PROFILES_STORE_MODULE_NAME}/${PQ_QUEUE_PROFILES_ACTIONS_KEYS.FETCH_LIST}`,
        this.$store.state.companies.currentCompany.guid
      )

      this.activeQueueProfileItem = null
    },

    bindWithParking(item) {
      this.activeQueueProfileItem = item

      const selectedQueueProfile = this.$store.state[PQ_QUEUE_PROFILES_STORE_MODULE_NAME].item.guid
      this.$store.dispatch(`${QUEUE_PROFILES_STORE_MODULE_NAME}/${QUEUE_PROFILES_ACTIONS_KEYS.BIND_QUEUE_PROFILE_WITH_PARKING}`, selectedQueueProfile)

      this.$refs['queue-profile-select-dialog'].hide()
    },

    async unbindWithParking({ queueProfileGuid }) {
      this.$store.dispatch(`${QUEUE_PROFILES_STORE_MODULE_NAME}/${QUEUE_PROFILES_ACTIONS_KEYS.UNBIND_QUEUE_PROFILE_WITH_PARKING}`, queueProfileGuid)
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
      title: this.$t('forms.common.pqParking'),
      handler: handleClickTab,
    }, {
      name: TABS.queueProfiles,
      title: this.$t('forms.common.pqQueueProfiles'),
      handler: handleClickTab,
    }]

    this.components = {
      [TABS.details]: Details,
      [TABS.queueProfiles]: QueueProfiles
    }

    this.subordinates = {
      [TABS.queueProfiles]: {
        touched: false,
        itemsKey: 'queueProfilesItems',
        countKey: 'queueProfilesCount',
        loadingKey: 'queueProfilesLoading',
        openDialog: this.openQueueProfileSelectDialog,
        select: this.selectQueueProfile,
        fetch: this.fetchQueueProfiles,
        fetchAllQueueProfiles: this.fetchAllQueueProfiles,
        bindWithParking: this.bindWithParking,
        unbindWithParking: this.unbindWithParking
      }
    }
  },

  watch: {
    activeTab(value) {
      const subordinate = this.subordinates[value]
      if (subordinate && !subordinate.touched) {
        subordinate.fetch()

         if(this.activeTab === TABS.queueProfiles) {
          this.fetchAllQueueProfiles()
        }
      }
    }
  }
}
</script>
