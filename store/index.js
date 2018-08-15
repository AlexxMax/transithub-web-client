import { getToken as getCookiesToken } from '@/utils/cookies'

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
    await dispatch('companies/getUsersCompanies', {req})
    // await dispatch('goods/load')
    // await dispatch('points/load')
    // await dispatch('warehouses/load')
    // await dispatch('orders/load')
    // await dispatch('drivers/load')
    // await dispatch('vehicles/load')
  }
}
