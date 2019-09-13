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
    <div>
      <Details v-show="activeTab === TABS.details" :item="item"/>
      <Goods v-show="activeTab === TABS.goods" embed/>
    </div>
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/Common/FormElements/FormScaffold'
import Details from '@/components/PQWarehouses/PQWarehousesCatalogItemDetails'
import Goods from '@/components/PQWarehouses/PQWarehousesGoods'

import {
  STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES,
  ACTIONS_KEYS
} from "@/utils/pq.warehouses"

import {
  STORE_MODULE_NAME as GOODS_STORE_MODULE_NAME,
  MUTATIONS_KEYS as GOODS_MUTATIONS_KEYS,
  ACTIONS_KEYS as GOODS_ACTIONS_KEYS,
} from '@/utils/goods'

const TABS = Object.freeze({
  details: 'details',
  goods: 'goods'
})

export default {
  name: 'th-pq-warehouses-catalog-item',

  components: { Scaffold, Details, Goods },

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

  methods: {
    async fetchGoods() {
      this.$store.commit(`${GOODS_STORE_MODULE_NAME}/${GOODS_MUTATIONS_KEYS.SET_SUBORDINATE_WAREHOUSE}`, this.item)

      await this.$store.dispatch(`${GOODS_STORE_MODULE_NAME}/${GOODS_ACTIONS_KEYS.FETCH_LIST}`)
      await this.$store.dispatch(
        `${GOODS_STORE_MODULE_NAME}/${GOODS_ACTIONS_KEYS.FETCH_SUBORDINATE_LIST}`,
        { visible: false }
      )
    },

    handleEdit() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: EDIT_DIALOG_TYPES.EDIT
      })
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
      title: this.$t('forms.common.pqWarehouse'),
      handler: handleClickTab,
    }, {
      name: TABS.goods,
      title: this.$t('forms.common.goods'),
      handler: handleClickTab,
    }]

    this.fetchGoods()
  },

  watch: {
    item() {
      this.fetchGoods()
    }
  }
}
</script>
