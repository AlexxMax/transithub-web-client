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
    </div>
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/Common/FormElements/FormScaffold'
import Details from '@/components/PQQueueProfiles/PQQueueProfilesCatalogItemDetails'

import {
  STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES,
  ACTIONS_KEYS
} from "@/utils/pq.queueProfiles"

const TABS = Object.freeze({
  details: 'details',
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

  methods: {
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
      title: this.$t('forms.common.pqQueueProfile'),
      handler: handleClickTab,
    }]
  },
}
</script>
