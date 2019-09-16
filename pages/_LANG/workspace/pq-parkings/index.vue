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
import Catalog from '@/components/PQParkings/PQParkingsCatalog'

import { SCREEN_TRIGGER_SIZES, screen } from "@/mixins/smallDevice"

import { 
  STORE_MODULE_NAME, 
  ACTIONS_KEYS, 
  MUTATIONS_KEYS ,
  EDIT_DIALOG_TYPES
} from '@/utils/pq.parkings'

export default {
  mixins: [screen(SCREEN_TRIGGER_SIZES.lg)],

  components: { Catalog },

  computed: {
  	title () {
    	return this.$t('forms.common.pqParkings') + ' - Transithub'
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
    async fetch() {
      await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
        this.$store.state.companies.currentCompany.guid
      );
    },

    async busListener() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_OFFSET}`, 0)
      this.activeItem = null
      await this.fetch()
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
        )
      }
    },

    handleSelect(item) {
      if (this.$_smallDeviceMixin_isDeviceSmall) {
        this.$router.push(this.$i18n.path(`workspace/pq-parkings/${item.guid}`))
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

  head() {
    return {
      title: this.title
    }
  },

  async fetch({ store }) {
    const companyGuid = store.state.companies.currentCompany.guid

    store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_OFFSET}`, 0)
    await store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`, companyGuid)
  },

  mounted() {
    // Bus
    this.$bus.companies.currentCompanyChanged.on(this.busListener)
    this.activeItem = null
  },

  beforeDestroy() {
    // Bus
    this.$bus.companies.currentCompanyChanged.off(this.busListener)
  }
}
</script>
