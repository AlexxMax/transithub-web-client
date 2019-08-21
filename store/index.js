import {
  getToken as getCookiesToken,
  getUserId as getCookieUserId
} from '@/utils/_cookies'

import {
  STORE_MODULE_NAME as DRIVER_STORE_MODULE_NAME,
  ACTIONS_KEYS as DRIVER_ACTIONS_KEYS
} from '@/utils/driver'

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
  async nuxtServerInit({ commit, dispatch }, context) {
    const { req, redirect, route, app, store } = context

    const userGuid = getCookieUserId(req)
    const userToken = getCookiesToken(req)
    commit('user/SET_TOKEN', userToken)
    commit('user/SET_GUID', userGuid)

    /*
    Nuxt.js has a bug, it makes requests to server to get assets
    and calls nuxtServerInit multiple times.
    If context.route.path has a substring 'assets',
    then no code must be evaluated.
    Also, due to middleware redirects, based on fact that user is logged,
    there is need to set userGuid.
    */
    if (!route.path.includes('assets')
      || !route.path.includes('fonts')
      || !route.path.includes('js'))
    {
      if (userGuid && userToken) {
        const isOK = await dispatch('user/getUserInfo')
        if (isOK) {
          const isDriver = store.state.user.isDriver
          if (isDriver) {
            await dispatch(`${DRIVER_STORE_MODULE_NAME}/${DRIVER_ACTIONS_KEYS.FETCH_DRIVER}`)
          } else {
            await dispatch('companies/getUsersCompanies', { req, userGuid })

            // Filters
            commit('requests/SET_FILTERS', this.$cookies.automobileRequests.getFilters(req))
            commit('vehiclesRegisters/SET_FILTERS', this.$cookies.automobileVehiclesRegisters.getFilters(req))
            commit('races/SET_FILTERS', this.$cookies.automobileRaces.getFilters(req))
            commit('railwayAggregations/SET_FILTERS', this.$cookies.railwayAggregations.getFilters(req))
            commit('railwayRequests/SET_FILTERS', this.$cookies.railwayRequests.getFilters(req))
            commit('railwayStations/SET_CATALOG_FILTERS', this.$cookies.railwayStations.getFilters(req))
          }
        } else {
          dispatch('user/userLogout')
        }
      }
    }
  }
}
