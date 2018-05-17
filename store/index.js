export const state = () => ({
  locales: ['en', 'ua', 'ru'],
  locale: 'en'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}

export const actions = {
  async nuxtServerInit({
    dispatch
  }) {
    // await dispatch('goods/load')
    // await dispatch('points/load')
    // await dispatch('warehouses/load')
    await dispatch('orders/load')
    // await dispatch('drivers/load')
    // await dispatch('vehicles/load')
  }
}
