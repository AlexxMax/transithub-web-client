import { VIEWS } from '@/utils/vehiclesRegisters'
import { setNavmenuCollapseState as setCookieNavmenuCollapseState } from '@/utils/cookies'

export const state = () => ({
  navmenu: {
    collapse: true
  },
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
  SET_NAVMENU_COLLAPSE (state, value) {
    state.navmenu.collapse = value
  },
  SET_VEHICLES_REGISTERS_LIST_VIEW(state, view) {
    state.vehiclesRegisters.list.view = view
  },
  SET_RACES_LIST_VIEW(state, view) {
    state.races.list.view = view
  }
}

export const actions = {
  toggleNavmenu({ commit }, value) {
    commit('SET_NAVMENU_COLLAPSE', value)
    setCookieNavmenuCollapseState(value)
  }
}
