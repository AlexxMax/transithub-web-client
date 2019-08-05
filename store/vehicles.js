import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { MUTATIONS_KEYS, ACTIONS_KEYS, EDIT_DIALOG_TYPES, GETTERS_KEYS } from '@/utils/vehicles'
import * as notify from '@/utils/notifications'
import { TABLE_NAMES } from '@/utils/constants'
import { filtersInit, LIST_TYPES } from '@/utils/vehicles'
import { filtersSet } from '@/utils/storeCommon'

const FILTERS_SAVED_TABLE_NAME = 'vehicles'

const setItemIsFavoriteValue = (state, collectionKey, guid, value) => {
  if (state.item.guid === guid) {
    state.item.isFavorite = value
  }

  const listItem = state[collectionKey].find(item => item.guid === guid)
  if (listItem) {
    listItem.isFavorite = value
  }
}

export const state = () => ({
  listTrucks: [],
  countTrucks: 0,
  loadingTrucks: false,
  offsetTrucks: OFFSET,
  searchTrucks: null,

  listTrailers: [],
  countTrailers: 0,
  loadingTrailers: false,
  offsetTrailers: OFFSET,
  searchTrailers: null,

  item: {},
  loading: false,

  limit: PAGE_SIZE,

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

  search: null,

  vehiclesRegisters: {
    list: [],
    loading: false,
    count: 0
  }
})

export const getters = {
  [GETTERS_KEYS.LIST_FILTERS_SET](state) {
    return filtersSet(state.filters.set)
  }
}

export const mutations = {
  // TRUCKS LIST

  [MUTATIONS_KEYS.SET_TRUCKS_LIST](state, listTrucks) {
    state.listTrucks = listTrucks
  },

  [MUTATIONS_KEYS.APPEND_TO_TRUCKS_LIST](state, items) {
    state.listTrucks = [...state.listTrucks, ...items]
  },

  [MUTATIONS_KEYS.PREPEND_TO_TRUCKS_LIST](state, item) {
    state.listTrucks = [item, ...state.listTrucks]
  },

  [MUTATIONS_KEYS.SET_TRUCKS_COUNT](state, countTrucks) {
    state.countTrucks = countTrucks
  },

  [MUTATIONS_KEYS.SET_TRUCKS_LOADING](state, loadingTrucks) {
    state.loadingTrucks = loadingTrucks
  },

  [MUTATIONS_KEYS.SET_TRUCKS_OFFSET](state, offsetTrucks) {
    state.offsetTrucks = offsetTrucks
  },

  [MUTATIONS_KEYS.CLEAR_TRUCKS_LIST](state) {
    state.listTrucks = []
  },

  // TRAILERS LIST

  [MUTATIONS_KEYS.SET_TRAILERS_LIST](state, listTrailers) {
    state.listTrailers = listTrailers
  },

  [MUTATIONS_KEYS.APPEND_TO_TRAILERS_LIST](state, items) {
    state.listTrailers = [...state.listTrailers, ...items]
  },

  [MUTATIONS_KEYS.PREPEND_TO_TRAILERS_LIST](state, item) {
    state.listTrailers = [item, ...state.listTrailers]
  },

  [MUTATIONS_KEYS.SET_TRAILERS_COUNT](state, countTrailers) {
    state.countTrailers = countTrailers
  },

  [MUTATIONS_KEYS.SET_TRAILERS_LOADING](state, loadingTrailers) {
    state.loadingTrailers = loadingTrailers
  },

  [MUTATIONS_KEYS.SET_TRAILERS_OFFSET](state, offsetTrailers) {
    state.offsetTrailers = offsetTrailers
  },

  [MUTATIONS_KEYS.CLEAR_TRAILERS_LIST](state) {
    state.listTrailers = []
  },

  // COMMON

  [MUTATIONS_KEYS.SET_LOADING](state, loading) {
    state.loading = loading
  },

  [MUTATIONS_KEYS.SET_ITEM](state, item) {
    state.item = item
  },

  [MUTATIONS_KEYS.SHOW_EDIT_DIALOG](state, show) {
    state.editing.showEditDialog = show
  },

  [MUTATIONS_KEYS.UPDATE_ITEM_IN_LIST](state, item) {
    let index = state.listTrucks.findIndex(element => element.guid === item.guid)
    if (index) {
      state.listTrucks.splice(index, 1, item)
    }

    index = state.listTrailers.findIndex(element => element.guid === item.guid)
    if (index) {
      state.listTrailers.splice(index, 1, item)
    }
  },

  [MUTATIONS_KEYS.CLEAR_ITEM](state) {
    state.item = {}
  },

  [MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE](state, type) {
    state.editing.type = type
  },

  [MUTATIONS_KEYS.SET_VEHICLES_REGISTERS_LIST](state, list) {
    state.vehiclesRegisters.list = list
  },

  [MUTATIONS_KEYS.SET_VEHICLES_REGISTERS_LOADING](state, loading) {
    state.vehiclesRegisters.loading = loading
  },

  [MUTATIONS_KEYS.SET_VEHICLES_REGISTERS_COUNT](state, count) {
    state.vehiclesRegisters.count = count
  },

  // BOOKMARKS

  [MUTATIONS_KEYS.ADD_ITEM_TO_BOOKMARKS](state, { guid, listKey }) {
    setItemIsFavoriteValue(state, listKey, guid, true)
  },

  [MUTATIONS_KEYS.REMOVE_ITEM_FROM_BOOKMARKS](state, { guid, listKey }) {
    setItemIsFavoriteValue(state, listKey, guid, false)
  },
  [MUTATIONS_KEYS.SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY](state, value) {
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
    state.filters.set = { ...state.filters.set, ...filtersInit }
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
  },

  [MUTATIONS_KEYS.SET_TRUCKS_SEARCH](state, search) {
    state.searchTrucks = search
  },

  [MUTATIONS_KEYS.SET_TRAILERS_SEARCH](state, search) {
    state.searchTrailers = search
  }
}

export const actions = {
  async [ACTIONS_KEYS.FETCH_TRUCKS_LIST]({ commit, state }, companyGuid) {
    commit(MUTATIONS_KEYS.SET_TRUCKS_LOADING, true)

    if (state.offsetTrucks === 0) {
      commit(MUTATIONS_KEYS.CLEAR_TRUCKS_LIST)
    }

    try {
      const { status, count, items } = await this.$api.vehicles.getVehicles(
        companyGuid,
        state.limit,
        state.offsetTrucks,
        state.filters.set,
        state.search || state.searchTrucks,
        LIST_TYPES.TRUCK
      )
      if (status) {
        if (state.offsetTrucks === 0) {
          commit(MUTATIONS_KEYS.SET_TRUCKS_LIST, items)
        } else {
          commit(MUTATIONS_KEYS.APPEND_TO_TRUCKS_LIST, items)
        }
        commit(MUTATIONS_KEYS.SET_TRUCKS_COUNT, count)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_TRUCKS_LOADING, false)
  },

  async [ACTIONS_KEYS.FETCH_TRAILERS_LIST]({ commit, state }, companyGuid) {
    commit(MUTATIONS_KEYS.SET_TRAILERS_LOADING, true)

    if (state.offsetTrailers === 0) {
      commit(MUTATIONS_KEYS.CLEAR_TRAILERS_LIST)
    }

    try {
      const { status, count, items } = await this.$api.vehicles.getVehicles(
        companyGuid,
        state.limit,
        state.offsetTrailers,
        state.filters.set,
        state.search || state.searchTrailers,
        LIST_TYPES.TRAILER
      )
      if (status) {
        if (state.offsetTrailers === 0) {
          commit(MUTATIONS_KEYS.SET_TRAILERS_LIST, items)
        } else {
          commit(MUTATIONS_KEYS.APPEND_TO_TRAILERS_LIST, items)
        }
        commit(MUTATIONS_KEYS.SET_TRAILERS_COUNT, count)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_TRAILERS_LOADING, false)
  },

  async [ACTIONS_KEYS.FETCH_ITEM]({ commit }, { companyGuid, vehicleGuid }) {
    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, item } = await this.$api.vehicles.getVehicle(companyGuid, vehicleGuid)
      if (status) {
        commit(MUTATIONS_KEYS.SET_ITEM, item)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)
  },

  async [ACTIONS_KEYS.CREATE_ITEM]({ commit, state }, { companyGuid, payload }) {
    let errorKey

    commit(MUTATIONS_KEYS.SET_LOADING, true)

    try {
      const { status, err, item } = await this.$api.vehicles.createVehicle(companyGuid, payload)
      if (status) {
        if (item.isTrailer) {
          commit(MUTATIONS_KEYS.PREPEND_TO_TRAILERS_LIST, item)
          commit(MUTATIONS_KEYS.SET_TRAILERS_COUNT, state.countTrucks + 1)
        } else {
          commit(MUTATIONS_KEYS.PREPEND_TO_TRUCKS_LIST, item)
          commit(MUTATIONS_KEYS.SET_TRUCKS_COUNT, state.countTrucks + 1)
        }
      } else if (err) {
        errorKey = err
      }
    } catch ({ message }) {
      notify.error(message)
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
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_LOADING, false)

    return errorKey
  },

  [ACTIONS_KEYS.SHOW_EDIT_DIALOG]({ commit }, { show, type }) {
    commit(MUTATIONS_KEYS.SET_EDIT_DIALOG_TYPE, type)
    commit(MUTATIONS_KEYS.SHOW_EDIT_DIALOG, show)
  },

  // BOOKMARKS
  async [ACTIONS_KEYS.ADD_ITEM_TO_BOOKMARKS]({ commit }, { guid, listKey }) {
    try {
      const { status } = await this.$api.favorites.postFavorite(guid, TABLE_NAMES.autoVehicle)
      if (status) {
        commit(MUTATIONS_KEYS.ADD_ITEM_TO_BOOKMARKS, { guid, listKey })
      }
    } catch ({ message }) {
      notify.error(message)
    }
  },

  async [ACTIONS_KEYS.REMOVE_ITEM_FROM_BOOKMARKS]({ commit }, { guid, listKey }) {
    try {
      const { status } = await this.$api.favorites.deleteFavorite(guid, TABLE_NAMES.autoVehicle)
      if (status) {
        commit(MUTATIONS_KEYS.REMOVE_ITEM_FROM_BOOKMARKS, { guid, listKey })
      }
    } catch ({ message }) {
      notify.error(message)
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
    await dispatch(ACTIONS_KEYS.FETCH_TRUCKS_LIST, rootState.companies.currentCompany.guid)
    await dispatch(ACTIONS_KEYS.FETCH_TRAILERS_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.setFilters(state.filters.set)
  },

  async [ACTIONS_KEYS.CLEAR_FILTERS]({
    commit,
    dispatch,
    rootState
  }) {
    commit(MUTATIONS_KEYS.CLEAR_FILTERS)
    await dispatch(ACTIONS_KEYS.FETCH_TRUCKS_LIST, rootState.companies.currentCompany.guid)
    await dispatch(ACTIONS_KEYS.FETCH_TRAILERS_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.unsetFilters()
  },

  async [ACTIONS_KEYS.SET_FILTER_VEHICLE_NR]({
    commit,
    dispatch,
    state,
    rootState
  }, vehicleNr) {
    commit(MUTATIONS_KEYS.SET_FILTER_VEHICLE_NR, vehicleNr)
    commit(MUTATIONS_KEYS.SET_TRUCKS_OFFSET, OFFSET)
    await dispatch(ACTIONS_KEYS.FETCH_TRUCKS_LIST, rootState.companies.currentCompany.guid)
    await dispatch(ACTIONS_KEYS.FETCH_TRAILERS_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.setFilters(state.filters.set)
  },

  async [ACTIONS_KEYS.SET_FILTER_TECH_PASSPORT]({
    commit,
    dispatch,
    state,
    rootState
  }, techPassport) {
    commit(MUTATIONS_KEYS.SET_FILTER_TECH_PASSPORT, techPassport)
    commit(MUTATIONS_KEYS.SET_TRUCKS_OFFSET, OFFSET)
    await dispatch(ACTIONS_KEYS.FETCH_TRUCKS_LIST, rootState.companies.currentCompany.guid)
    await dispatch(ACTIONS_KEYS.FETCH_TRAILERS_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.setFilters(state.filters.set)
  },

  async [ACTIONS_KEYS.SET_FILTER_BRAND]({
    commit,
    dispatch,
    state,
    rootState
  }, brand) {
    commit(MUTATIONS_KEYS.SET_FILTER_BRAND, brand)
    commit(MUTATIONS_KEYS.SET_TRUCKS_OFFSET, OFFSET)
    await dispatch(ACTIONS_KEYS.FETCH_TRUCKS_LIST, rootState.companies.currentCompany.guid)
    await dispatch(ACTIONS_KEYS.FETCH_TRAILERS_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.setFilters(state.filters.set)
  },

  async [ACTIONS_KEYS.SET_FILTER_TYPE]({
    commit,
    dispatch,
    state,
    rootState
  }, type) {
    commit(MUTATIONS_KEYS.SET_FILTER_TYPE, type)
    commit(MUTATIONS_KEYS.SET_TRUCKS_OFFSET, OFFSET)
    await dispatch(ACTIONS_KEYS.FETCH_TRUCKS_LIST, rootState.companies.currentCompany.guid)
    await dispatch(ACTIONS_KEYS.FETCH_TRAILERS_LIST, rootState.companies.currentCompany.guid)
    this.$cookies.vehicles.setFilters(state.filters.set)
  },

  async [ACTIONS_KEYS.CREATE_NEW_SAVED_FILTERS]({ commit, state }, labels = []) {
    const values = state.filters.set

    commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LOADING, true)

    try {
      const { status, guid } = await this.$api.usersFilters.createNewFilters(FILTERS_SAVED_TABLE_NAME, { values, labels })

      if (status) {
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LIST, [{ guid, values: values, labels }, ...state.filters.saved.list])
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LOADING, false)
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_FETCHED, true)
      }
    } catch ({ message }) {
      notify.error(message)
    }
  },

  async [ACTIONS_KEYS.REMOVE_SAVED_FILTERS]({ commit, state }, guid) {
    try {
      const { status } = await this.$api.usersFilters.removeFilters(guid)

      if (status) {
        commit(MUTATIONS_KEYS.SET_FILTERS_SAVED_LIST, state.filters.saved.list.filter(item => item.guid !== guid))
      }
    } catch ({ message }) {
      notify.error(message)
    }
  },

  async [ACTIONS_KEYS.LOAD_SAVED_FILTERS]({ commit }) {
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
      notify.error(message)
    }
  },

  async [ACTIONS_KEYS.SET_SEARCH]({ commit, dispatch, rootState }, search) {
    commit(MUTATIONS_KEYS.SET_SEARCH, search)
    commit(MUTATIONS_KEYS.SET_TRUCKS_SEARCH, null)
    commit(MUTATIONS_KEYS.SET_TRAILERS_SEARCH, null)
    await dispatch(ACTIONS_KEYS.FETCH_TRUCKS_LIST, rootState.companies.currentCompany.guid)
    await dispatch(ACTIONS_KEYS.FETCH_TRAILERS_LIST, rootState.companies.currentCompany.guid)
  },

  async [ACTIONS_KEYS.SET_TRUCKS_SEARCH]({ commit, dispatch, rootState }, search) {
    commit(MUTATIONS_KEYS.SET_SEARCH, null)
    commit(MUTATIONS_KEYS.SET_TRUCKS_SEARCH, search)
    await dispatch(ACTIONS_KEYS.FETCH_TRUCKS_LIST, rootState.companies.currentCompany.guid)
  },

  async [ACTIONS_KEYS.SET_TRAILERS_SEARCH]({ commit, dispatch, rootState }, search) {
    commit(MUTATIONS_KEYS.SET_SEARCH, null)
    commit(MUTATIONS_KEYS.SET_TRAILERS_SEARCH, search)
    await dispatch(ACTIONS_KEYS.FETCH_TRAILERS_LIST, rootState.companies.currentCompany.guid)
  },

  async [ACTIONS_KEYS.FETCH_VEHICLES_REGISTERS_LIST]({ commit }, { guid, name}) {
    commit(MUTATIONS_KEYS.SET_VEHICLES_REGISTERS_LOADING, true)

    try {
      const {
        status,
        count,
        items
      } = await this.$api.vehiclesRegisters.getVehiclesRegistersByParticipant(
        name,
        guid,
        new Date()
      )

      if (status) {
        commit(MUTATIONS_KEYS.SET_VEHICLES_REGISTERS_COUNT, count)
        commit(MUTATIONS_KEYS.SET_VEHICLES_REGISTERS_LIST, items)
      }
    } catch ({ message }) {
      notify.error(message)
    }

    commit(MUTATIONS_KEYS.SET_VEHICLES_REGISTERS_LOADING, false)
  },

  async [ACTIONS_KEYS.UPDATE_VEHICLES_REGISTERS]({ dispatch, state }, { guid, name}) {
    let success = false

    try {
      const { status } = await this.$api.vehiclesRegisters.updateVehiclesRegistersByParticipant(
        name,
        guid,
        state.vehiclesRegisters.list
      )

      if (status) {
        await dispatch(ACTIONS_KEYS.FETCH_VEHICLES_REGISTERS_LIST, { guid, name })
        success = true
      } else {
        throw new Error(this.$t('messages.error')) // TODO: change error
      }
    } catch ({ message }) {
      notify.error(message)
    }

    return success
  }
}
