<template>
  <Catalog
    :active-item="activeItem"
    :items="items"
    :loaded-count="items.length"
    :all-count="count"
    :loading-more="loading"
    @create="handleCreate"
    @select="handleSelect"
    @close-active-item="handleCloseActiveItem"
    @load-more="handleLoadMore"
  />
</template>

<script>
import Catalog from '@/components/PQWarehouses/PQWarehousesCatalog'

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

import {
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from '@/utils/pq.warehouses'

export default {
  mixins: [screen(SCREEN_TRIGGER_SIZES.lg)],

  components: { Catalog },

  computed: {
    title () {
    	return this.$t('forms.common.pqWarehouses') + ' - Transithub'
    },

    activeItem:{
      get() {
        return this.$store.state[STORE_MODULE_NAME].item
      },
      set(value) {
        this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_ITEM}`, value)
      }
    },

    items() {
      return this.$store.state[STORE_MODULE_NAME].list
    },

    loading() {
      return this.$store.state[STORE_MODULE_NAME].loading
    },

    count() {
      return this.$store.state[STORE_MODULE_NAME].count
    },

    userHasCompany() {
      return !!this.$store.state.companies.currentCompany.guid;
    }
  },

  methods: {
    async busListener() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_OFFSET}`, 0)
      this.activeItem = null
      await this.fetch()
    },

    async fetch() {
      await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
        this.$store.state.companies.currentCompany.guid
      );
    },

    handleCreate() {
      if (this.userHasCompany) {
        this.$store.dispatch(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SHOW_EDIT_DIALOG}`, {
          show: true,
          type: EDIT_DIALOG_TYPES.CREATE
        })
      } else {
        this.$store.commit(
          `${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY}`,
          true
        );
      }
    },

    handleSelect(item) {
      if (this.$_smallDeviceMixin_isDeviceSmall) {
        this.$router.push(this.$i18n.path(`workspace/pq-warehouses/${item.guid}`))
      } else {
        this.activeItem = item
      }
    },

    handleCloseActiveItem() {
      this.activeItem = null
    },

    async handleLoadMore() {
      const { limit, offset } = this.$store.state[STORE_MODULE_NAME]
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_OFFSET}`, offset + limit)
      await this.fetch()
    }
  },

  async fetch({ store }) {
    store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_OFFSET}`, 0)
    await store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`)
  },

  head() {
    return {
      title: this.title
    }
  },

  mounted() {
    // Bus
    this.$bus.companies.currentCompanyChanged.on(this.busListener)
  },

  beforeDestroy() {
    // Bus
    this.$bus.companies.currentCompanyChanged.off(this.busListener)
  }
}
</script>
