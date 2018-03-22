export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('goods/load')
    await dispatch('points/load')
    await dispatch('warehouses/load')
    await dispatch('orders/load')
  }
}
