import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import {
  QUEUES_MUTATIONS_KEYS as MUTATIONS_KEYS,
  QUEUES_ACTIONS_KEYS as ACTIONS_KEYS
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
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit, state, rootState }, profileGuid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, count, items } = await this.$api.parkingQueueQueues.getQueues(
        state.limit,
        state.offset,
        rootState.companies.currentCompany.guid,
        profileGuid
      )
      if (status) {
        if (state.offset === 0) {
          commit(MUTATIONS_KEYS.SET_LIST, items)
        } else {
          commit(MUTATIONS_KEYS.APPEND_TO_LIST, items)
        }
        commit(MUTATIONS_KEYS.SET_COUNT, count)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },
}
