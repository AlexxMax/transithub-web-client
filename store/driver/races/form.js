import _ from 'lodash'
import moment from 'moment'

import {
  defaultRaceFormData,
  CREATION_TYPES,
  RACE_FORM_STEPS,
  MUTATIONS_KEYS,
  ACTIONS_KEYS
} from "@/utils/driver"
import { PAGE_SIZE, OFFSET } from "@/utils/defaultValues"
import * as notify from '@/utils/notifications'

export const state = () => ({
  activeStep: null,
  previousStep: null,

  modified: false,
  modifiedDate: null,

  creationType: null,

  vehiclesRegisters: {
    loading: false,
    offset: OFFSET,
    count: 0,
    items: null
  },

  data: { ...defaultRaceFormData }
});

export const mutations = {
  [MUTATIONS_KEYS.SET_RACE_FORM_ACTIVE_STEP](state, step) {
    state.activeStep = step;
  },

  [MUTATIONS_KEYS.SET_RACE_FORM_PREVIOUS_STEP](state, step) {
    state.previousStep = step
  },

  [MUTATIONS_KEYS.SET_RACE_FORM_MODIFICATION](state, modified) {
    state.modified = modified;
  },

  [MUTATIONS_KEYS.SET_RACE_FORM_CREATION_TYPE](state, type) {
    state.creationType = type
  },

  [MUTATIONS_KEYS.SET_RACE_FORM_VEHICLES_REGISTERS](state, { items, count }) {
    state.vehiclesRegisters.items = state.vehiclesRegisters.items ? [ ...state.vehiclesRegisters.items, ...items ] : items
    state.vehiclesRegisters.count = count
  },
  [MUTATIONS_KEYS.SET_RACE_FORM_VEHICLES_REGISTERS_LOADING](state, loading) {
    state.vehiclesRegisters.loading = loading
  },
  [MUTATIONS_KEYS.SET_RACE_FORM_VEHICLES_REGISTERS_OFFSET](state, offset) {
    state.vehiclesRegisters.offset = offset
  },

  [MUTATIONS_KEYS.UPDATE_RACE_FORM](state, data) {
    let dataCompare = data
    let defaultRaceFormDataCompare = defaultRaceFormData

    delete defaultRaceFormDataCompare.certSerialNumber
    delete dataCompare.certSerialNumber

    state.modified = !_.isEqual(dataCompare, defaultRaceFormDataCompare)
    state.modified ? state.modifiedDate = new Date() : null

    state.data = { ...state.data, ...data }
  },

  [MUTATIONS_KEYS.RESET_RACE_FORM](state) {
    state.data = { ...defaultRaceFormData }
    state.modified = false
    state.modifiedDate = null
  }
};

export const actions = {
  async [ACTIONS_KEYS.FETCH_VEHICLES_REGISTERS]({ commit, state }, more = null) {

    if (more) {
      commit(MUTATIONS_KEYS.SET_RACE_FORM_VEHICLES_REGISTERS_OFFSET, state.vehiclesRegisters.offset + PAGE_SIZE)
    }

    commit(MUTATIONS_KEYS.SET_RACE_FORM_VEHICLES_REGISTERS_LOADING, true)

    try {

      const now = new Date()
      const { status, count, items } = await this.$api.vehiclesRegisters.getVehiclesRegistersForDriver(
        PAGE_SIZE,
        state.vehiclesRegisters.offset,
        moment(now).subtract(1, 'd').format('DD.MM.YYYY'),
        moment(now).add(3, 'd').format('DD.MM.YYYY')
      )

      if (status) {
        commit(MUTATIONS_KEYS.SET_RACE_FORM_VEHICLES_REGISTERS, { items, count })
      }

      commit(MUTATIONS_KEYS.SET_RACE_FORM_VEHICLES_REGISTERS_LOADING, false)

      return { status, count, items }

    } catch ({ message }) {
      notify.error(message)

      commit(MUTATIONS_KEYS.SET_RACE_FORM_VEHICLES_REGISTERS_LOADING, false)


      return { status }
    }

  }
}
