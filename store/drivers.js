import {
  complementRequest
} from '@/utils/http'

import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

export const state = () => ({
  list: [],
  count: 0
})

export const getters = {
  getBreadcrumb: state => guid => {
    const driver = state.list.find(elem => elem.guid === guid)
    return driver ? driver.title : ''
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
  setDriverInList(state, newDriver) {
    let driver = state.list.find((elem) => elem.guid === newDriver.guid)
    if (driver) {
      driver = newDriver
    } else {
      state.list.push(newDriver)
    }
  }
}

export const actions = {
  async load({
    commit,
    rootGetters
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
        url: '/api1/transithub/drivers',
        params: {
          limit,
          offset,
          workspace: rootGetters['companies/getCurrentCompanyWorkspaceName']
        }
      }))

      commit('setList', items)
      // for (const item of items) {
      //   commit('add', item);
      // }

      commit('setCount', count)
    } catch (e) {
      console.log(e.toString());
    }
  },

  async loadElement({
    commit,
    rootGetters
  }, guid) {
    try {
      const {
        data: {
          items,
          count
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/transithub/drivers',
        params: {
          guid,
          workspace: rootGetters['companies/getCurrentCompanyWorkspaceName']
        }
      }))

      let driver = {}
      if (items.length > 0) {
        driver = items[0]
        commit('setDriverInList', driver)
      }
      commit('setCount', count)

      return driver
    } catch (e) {
      console.log(e.toString())
      return {}
    }
  }
}
