import {
  getToken as getCookiesToken,
  getUserId as getCookieUserId,
  getNavmenuCollapseState as getCookieNavmenuCollapseState,
  getVehiclesRegistesListGroups as getCookieVehiclesRegistesListGroups
} from '@/utils/cookies'

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
    commit('user/SET_TOKEN', getCookiesToken(req))
    commit('user/SET_GUID', userGuid)

    await Promise.all([
      dispatch('user/getUserInfo'),
      dispatch('companies/getUsersCompanies', { req, userGuid }),
      dispatch('goods/load')
    ])

    commit('userSettings/SET_NAVMENU_COLLAPSE', getCookieNavmenuCollapseState(req))
  }
}
