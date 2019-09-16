import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import {
  WAREHOUSES_MUTATIONS_KEYS as MUTATIONS_KEYS,
  WAREHOUSES_ACTIONS_KEYS as ACTIONS_KEYS
} from '@/utils/pq.queueProfiles'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: [],
  count: 0,
  loading: false,
  limit: PAGE_SIZE,
  offset: OFFSET,
})

export const mutations = {
  [MUTATIONS_KEYS.SET_LIST](state, list) {
    state.list = list
  },

  [MUTATIONS_KEYS.SET_COUNT](state, count) {
    state.count = count
  },

  [MUTATIONS_KEYS.SET_LOADING](state, loading) {
    state.loading = loading
  },

  [MUTATIONS_KEYS.SET_OFFSET](state, offset) {
    state.offset = offset
  },

  [MUTATIONS_KEYS.CLEAR_LIST](state) {
    state.list = []
  },

  [MUTATIONS_KEYS.APPEND_TO_LIST](state, items) {
    state.list = [...state.list, ...items]
  },

  [MUTATIONS_KEYS.PREPEND_TO_LIST](state, item) {
    state.list = [item, ...state.list]
  },
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit, state, rootState }, queueProfileGuid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    //try {
      const { status, count, items } = await this.$api.parkingQueueWarehouses.getPQWarehouses(
        state.offset,
        state.limit,
        rootState.companies.currentCompany.guid,
        queueProfileGuid
      )
      if (status) {
        if (state.offset === 0) {
          commit(MUTATIONS_KEYS.SET_LIST, items)
        } else {
          commit(MUTATIONS_KEYS.APPEND_TO_LIST, items)
        }
        commit(MUTATIONS_KEYS.SET_COUNT, count)
      }
    // } catch ({ message }) {
    //   notify.error(message)
    // }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },
}
