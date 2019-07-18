import {
  getToken as getCookiesToken,
  getUserId as getCookieUserId,
  getNavmenuCollapseState as getCookieNavmenuCollapseState,
  getVehiclesRegistesListGroups as getCookieVehiclesRegistesListGroups,
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
   if (!route.path.includes('assets')) {
      if (userGuid && userToken) {
        const isOK = await dispatch('user/getUserInfo')
        // if (!isOK) {
        //   const path = app.i18n.path('login')
        //   const locale = store.state.user.language
        //   redirect({
        //     path,
        //     params: {
        //       ...route.params,
        //       LANG: locale
        //     }
        //   })

        //   return
        // }

        await dispatch('companies/getUsersCompanies', { req, userGuid })

        // Filters
        commit('requests/SET_FILTERS', this.$cookies.automobileRequests.getFilters(req))
        commit('vehiclesRegisters/SET_FILTERS', this.$cookies.automobileVehiclesRegisters.getFilters(req))
        commit('races/SET_FILTERS', this.$cookies.automobileRaces.getFilters(req))
        commit('railwayAggregations/SET_FILTERS', this.$cookies.railwayAggregations.getFilters(req))
        commit('railwayRequests/SET_FILTERS', this.$cookies.railwayRequests.getFilters(req))
        // commit('companies/SET_GLOBAL_FILTER', this.$cookies.companiesGlobalFilter.getFilters(req))
        commit('railwayStations/SET_CATALOG_FILTERS', this.$cookies.railwayStations.getFilters(req))
      }
    }
  }
}
