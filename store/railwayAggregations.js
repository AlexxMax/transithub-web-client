import _orderBy from 'lodash.orderby'
import _uniq from 'lodash.uniq'
import _pull from 'lodash.pull'

import { showErrorMessage } from '@/utils/messages'
import { getSortingDirectionCode } from '../utils/sorting'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'
import { getOppositeStatusId, filtersInit } from '@/utils/railway-aggregations'
import { filtersSet } from '@/utils/storeCommon'
import { TABLE_NAMES } from '@/utils/constants'

const FILTERS_SAVED_TABLE_NAME = 'railway-aggregation'

const setItemIsFavoriteValue = (state, guid, value) => {
  if (state.item.guid === guid) {
    state.item.isFavorite = value
  }

  const listItem = state.list.find(item => item.guid === guid)
  if (listItem) {
    listItem.isFavorite = value
  }

  const listByAuthorItem = state.listByAuthor.find(item => item.guid === guid)
  if (listByAuthorItem) {
    listByAuthorItem.isFavorite = value
  }
}

export const state = () => ({
  item: {},
  list: [],
  //itemTags: [],
  count: 0,
  loading: false,
  listByAuthor: [],
  countByAuthor: 0,
  loadingByAuthor: false,
  filters: {
    data: {
      companies: {
        items: [],
        loading: false,
        fetched: false
      }
    },
    set: { ...filtersInit },
    saved: {
      list: [],
      loading: false,
      fetched: false,
      loaders: []
    }
  },
  sorting: {
    date: null,
    stationFrom: null,
    stationTo: null
  },
  limit: PAGE_SIZE,
  offset: OFFSET,
  offsetByAuthor: OFFSET,
  search: null,
  mapData: {
    list: [],
    loading: false,
    railwayAggregationGuidToOpen: null
  },
  createNew: {
    showCreateNewDialog: false,
    showInaccessibleFunctionality: false
  }
})

export const getters = {
  getRailwayAggregation: state => {
    return { ...state.item, status: state.item.status || {} }
  },
  listFiltersSet(state) {
    return filtersSet(state.filters.set)
  }
}

export const mutations = {
  RESET(state) {
    state.list = []
    state.count = 0
    state.loading = false
    state.listByAuthor = []
    state.countByAuthor = 0
    state.loadingByAuthor = false
    // state.filters.set = { ...filtersInit }
    state.limit = PAGE_SIZE
    state.offset = OFFSET
    state.search = null
  },

  SET_LIST(state, list) {
    state.list = list
  },

  SET_LIST_BY_AUTHOR(state, list) {
    state.listByAuthor = list
  },

  UPDATE_LIST_ITEM(state, item) {
    let listItem = state.list.find(item => item.guid === item.guid)
    if (listItem) {
      listItem = { ...listItem, ...item }
    } else {
      state.list = [ item, ...state.list ]
    }
  },

  APPEND_ITEMS_TO_LIST(state, items) {
    state.list = [
      ...state.list,
      ...items
    ]
  },

  APPEND_ITEMS_TO_LIST_BY_AUTHOR(state, items) {
    state.listByAuthor = [
      ...state.listByAuthor,
      ...items
    ]
  },

  SET_COUNT(state, count) {
    state.count = count
  },

  SET_COUNT_BY_AUTHOR(state, count) {
    state.countByAuthor = count
  },

  SET_LOADING(state, loading) {
    state.loading = loading
  },

  SET_LOADING_BY_AUTHOR(state, loading) {
    state.loadingByAuthor = loading
  },

  SET_ITEM(state, item) {
    state.item = item
  },

  SET_ITEM_STATUS(state, { status, statusId }) {
    state.item.status = status
    state.item.statusId = statusId
  },


  CALCULATE_ITEM_PARAMS(state, { requestsWagons, requestsCount, partisipantsCount }) {
    state.item.wagonsDeficit = state.item.wagonsInRoute - state.item.wagonsAggregator - requestsWagons
    state.item.requestsCount = requestsCount
    state.item.partisipantsCount = partisipantsCount
  },

  CALCULATE_IN_LIST_PARAMS(state, { aggregationGuid, requestsWagons, requestsCount, partisipantsCount }) {
    const list = [ ...state.list ]
    const item = list.find(item => item.guid === aggregationGuid)
    if (item) {
      item.wagonsDeficit = item.wagonsInRoute - item.wagonsAggregator - requestsWagons
      item.requestsCount = requestsCount
      item.partisipantsCount = partisipantsCount
      state.list = list
    }
  },

  SET_SORTING_DATE(state, value) {
    state.sorting.date = value
  },

  SET_SORTING_STATION_FROM(state, value) {
    state.sorting.stationFrom = value
  },

  SET_SORTING_STATION_TO(state, value) {
    state.sorting.stationTo = value
  },

  SET_LIMIT(state, value) {
    state.limit = value
  },

  SET_OFFSET(state, value) {
    state.offset = value
  },

  SET_OFFSET_BY_AUTHOR(state, value) {
    state.offsetByAuthor = value
  },

  SET_SEARCH(state, value) {
    state.search = value
  },

  SET_FILTERS(state, filters) {
		state.filters.set = filters || filtersInit
  },

  SET_FILTER_GOODS(state, goods) {
    state.filters.set.goods = goods
  },

  SET_FILTER_AFFILATIONS(state, affilations) {
    state.filters.set.railwayAffilations = affilations
  },

  SET_FILTER_STATIONS_FROM(state, stations) {
    state.filters.set.railwayStationsFrom = stations
  },

  SET_FILTER_STATIONS_TO(state, stations) {
    state.filters.set.railwayStationsTo = stations
  },

  SET_FILTER_REFERENCE_STATIONS(state, stations) {
    state.filters.set.railwayReferenceStations = stations
  },

  SET_FILTER_POLYGON_NUMBER(state, polygonNumbers) {
    state.filters.set.polygonNumbers = polygonNumbers
  },

  SET_FILTER_STATIONS_ROADS_FROM(state, roads) {
    state.filters.set.railwayStationsRoadsFrom = roads
  },

  SET_FILTER_STATIONS_ROADS_TO(state, roads) {
    state.filters.set.railwayStationsRoadsTo = roads
  },

  SET_FILTER_STATUSES(state, statuses) {
    state.filters.set.statuses = statuses
  },

  SET_FILTER_AUTHOR(state, author) {
    state.filters.set.author = author
  },

  SET_FILTER_COMPANIES(state, companies) {
    state.filters.set.companies = companies
  },

  SET_FILTER_PERIOD_FROM(state, periodFrom) {
    state.filters.set.periodFrom = periodFrom
  },

  SET_FILTER_PERIOD_TO(state, periodTo) {
    state.filters.set.periodTo = periodTo
  },

  CLEAR_FILTERS(state) {
    state.filters.set = { ...state.filters.set, ...filtersInit}
  },

  SET_FILTER_COMPANIES_DATA(state, companies) {
    state.filters.data.companies.items = companies
  },

  SET_FILTER_COMPANIES_DATA_LOADING(state, loading) {
    state.filters.data.companies.loading = loading
  },

  SET_FILTER_COMPANIES_DATA_FETCHED(state, fetched) {
    state.filters.data.companies.fetched = fetched
  },

  // SET_ITEM_TAGS(state, items) {
  //   state.itemTags = items
  // },

  // ADD_ITEM_TAG(state, tag) {
  //   state.itemTags.push(tag)
  // },

  // DELETE_ITEM_TAG(state, tagGuid) {
  //   const index = state.itemTags.findIndex(tag => tag.guid === tagGuid)
  //   if (index != -1) {
  //     state.itemTags.splice(index, 1)
  //   }
  // },

  SET_FILTERS_SAVED_LIST(state, list) {
    state.filters.saved.list = list
  },

  SET_FILTERS_SAVED_LOADING(state, loading) {
    state.filters.saved.loading = loading
  },

  SET_FILTERS_SAVED_FETCHED(state, fetched) {
    state.filters.saved.fetched = fetched
  },

  CHANGE_FILTERS_SAVED_ITEM_SUBSCRIPTION(state, { guid, sendNotifications }) {
    const filter = state.filters.saved.list.find(item => item.guid === guid)
    if (filter) {
      filter.sendNotifications = sendNotifications
    }
  },

  ADD_FILTERS_SAVED_LOADER(state, guid) {
    state.filters.saved.loaders.push(guid)
  },

  REMOVE_FILTERS_SAVED_LOADER(state, guid) {
    state.filters.saved.loaders = state.filters.saved.loaders.filter(item => item !== guid)
  },

  // BOOKMARKS
  ADD_ITEM_TO_BOOKMARKS(state, guid) {
    setItemIsFavoriteValue(state, guid, true)
  },

  REMOVE_ITEM_FROM_BOOKMARKS(state, guid) {
    setItemIsFavoriteValue(state, guid, false)
  },

  // CREATE NEW ITEM DIALOG
  SET_CREATE_NEW_DIALOG(state, value) {
    state.createNew.showCreateNewDialog = value
  },

  SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY(state, value) {
    state.createNew.showInaccessibleFunctionality = value
  }
}

export const actions = {
  async loadList({
    commit,
    state,
  }, author = null) {
    commit('SET_LIMIT', PAGE_SIZE)

    if (author) {
      commit('SET_OFFSET_BY_AUTHOR', OFFSET)
      commit('SET_LOADING_BY_AUTHOR', true)
    } else {
      commit('SET_OFFSET', OFFSET)
      commit('SET_LOADING', true)
    }

    try {
      const {
        status,
        count,
        items
      } = await this.$api.railway.getRailwayAggregations(
        state.limit,
        Boolean(author) ? state.offsetByAuthor : state.offset,
        state.search,
        state.filters.set,
        state.sorting,
        author
      )

      if (status) {
        if (author) {
          commit('SET_LIST_BY_AUTHOR', items)
          commit('SET_COUNT_BY_AUTHOR', count)
          commit('SET_LOADING_BY_AUTHOR', false)
        } else {
          commit('SET_LIST', items)
          commit('SET_COUNT', count)
          commit('SET_LOADING', false)
        }
      }
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async loadMoreItems({
    commit,
    state
  }, { author, company } = {}) {
    if (author) {
      commit('SET_LOADING_BY_AUTHOR', true)
    } else {
      commit('SET_LOADING', true)
    }

    // try {
      const {
        status,
        count,
        items
      } = await this.$api.railway.getRailwayAggregations(
        state.limit,
        Boolean(author) ? state.offsetByAuthor : state.offset,
        state.search,
        state.filters.set,
        state.sorting,
        author,
        company
      )

      if (status) {
        if (author) {
          commit('APPEND_ITEMS_TO_LIST_BY_AUTHOR', items)
          commit('SET_COUNT_BY_AUTHOR', count)
          commit('SET_LOADING_BY_AUTHOR', false)
        } else {
          commit('APPEND_ITEMS_TO_LIST', items)
          commit('SET_COUNT', count)
          commit('SET_LOADING', false)
        }
      }
    // } catch ({ message }) {
    //   showErrorMessage(message)
    // }
  },

  async loadElement({
    commit
  }, guid) {
    commit('SET_LOADING', true)
    try {
      const [
        { status, item },
        //{ status: tagsStatus, items: tags }
      ] = await Promise.all([
        this.$api.railway.getRailwayAggregation(guid),
        //this.$api.tags.getTags(guid, 'railway_aggregator')
      ])

      if (status) {
        commit('SET_ITEM', item)
        // if (tagsStatus) {
        //   commit('SET_ITEM_TAGS', tags)
        // }
      }
      commit('SET_LOADING', false)
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  async createAggregation({ commit }, payload) {
    try {
      const {
        status,
        msg,
        item
      } = await this.$api.railway.postRailwayAggregation(payload)

      if (msg) {
        throw new Error(msg)
      }

      if (status) {
        commit('APPEND_ITEMS_TO_LIST', [ item ])
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async changeAggregation({ commit, state, dispatch }, { aggregationGuid, payload }) {
    try {
      const {
        status,
        msg,
        item
      } = await this.$api.railway.updateRailwayAggregation(aggregationGuid, payload)

      if (msg) {
        throw new Error(msg)
      }

      if (status) {
        if (state.item.guid === aggregationGuid) {
          commit('SET_ITEM', item)
        }
        commit('UPDATE_LIST_ITEM', item)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  calculateAggregationParams({ commit, state }, {
    aggregationGuid,
    requestsWagons,
    requestsCount,
    partisipantsCount
  }) {
    if (state.item.guid == aggregationGuid) {
      commit('CALCULATE_ITEM_PARAMS', { requestsWagons, requestsCount, partisipantsCount })
    }
    commit('CALCULATE_IN_LIST_PARAMS', { aggregationGuid, requestsWagons, requestsCount, partisipantsCount })
  },

  async setSortingDate({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_DATE', getSortingDirectionCode(direction))
    await dispatch('loadList')
  },

  async setSortingStationFrom({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_STATION_FROM', getSortingDirectionCode(direction))
    await dispatch('loadList')
  },

  async setSortingStationTo({
    commit,
    dispatch
  }, direction) {
    commit('SET_SORTING_STATION_TO', getSortingDirectionCode(direction))
    await dispatch('loadList')
  },

  async setSearch({
    commit,
    dispatch
  }, value) {
    commit('SET_SEARCH', value)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
  },

  async setFilters({
    commit,
    dispatch,
    state
  }, filters) {
    commit('SET_FILTERS', filters)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterGoods({
    commit,
    dispatch,
    state
  }, goods) {
    commit('SET_FILTER_GOODS', goods)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterAffilations({
    commit,
    dispatch,
    state
  }, affilations) {
    commit('SET_FILTER_AFFILATIONS', affilations)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterStationsFrom({
    commit,
    dispatch,
    state
  }, stations) {
    commit('SET_FILTER_STATIONS_FROM', stations)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterStationsTo({
    commit,
    dispatch,
    state
  }, stations) {
    commit('SET_FILTER_STATIONS_TO', stations)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterReferenceStations({
    commit,
    dispatch,
    state
  }, stations) {
    commit('SET_FILTER_REFERENCE_STATIONS', stations)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterPolygonNumbers({
    commit,
    dispatch,
    state
  }, polygonNumbers) {
    commit('SET_FILTER_POLYGON_NUMBER', polygonNumbers)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterStationsRoadsFrom({
    commit,
    dispatch,
    state
  }, roads) {
    commit('SET_FILTER_STATIONS_ROADS_FROM', roads)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterStationsRoadsTo({
    commit,
    dispatch,
    state
  }, roads) {
    commit('SET_FILTER_STATIONS_ROADS_TO', roads)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterStatuses({
    commit,
    dispatch,
    state
  }, statuses) {
    commit('SET_FILTER_STATUSES', statuses)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterAuthor({
    commit,
    dispatch,
    state
  }, author) {
    commit('SET_FILTER_AUTHOR', author)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async setFilterCompanies({
    commit,
    dispatch,
    state
  }, companies) {
    commit('SET_FILTER_COMPANIES', companies)
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  setFilterPeriod({
    commit,
    dispatch,
    state
  }, period) {
    if (period === null) {
      commit('SET_FILTER_PERIOD_FROM', null)
      commit('SET_FILTER_PERIOD_TO', null)
    } else {
      commit('SET_FILTER_PERIOD_FROM', period[0])
      commit('SET_FILTER_PERIOD_TO', period[1])
    }
    dispatch('loadList')
    dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.setFilters(state.filters.set)
  },

  async clearFilters({
    commit,
    dispatch
  }) {
    commit('CLEAR_FILTERS')
    await dispatch('loadList')
    await dispatch('railwayAggregationsMap/loadMapData', null, { root: true })
    this.$cookies.railwayAggregations.unsetFilters()
  },

  async setStatus({ commit }, { guid, currentStatusId }) {
    try {
      const {
        status,
        statusId,
        statusObj,
        msg: message
      } = await this.$api.railway.setRailwayAggregationStatus(
        guid,
        getOppositeStatusId(currentStatusId)
      )

      if (status) {
        commit('SET_ITEM_STATUS', { status: statusObj, statusId })
      }

      return { status, message}
    } catch ({ message }) {
      return { status: false, message }
    }
  },

  async loadCompanies({commit}) {
    commit('SET_FILTER_COMPANIES_DATA_LOADING', true)
    try {
      const { status, items, msg } = await this.$api.railway.getFilterCompaniesRailway()
      if (status) {
        commit('SET_FILTER_COMPANIES_DATA', items)
        commit('SET_FILTER_COMPANIES_DATA_LOADING', false)
        commit('SET_FILTER_COMPANIES_DATA_FETCHED', true)
      } else {
        throw new Error(msg)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  //async addItemTag({
  //   commit
  // }, payload) {
  //   try {
  //     const { status, value } = await this.$api.tags.postTag(payload)
  //     if (status) {
  //       commit('ADD_ITEM_TAG', { value })
  //     }
  //   } catch ({ message }) {
  //     showErrorMessage(message)
  //   }
  // },

  // async deleteItemTag({
  //   commit
  // }, tagGuid) {
  //   try {
  //     const { status } = await this.$api.tags.deleteTag(tagGuid)
  //     if (status) {
  //       commit('DELETE_ITEM_TAG', tagGuid)
  //     }
  //   } catch ({ message }) {
  //     showErrorMessage(message)
  //   }
  // },

  async loadSavedFilters({ commit }) {
    commit('SET_FILTERS_SAVED_LOADING', true)

    try {
      const {
        status,
        items
      } = await this.$api.usersFilters.getFilters(FILTERS_SAVED_TABLE_NAME)

      if (status) {
        commit('SET_FILTERS_SAVED_LIST', items)
        commit('SET_FILTERS_SAVED_LOADING', false)
        commit('SET_FILTERS_SAVED_FETCHED', true)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async createNewSavedFilters({ commit, state }, labels = []) {
    const { author, ...values } = state.filters.set

    commit('SET_FILTERS_SAVED_LOADING', true)

    try {
      const { status, guid } = await this.$api.usersFilters.createNewFilters(FILTERS_SAVED_TABLE_NAME, { values, labels })

      if (status) {
        commit('SET_FILTERS_SAVED_LIST', [ { guid, values: values, labels }, ...state.filters.saved.list ])
        commit('SET_FILTERS_SAVED_LOADING', false)
        commit('SET_FILTERS_SAVED_FETCHED', true)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async removeSavedFilters({ commit, state }, guid) {
    try {
      const { status } = await this.$api.usersFilters.removeFilters(guid)

      if (status) {
        commit('SET_FILTERS_SAVED_LIST', state.filters.saved.list.filter(item => item.guid !== guid))
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async changeFilterSubscription({ commit }, { guid, sendNotifications }) {
    commit('ADD_FILTERS_SAVED_LOADER', guid)
    try {
      const { status } = await this.$api.usersFilters.changeSubscription(guid, sendNotifications)

      if (status) {
        commit('CHANGE_FILTERS_SAVED_ITEM_SUBSCRIPTION', { guid, sendNotifications })
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
    commit('REMOVE_FILTERS_SAVED_LOADER', guid)
  },

  async addToBookmarks({ commit }, guid) {
    try {
      const { status } = await this.$api.favorites.postFavorite(guid, TABLE_NAMES.railwayAggregation)
      if (status) {
        commit('ADD_ITEM_TO_BOOKMARKS', guid)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  },

  async removeItemFromBookmarks({ commit }, guid) {
    try {
      const { status } = await this.$api.favorites.deleteFavorite(guid, TABLE_NAMES.railwayAggregation)
      if (status) {
        commit('REMOVE_ITEM_FROM_BOOKMARKS', guid)
      }
    } catch ({ message }) {
      showErrorMessage(message)
    }
  }
}
