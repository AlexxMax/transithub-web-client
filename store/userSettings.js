import { VIEWS } from '@/utils/vehiclesRegisters'

export const state = () => ({
  vehiclesRegisters: {
    list: {
      view: VIEWS.default
    }
  }
})

export const mutations = {
  SET_VEHICLES_REGISTERS_LIST_VIEW(state, view) {
    state.vehiclesRegisters.list.view = view
  }
}
