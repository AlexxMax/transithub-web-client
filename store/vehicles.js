import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { MUTATIONS_KEYS, ACTIONS_KEYS, EDIT_DIALOG_TYPES, GETTERS_KEYS } from '@/utils/vehicles'
import { showErrorMessage } from '@/utils/messages'
import { TABLE_NAMES } from '@/utils/constants'

const setItemIsFavoriteValue = (state, guid, value) => {
  if (state.item.guid === guid) {
    state.item.isFavorite = value
  }

  const listItem = state.list.find(item => item.guid === guid)
  if (listItem) {
    listItem.isFavorite = value
  }
}

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

export const getters = {
  [ GETTERS_KEYS.TRUCKS ]: state => state.list.filter(item => !item.isTrailer),
  [ GETTERS_KEYS.TRAILERS ]: state => state.list.filter(item => item.isTrailer)
}

export const  mutations = {
  [ MUTATIONS_KEYS.APPEND_TO_LIST ] (state, items) {
    state.list = [ ...state.list, ...items ]
  },

  [MUTATIONS_KEYS.PREPEND_TO_LIST](state, item) {
    state.list = [item, ...state.list]
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

  [MUTATIONS_KEYS.SHOW_EDIT_DIALOG](state, show) {
    state.editing.showEditDialog = show
  },

  [MUTATIONS_KEYS.UPDATE_ITEM_IN_LIST](state, item) {
    const index = state.list.findIndex(element => element.guid === item.guid)
    if (index) {
      state.list.splice(index, 1, item)
    }
  },

  [MUTATIONS_KEYS.CLEAR_ITEM](state) {
    state.item = {}
  },

  [MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE](state, type) {
    state.editing.type = type
  },

  // BOOKMARKS
  [MUTATIONS_KEYS.ADD_ITEM_TO_BOOKMARKS](state, guid) {
    setItemIsFavoriteValue(state, guid, true)
  },

  [MUTATIONS_KEYS.REMOVE_ITEM_FROM_BOOKMARKS](state, guid) {
    setItemIsFavoriteValue(state, guid, false)
  },
  SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY(state, value) {
    state.editing.showInaccessibleFunctionalityDialog = value
  }
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit, state }, companyGuid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, count, items } = await this.$api.vehicles.getVehicles(companyGuid, state.limit, state.offset)
      if (status) {
        commit(MUTATIONS_KEYS.APPEND_TO_LIST, items)
        commit(MUTATIONS_KEYS.SET_COUNT, count)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.FETCH_ITEM]({ commit }, { companyGuid, vehicleGuid }) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, item } = await this.$api.vehicles.getVehicle(companyGuid, vehicleGuid)
      if (status) {
        commit(MUTATIONS_KEYS.SET_ITEM, item)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.CREATE_ITEM]({ commit, state }, { companyGuid, payload }) {
    let errorKey

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, err, item } = await this.$api.vehicles.createVehicle(companyGuid, payload)
      if (status) {
        commit(MUTATIONS_KEYS.PREPEND_TO_LIST, item)
        commit(MUTATIONS_KEYS.SET_COUNT, state.count + 1)
      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  },

  async [ACTIONS_KEYS.CHANGE_ITEM]({ commit }, { companyGuid, vehicleGuid, payload }) {
    let errorKey

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, err, item } = await this.$api.vehicles.changeVehicle(companyGuid, vehicleGuid, payload)
      if (status) {
        commit(MUTATIONS_KEYS.UPDATE_ITEM_IN_LIST, item)
        commit(MUTATIONS_KEYS.SET_ITEM, item)
      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  },

  [ACTIONS_KEYS.SHOW_EDIT_DIALOG]({ commit }, { show, type }) {
    commit(MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE, type)
    commit(MUTATIONS_KEYS.SHOW_EDIT_DIALOG, show)
  },

  // BOOKMARKS
  async [ACTIONS_KEYS.ADD_ITEM_TO_BOOKMARKS]({ commit }, guid) {
    try {
      const { status } = await this.$api.favorites.postFavorite(guid, TABLE_NAMES.autoVehicle)
      if (status) {
        commit(MUTATIONS_KEYS.ADD_ITEM_TO_BOOKMARKS, guid)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async [ACTIONS_KEYS.REMOVE_ITEM_FROM_BOOKMARKS]({ commit }, guid) {
    try {
      const { status } = await this.$api.favorites.deleteFavorite(guid, TABLE_NAMES.autoVehicle)
      if (status) {
        commit(MUTATIONS_KEYS.REMOVE_ITEM_FROM_BOOKMARKS, guid)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  }
}
