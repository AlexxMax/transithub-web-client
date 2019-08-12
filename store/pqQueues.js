import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { MUTATIONS_KEYS, ACTIONS_KEYS, EDIT_DIALOG_TYPES } from '@/utils/pq.queues'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: [],
  count: 0,
  loading: false,
  limit: PAGE_SIZE,
  offset: OFFSET,
  item: {},

  editing: {
    type: EDIT_DIALOG_TYPES.CREATE,
    showEditDialog: false,
    showInaccessibleFunctionalityDialog: false
  }
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

  [MUTATIONS_KEYS.SET_ITEM](state, item) {
    state.item = item
  },

  [MUTATIONS_KEYS.CLEAR_LIST](state) {
    state.list = []
  },

  [MUTATIONS_KEYS.APPEND_TO_LIST](state, items) {
    state.list = [ ...state.list, ...items]
  },

  [MUTATIONS_KEYS.PREPEND_TO_LIST](state, item) {
    state.list = [item, ...state.list]
  },

  [MUTATIONS_KEYS.UPDATE_ITEM_IN_LIST](state, item) {
    // let queue = state.list.find(element => element.guid === item.guid)
    // if (queue) {
    //   queue = { ...item }
    // }

    const index = state.list.findIndex(element => element.guid === item.guid)
    if (index) {
      state.list.splice(index, 1, item)
    }
  },

  [MUTATIONS_KEYS.SHOW_EDIT_DIALOG](state, show) {
    state.editing.showEditDialog = show
  },

  [MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE](state, type) {
    state.editing.type = type
  },

  [MUTATIONS_KEYS.SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY](state, value) {
    state.editing.showInaccessibleFunctionalityDialog = value
  }
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({commit, state}, companyGuid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, count, items } = await this.$api.parkingQueueQueues.getQueues(
        companyGuid,
        state.limit,
        state.offset
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

  async [ACTIONS_KEYS.FETCH_ITEM]({ commit }, { companyGuid, queueGuid }) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, item } = await this.$api.parkingQueueQueues.getQueue(companyGuid, queueGuid)
      if (status) {
        commit(MUTATIONS_KEYS.SET_ITEM, item)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.CHANGE_ITEM]({ commit }, { guid, payload }) {
    let errorKey

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, err, item } = await this.$api.parkingQueueQueues.changeQueue(guid, payload)
      if (status) {
        commit(MUTATIONS_KEYS.UPDATE_ITEM_IN_LIST, item )
        commit(MUTATIONS_KEYS.SET_ITEM, item)
      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  },

  async [ACTIONS_KEYS.CREATE_ITEM]({ commit, state }, payload) {
    let errorKey

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, err, item } = await this.$api.parkingQueueQueues.createQueue(payload)
      if (status) {
        commit(MUTATIONS_KEYS.PREPEND_TO_LIST, item)
        commit(MUTATIONS_KEYS.SET_COUNT, state.count + 1)
      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  },

  [ACTIONS_KEYS.SHOW_EDIT_DIALOG]({ commit }, { show, type }) {
    commit(MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE, type)
    commit(MUTATIONS_KEYS.SHOW_EDIT_DIALOG, show)
  },
}