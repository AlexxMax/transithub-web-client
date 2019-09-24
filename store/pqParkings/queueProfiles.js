import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import {
  QUEUE_PROFILES_MUTATIONS_KEYS as MUTATIONS_KEYS,
  QUEUE_PROFILES_ACTIONS_KEYS as ACTIONS_KEYS
} from '@/utils/pq.parkings'

import * as notify from '@/utils/notifications'

export const state = () => ({
  list: [],
  item: null,
  count: 0,
  loading: false,
  loadingBind: false,
  limit: PAGE_SIZE,
  offset: OFFSET
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

  [MUTATIONS_KEYS.SET_BIND_LOADING](state, loading) {
    state.loadingBind = loading
  }
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit, state, rootState }, parkingGuid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, count, items } = await this.$api.parkingQueueProfilesParkings.getQueueProfilesParkings(
        state.offset,
        state.limit,
        rootState.companies.currentCompany.guid,
        parkingGuid
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

  async [ACTIONS_KEYS.BIND_QUEUE_PROFILE_WITH_PARKING]({ commit, state }, queueProfileGuid) {
    let errorKey
    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {
      const { status, item, err } = await this.$api.parkingQueueProfilesParkings.bindQueueProfileWithParking(queueProfileGuid)

      if (status) {
        notify.success($nuxt.$t('forms.pqQueueProfiles.messages.queueProfileSelected'))
        commit(MUTATIONS_KEYS.PREPEND_TO_LIST, item)
        commit(MUTATIONS_KEYS.SET_COUNT, state.count + 1)
      }
      else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, false)
    return errorKey
  },

  async [ACTIONS_KEYS.UNBIND_QUEUE_PROFILE_WITH_PARKING]({ commit, state }, queueProfileGuid) {
    let errorKey
    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {
      const { status, err } = await this.$api.parkingQueueProfilesParkings.unbindQueueProfileWithParking(queueProfileGuid)

      if (status) {
        notify.success($nuxt.$t('forms.pqQueueProfiles.messages.queueProfileRemoved'))
        commit(MUTATIONS_KEYS.SET_LIST, state.list.filter(item => item.queueProfileGuid !== queueProfileGuid))
        commit(MUTATIONS_KEYS.SET_COUNT, state.count - 1)
      }
      else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_BIND_LOADING, false)
    return errorKey
  },

  async [ACTIONS_KEYS.CREATE_ITEM]({ commit, dispatch }, payload) {
    let errorKey

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, err, item } = await this.$api.parkingQueueProfiles.createQueueProfile(payload)
      if (status) {
        notify.success($nuxt.$t('forms.pqQueueProfiles.messages.queueProfileCreated'))
        await dispatch(ACTIONS_KEYS.BIND_QUEUE_PROFILE_WITH_PARKING, item.guid)
      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  }
}