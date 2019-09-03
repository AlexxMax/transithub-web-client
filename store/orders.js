import {
  complementRequest
} from '@/utils/http'

import {
  PAGE_SIZE,
  OFFSET
} from '@/utils/defaultValues'

export const state = () => ({
  list: [],
  count: 0
})

export const getters = {
  getBreadcrumb: state => guid => {
    const order = state.list.find(elem => elem.guid === guid)
    return order ? `${order.number} - ${order.created_at}` : ''
  }
}

export const mutations = {
  clear(state) {
    state.list = []
  },
  setList(state, list) {
    state.list = list
  },
  add(state, item) {
    state.list.push({
      ...item
    })
  },
  remove(state, {
    item
  }) {
    state.list.splice(state.list.indexOf(item), 1)
  },
  setCount(state, count) {
    state.count = count
  },
  setOrderInList(state, newOrder) {
    let order = state.list.find((elem) => elem.guid === newOrder.guid)
    if (order) {
      order = newOrder
    } else {
      state.list.push(newOrder)
    }
  },
  setOrderSchedule(state, { orderGuid, items, count }) {
    const order = state.list.find((elem) => elem.guid === orderGuid)
    if (order) {
      order._schedule = {
        count,
        items
      }
    }
  }
}

export const actions = {
  async load({
    commit,
    dispatch,
    rootState
  }, params = { limit: PAGE_SIZE, offset: OFFSET }) {
    const { limit, offset } = params

    commit('clear')

    try {
      const {
        data: {
          items,
          count
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/order',
        params: {
          limit,
          offset,
        }
      }, this))
      for (const item of items) {
        commit('add', item)
      }
      commit('setCount', count)
    } catch (e) {
      console.log(e.toString())
    }
  },

  async loadElement({
    commit,
    dispatch
  }, guid) {
    try {
      const {
        data: {
          items,
          count
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/order',
        params: {
          guid
        }
      }, this))

      let order = {}
      if (items.length > 0) {
        order = items[0]
        commit('setOrderInList', order)
        order = await dispatch('loadSchedule', order.guid)
      }
      commit('setCount', count)

      return order
    } catch (e) {
      console.log(e.toString())
      return {}
    }
  },

  async loadSchedule({
    commit,
    state
  }, orderGuid) {
    const {
      data: {
        items,
        count
      }
    } = await this.$axios(complementRequest({
      method: 'get',
      url: '/api1/order/schedule',
      params: {
        order_guid: orderGuid
      }
    }, this))

    commit('setOrderSchedule', { orderGuid, items, count })

    return state.list.find(elem => elem.guid === orderGuid)
  }
}
