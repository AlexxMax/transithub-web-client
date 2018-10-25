import { VIEWS } from '@/utils/vehiclesRegisters'
import {
  setNavmenuCollapseState as setCookieNavmenuCollapseState,
  setVehiclesRegistesListGroups as setCookieVehiclesRegistesListGroups
} from '@/utils/cookies'

export const state = () => ({
  navmenu: {
    collapse: true
  },
  vehiclesRegisters: {
    list: {
      groups: []
    }
  },
  races: {
    list: {
      groups: []
    }
  }
})

export const getters = {
  isVehiclesRegistersListGrouped(state) {
    return state.vehiclesRegisters.list.groups.filter(item => item.use).length > 0
  },
  isRacesListGrouped(state) {
    return state.races.list.groups.filter(item => item.use).length > 0
  }
}

export const mutations = {
  SET_NAVMENU_COLLAPSE (state, value) {
    state.navmenu.collapse = value
  },
  SET_VEHICLES_REGISTERS_LIST_GROUPS(state, groups) {
    state.vehiclesRegisters.list.groups = groups
  },
  SET_RACES_LIST_GROUPS(state, groups) {
    state.races.list.groups = groups
  }
}

export const actions = {
  toggleNavmenu({ commit }, value) {
    commit('SET_NAVMENU_COLLAPSE', value)
    setCookieNavmenuCollapseState(value)
  },
  // setVehiclesRegistersListGroups({ commit }, groups) {
  //   commit('SET_VEHICLES_REGISTERS_LIST_GROUPS', groups)
  //   setCookieVehiclesRegistesListGroups(groups)

  //   this.$router.push({
  //     path: $nuxt._route.path,
  //     query: {
  //       vh_grouped: true
  //     }
  //   })
  // }
}
