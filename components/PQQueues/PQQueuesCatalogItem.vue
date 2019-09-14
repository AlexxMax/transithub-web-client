<template>
  <Scaffold
    :buttons="buttons"
    :show-back="showBack"
    :show-close="showClose"
    :embed="embed"
    @close="$emit('close')"
  >
    <div>
      <Details :item="item" :profile="profile"/>
    </div>
  </Scaffold>
</template>

<script>
import Scaffold from '@/components/Common/FormElements/FormScaffold'
import Details from '@/components/PQQueues/PQQueuesCatalogItemDetails'

import {
  STORE_MODULE_NAME,
  EDIT_DIALOG_TYPES,
  ACTIONS_KEYS
} from "@/utils/pq.queues"

export default {
  name: 'th-pq-queues-catalog-item',

  components: { 
    Scaffold,
    Details
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    showBack: Boolean,
    showClose: Boolean,
    embed: Boolean
  },

  methods: {
    handleEdit() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: EDIT_DIALOG_TYPES.EDIT
      })
    }
  },

  created() {
    this.buttons = [{
      name: 'edit',
      icon: 'pen',
      tooltip: this.$t('forms.common.edit'),
      handler: this.handleEdit
    }]
  }
}
</script>