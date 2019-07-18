import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { MUTATIONS_KEYS, ACTIONS_KEYS, EDIT_DIALOG_TYPES, GETTERS_KEYS } from '@/utils/vehicles'
import { showErrorMessage } from '@/utils/messages'
import { TABLE_NAMES } from '@/utils/constants'
import { filtersInit } from '@/utils/vehicles'
import { filtersSet } from '@/utils/storeCommon'

const FILTERS_SAVED_TABLE_NAME = 'vehicles'

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
  },
  filters: {
    set: { ...filtersInit },
    saved: {
      list: [],
      loading: false,
      fetched: false,
      loaders: []
    }
  },
  search: null
})

export const getters = {
  [ GETTERS_KEYS.TRUCKS ]: state => state.list.filter(item => !item.isTrailer),
  [ GETTERS_KEYS.TRAILERS ]: state => state.list.filter(item => item.isTrailer),
  [ GETTERS_KEYS.LIST_FILTERS_SET ] (state) {
    return filtersSet(state.filters.set)
  }
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
  },

  //FILTERS
  [MUTATIONS_KEYS.SET_FILTERS](state, filters) {
		state.filters.set = filters || filtersInit
  },

  [MUTATIONS_KEYS.SET_FILTER_VEHICLE_NR](state, vehicleNr) {
    state.filters.set.vehicleNr = vehicleNr
  },

  [MUTATIONS_KEYS.SET_FILTER_TECH_PASSPORT](state, techPassport) {
    state.filters.set.techPassport = techPassport
  },

  [MUTATIONS_KEYS.SET_FILTER_BRAND](state, brand) {
    state.filters.set.brand = brand
  },

  [MUTATIONS_KEYS.SET_FILTER_TYPE](state, type) {
    state.filters.set.type = type
  },

  [MUTATIONS_KEYS.CLEAR_FILTERS](state) {
    state.filters.set = { ...state.filters.set, ...filtersInit}
  },

  [MUTATIONS_KEYS.SET_FILTERS_SAVED_LOADING](state, loading) {
    state.filters.saved.loading = loading
  },

  [MUTATIONS_KEYS.SET_FILTERS_SAVED_LIST](state, list) {
    state.filters.saved.list = list
  },

  [MUTATIONS_KEYS.SET_FILTERS_SAVED_FETCHED](state, fetched) {
    state.filters.saved.fetched = fetched
  },

  [MUTATIONS_KEYS.SET_SEARCH](state, search) {
    state.search = search
  }
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_LIST]({ commit, state }, companyGuid) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    if (state.offset === 0) {
      commit(MUTATIONS_KEYS.CLEAR_LIST)
    }

    try {
      const { status, count, items } = await this.$api.vehicles.getVehicles(companyGuid, state.limit, state.offset, state.filters.set, state.search)
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
  },

  // FILTERS
  async [ACTIONS_KEYS.SET_FILTERS]({
    commit,
    dispatch,
    state,
    rootState
  }, filters) {
    commit(MUTATIONS_KEYS.SET_FILTERS, filters)
    await dispatch(ACTIONS_KEYS.FETCH_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.setFilters(state.filters.set)
  },

  async [ACTIONS_KEYS.CLEAR_FILTERS] ({
    commit,
    dispatch,
    rootState
  }) {
    commit(MUTATIONS_KEYS.CLEAR_FILTERS)
    await dispatch(ACTIONS_KEYS.FETCH_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.unsetFilters()
  },

  async [ACTIONS_KEYS.SET_FILTER_VEHICLE_NR]({
    commit,
    dispatch,
    state,
    rootState
  }, vehicleNr) {
    commit(MUTATIONS_KEYS.SET_FILTER_VEHICLE_NR, vehicleNr)
    await dispatch(ACTIONS_KEYS.FETCH_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.setFilters(state.filters.set)
  },

  async [ACTIONS_KEYS.SET_FILTER_TECH_PASSPORT]({
    commit,
    dispatch,
    state,
    rootState
  }, techPassport) {
    commit(MUTATIONS_KEYS.SET_FILTER_TECH_PASSPORT, techPassport)
    await dispatch(ACTIONS_KEYS.FETCH_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.setFilters(state.filters.set)
  },

  async [ACTIONS_KEYS.SET_FILTER_BRAND]({
    commit,
    dispatch,
    state,
    rootState
  }, brand) {
    commit(MUTATIONS_KEYS.SET_FILTER_BRAND, brand)
    await dispatch(ACTIONS_KEYS.FETCH_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.setFilters(state.filters.set)
  },

  async [ACTIONS_KEYS.SET_FILTER_TYPE]({
    commit,
    dispatch,
    state,
    rootState
  }, type) {
    commit(MUTATIONS_KEYS.SET_FILTER_TYPE, type)
    await dispatch(ACTIONS_KEYS.FETCH_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.setFilters(state.filters.set)
  },

  async [ACTIONS_KEYS.CREATE_NEW_SAVED_FILTERS] ({ commit, state }, labels = []) {
    const values = state.filters.set

    commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LOADING, true)

    try {
      const { status, guid } = await this.$api.usersFilters.createNewFilters(FILTERS_SAVED_TABLE_NAME, { values, labels })

      if (status) {
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LIST, [ { guid, values: values, labels }, ...state.filters.saved.list ])
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LOADING, false)
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_FETCHED, true)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async [ACTIONS_KEYS.REMOVE_SAVED_FILTERS] ({ commit, state }, guid) {
    try {
      const { status } = await this.$api.usersFilters.removeFilters(guid)

      if (status) {
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LIST, state.filters.saved.list.filter(item => item.guid !== guid))
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async [ACTIONS_KEYS.LOAD_SAVED_FILTERS] ({ commit }) {
    commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LOADING, true)

    try {
      const {
        status,
        items
      } = await this.$api.usersFilters.getFilters(FILTERS_SAVED_TABLE_NAME)

      if (status) {
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LIST, items)
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LOADING, false)
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_FETCHED, true)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async [ACTIONS_KEYS.SET_SEARCH] ({commit, dispatch, rootState}, search) {
    commit(MUTATIONS_KEYS.SET_SEARCH, search)
    await dispatch(ACTIONS_KEYS.FETCH_LIST, rootState.companies.currentCompany.guid)
  }
}
