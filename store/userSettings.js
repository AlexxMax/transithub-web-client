import { VIEWS } from '@/utils/vehiclesRegisters'

export const state = () => ({
  vehiclesRegisters: {
    list: {
      view: VIEWS.default
    }
  },
  races: {
    list: {
      view: VIEWS.default
    }
  }
})

export const mutations = {
  SET_VEHICLES_REGISTERS_LIST_VIEW(state, view) {
    state.vehiclesRegisters.list.view = view
  },
  SET_RACES_LIST_VIEW(state, view) {
    state.races.list.view = view
  }
}
