import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { MUTATIONS_KEYS, ACTIONS_KEYS } from '@/utils/drivers'
import { showErrorMessage } from '@/utils/messages'

export const state = () => ({
  list: [],
  count: 0,
  loading: false,
  limit: PAGE_SIZE,
  offset: OFFSET,
  item: {}
})

export const mutations = {
  [ MUTATIONS_KEYS.APPEND_TO_LIST ] (state, items) {
    state.list = [ ...state.list, ...items ]
  },

  [ MUTATIONS_KEYS.SET_COUNT ] (state, count) {
    state.count = count
  },

  [ MUTATIONS_KEYS.SET_LOADING ] (state, loading) {
    state.loading = loading
  },

  [ MUTATIONS_KEYS.SET_OFFSET ] (state, offset) {
    state.offset = offset
  },

  [ MUTATIONS_KEYS.SET_ITEM ] (state, item) {
    state.item = item
  },

  [ MUTATIONS_KEYS.CLEAR_LIST ] (state) {
    state.list = []
  }
}

export const actions = {
  async [ ACTIONS_KEYS.FETCH_LIST ] ({ commit, state }, companyGuid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, count, items } = await this.$api.drivers.getDrivers(companyGuid, state.limit, state.offset)
      if (status) {
        commit(MUTATIONS_KEYS.APPEND_TO_LIST, items)
        commit(MUTATIONS_KEYS.SET_COUNT, count)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ ACTIONS_KEYS.FETCH_ITEM ] ({ commit }, { companyGuid, driverGuid }) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, item } = await this.$api.drivers.getDriver(companyGuid, driverGuid)
      if (status) {
        commit(MUTATIONS_KEYS.SET_ITEM, item)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  }
}
