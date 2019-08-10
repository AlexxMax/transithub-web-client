<template>
  <FormPattern>
    <PQParkingFrom
      :parking="parking"
      @edit="handleEdit"
    />
  </FormPattern>
</template>

<script>
import FormPattern from '@/components/Common/Pattern'
import PQParkingFrom from '@/components/PQParkings/PQParkingForm'

import {
  STORE_MODULE_NAME,
  ACTIONS_KEYS,
  EDIT_DIALOG_TYPES
} from "@/utils/pq.parkings"

export default {
  components: {
    FormPattern,
    PQParkingFrom
  },

  computed: {
    title () {
      const item = this.$store.state[STORE_MODULE_NAME].item
    	return this.$t('forms.common.pqParking') + ': ' + item.name + ' - Transithub'
    },

    parking() {
      return this.$store.state[STORE_MODULE_NAME].item
    }
  },

  methods: {
    busListener() {
      this.$router.push(this.$i18n.path('workspace/pq-parkings'))
    },

    handleEdit() {
      this.$store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.SHOW_EDIT_DIALOG}`, {
        show: true,
        type: EDIT_DIALOG_TYPES.EDIT
      })
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
      parkingGuid: route.params.guid
    })
  },

  beforeCreate() {
    if (!this.$route.params.guid) {
      this.$nuxt.error({
        statusCode: 404,
        message: this.$t("messages.noPQParkings")
      });
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
