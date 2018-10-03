import {
  getToken as getCookiesToken,
  getUserId as getCookieUserId,
  getNavmenuCollapseState as getCookieNavmenuCollapseState
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
    commit('user/SET_TOKEN', getCookiesToken(req))
    commit('user/SET_GUID', getCookieUserId(req))
    await dispatch('user/getUserInfo')

    commit('userSettings/SET_NAVMENU_COLLAPSE', getCookieNavmenuCollapseState(req))

    await dispatch('companies/getUsersCompanies', {req})
  }
}
