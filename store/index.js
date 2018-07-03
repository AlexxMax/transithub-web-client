export const state = () => ({
  locales: ['ua', 'ru'],
  locale: 'ua'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    await dispatch('companies/getUsersCompanies', {req})
    // await dispatch('goods/load')
    // await dispatch('points/load')
    // await dispatch('warehouses/load')
    // await dispatch('orders/load')
    // await dispatch('drivers/load')
    // await dispatch('vehicles/load')
  }
}
