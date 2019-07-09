<template>
  <PagePattern>
    <VehiclesList :list="$store.state.vehicles.list" @fetch="fetch"/>
  </PagePattern>
</template>

<script>
import PagePattern from "@/components/Common/Pattern"
import VehiclesList from "@/components/Vehicles/VehiclesList"

import { STORE_MODULE_NAME, ACTIONS_KEYS, MUTATIONS_KEYS } from '@/utils/vehicles'

import {
  STORE_MODULE_NAME as VEHICLES_TYPES_STORE_MODULE_NAME,
  ACTIONS_KEYS as VEHICLES_TYPES_ACTIONS_KEYS
} from "@/utils/vehiclesTypes"

export default {
  components: {
    PagePattern,
    VehiclesList
  },

  methods: {
    async fetch() {
      await this.$store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
        this.$store.state.companies.currentCompany.guid
      )
    },

    async busListener() {
      this.$store.commit(`${STORE_MODULE_NAME}/${MUTATIONS_KEYS.SET_OFFSET}`, 0)
      await this.fetch()
    }
  },

  fetch({ store }) {
    return Promise.all([
      store.dispatch(
        `${STORE_MODULE_NAME}/${ACTIONS_KEYS.FETCH_LIST}`,
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
