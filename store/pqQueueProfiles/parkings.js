import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import {
  PARKINGS_MUTATIONS_KEYS as MUTATIONS_KEYS,
  PARKINGS_ACTIONS_KEYS as ACTIONS_KEYS
} from '@/utils/pq.queueProfiles'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: [],
  item: null,
  count: 0,
  loading: false,
  loadingBind: false,
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

  [MUTATIONS_KEYS.SET_BIND_LOADING](state, loading) {
    state.loadingBind = loading
  }
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit, state, rootState }, queueProfileGuid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, count, items } = await this.$api.parkingQueueProfilesParkings.getParkingsQueueProfiles(
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
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.BIND_PARKING_WITH_QUEUE_PROFILE]({ commit, state }, parkingGuid) {
    let errorKey
    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {
      const { status, item, err } = await this.$api.parkingQueueProfilesParkings.bindParkingWithQueueProfile(parkingGuid)

      if (status) {
        notify.success($nuxt.$t('forms.pqParkings.messages.parkingSelected'))
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

  async [ACTIONS_KEYS.UNBIND_PARKING_WITH_QUEUE_PROFILE]({ commit, state }, parkingGuid) {
    let errorKey
    commit(MUTATIONS_KEYS.SET_BIND_LOADING, true)

    try {
      const { status, err } = await this.$api.parkingQueueProfilesParkings.unbindParkingWithQueueProfile(parkingGuid)

      if (status) {
        notify.success($nuxt.$t('forms.pqParkings.messages.parkingRemoved'))
        commit(MUTATIONS_KEYS.SET_LIST, state.list.filter(item => item.parkingGuid !== parkingGuid))
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
      const { status, err, item } = await this.$api.parkingQueueParkings.createParking(payload)
      if (status) {
        notify.success($nuxt.$t('forms.pqParkings.messages.parkingCreated'))
        await dispatch(ACTIONS_KEYS.BIND_PARKING_WITH_QUEUE_PROFILE, item.guid)
      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  },
}
