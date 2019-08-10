<template>
  <FormPattern>
    <PQQueueForm/>
  </FormPattern>
</template>

<script>
import FormPattern from '@/components/Common/Pattern'
import PQQueueForm from '@/components/PQQueues/PQQueueForm'

import { STORE_MODULE_NAME, ACTIONS_KEYS } from '@/utils/pq.queues'

export default {
  components: {
    FormPattern,
    PQQueueForm
  },

  computed: {
    title () {
      const item = this.$store.state[STORE_MODULE_NAME].item
      return this.$t('forms.queue.pqQueue') + ': ' + item.name + ' - Transithub'
  	}
  },

  methods: {
    busListener() {
      this.$router.push(this.$i18n.path('workspace/pq-queues'))
    }
  },

  head () {
    return {
      title: this.title
    }
  },

  fetch({ store, route }) {
    return store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_ITEM}`, {
      companyGuid: store.state.companies.currentCompany.guid,
      queueGuid: route.params.guid
    })
  },

  beforeCreate() {
    if (!this.$store.state.pqQueues.item.guid) {
      this.$nuxt.error({ statusCode: 404, message: this.$t('messages.noPqQueue') })
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
