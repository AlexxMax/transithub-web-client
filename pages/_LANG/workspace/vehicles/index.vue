<template>
  <PagePattern>
    <VehiclesList
      :list-trucks="$store.state.vehicles.listTrucks"
      :list-trailers="$store.state.vehicles.listTrailers"
      @fetch="fetch"
    />
  </PagePattern>
</template>

<script>
import PagePattern from "@/components/Common/Pattern"
import VehiclesList from "@/components/Vehicles/VehiclesList"

import { STORE_MODULE_NAME, ACTIONS_KEYS, MUTATIONS_KEYS, LIST_TYPES } from '@/utils/vehicles'

import {
  STORE_MODULE_NAME as VEHICLES_TYPES_STORE_MODULE_NAME,
  ACTIONS_KEYS as VEHICLES_TYPES_ACTIONS_KEYS
} from "@/utils/vehiclesTypes"

export default {
  components: {
    PagePattern,
    VehiclesList
  },

  computed: {
    title () {
    	return this.$t('forms.common.vehicles') + ' - Transithub'
  	}
  },

  methods: {
    async fetch(listType = null) {
      const apiMethods = []

      if (listType === LIST_TYPES.TRUCK || listType === null) {
       apiMethods.push(this.$store.dispatch(
          `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_TRUCKS_LIST}`,
          this.$store.state.companies.currentCompany.guid
        ))
      }

      if (listType === LIST_TYPES.TRAILER || listType === null) {
        apiMethods.push(this.$store.dispatch(
          `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_TRAILERS_LIST}`,
          this.$store.state.companies.currentCompany.guid
        ))
      }

      await Promise.all(apiMethods)
    },

    async busListener() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_TRUCKS_OFFSET}`, 0)

      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_TRAILERS_OFFSET}`, 0)

      await this.fetch()
    }
  },

  head () {
    return {
      title: this.title
    }
  },

  fetch({ store }) {
    return Promise.all([
      store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_TRUCKS_LIST}`,
        store.state.companies.currentCompany.guid
      ),

      store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_TRAILERS_LIST}`,
        store.state.companies.currentCompany.guid
      ),

      store.dispatch(
        `${VEHICLES_TYPES_STORE_MODULE_NAME}/${
          VEHICLES_TYPES_ACTIONS_KEYS.FETCH_LIST
        }`
      )
    ])
  },

  mounted() {
    // Bus
    this.$bus.companies.currentCompanyChanged.on(this.busListener)
  },

  beforeDestroy() {
    // Bus
    this.$bus.companies.currentCompanyChanged.off(this.busListener)
  }
};
</script>
