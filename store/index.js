import {
  getToken as getCookiesToken,
  getUserId as getCookieUserId,
  getNavmenuCollapseState as getCookieNavmenuCollapseState,
  getVehiclesRegistesListGroups as getCookieVehiclesRegistesListGroups
} from '@/utils/_cookies'

export const state = () => ({
  locales: ['ua', 'ru'],
  locale: 'ua',
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    const userGuid = getCookieUserId(req)
    const userToken = getCookiesToken(req)
    commit('user/SET_TOKEN', userToken)
    commit('user/SET_GUID', userGuid)

    if (userGuid && userToken) {
      await Promise.all([
        dispatch('user/getUserInfo'),
        dispatch('companies/getUsersCompanies', { req, userGuid }),
        // dispatch('goods/load')
      ])
    }

    // Filters
    commit('requests/SET_FILTERS', this.$cookies.automobileRequests.getFilters(req))
    commit('vehiclesRegisters/SET_FILTERS', this.$cookies.automobileVehiclesRegisters.getFilters(req))
    commit('races/SET_FILTERS', this.$cookies.automobileRaces.getFilters(req))
    commit('railwayAggregations/SET_FILTERS', this.$cookies.railwayAggregations.getFilters(req))
    commit('railwayRequests/SET_FILTERS', this.$cookies.railwayRequests.getFilters(req))
    commit('companies/SET_GLOBAL_FILTER', this.$cookies.companiesGlobalFilter.getFilters(req))

    // Navigation
    commit('userSettings/SET_NAVMENU_COLLAPSE', getCookieNavmenuCollapseState(req))
  }
}
