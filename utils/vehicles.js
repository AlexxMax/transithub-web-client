export const MUTATIONS_KEYS = Object.freeze({
  SET_TRUCKS_LIST: 'SET_TRUCKS_LIST',
  APPEND_TO_TRUCKS_LIST: 'APPEND_TO_TRUCKS_LIST',
  PREPEND_TO_TRUCKS_LIST: 'PREPEND_TO_TRUCKS_LIST',
  SET_TRUCKS_COUNT: 'SET_TRUCKS_COUNT',
  SET_TRUCKS_LOADING: 'SET_TRUCKS_LOADING',
  SET_TRUCKS_OFFSET: 'SET_TRUCKS_OFFSET',
  CLEAR_TRUCKS_LIST: 'CLEAR_TRUCKS_LIST',

  SET_TRAILERS_LIST: 'SET_TRAILERS_LIST',
  APPEND_TO_TRAILERS_LIST: 'APPEND_TO_TRAILERS_LIST',
  PREPEND_TO_TRAILERS_LIST: 'PREPEND_TO_TRAILERS_LIST',
  SET_TRAILERS_COUNT: 'SET_TRAILERS_COUNT',
  SET_TRAILERS_LOADING: 'SET_TRAILERS_LOADING',
  SET_TRAILERS_OFFSET: 'SET_TRAILERS_OFFSET',
  CLEAR_TRAILERS_LIST: 'CLEAR_TRUCKS_LIST',

  SET_LOADING: 'SET_LOADING',
  SET_ITEM: 'SET_ITEM',
  SHOW_EDIT_DIALOG: 'SHOW_EDIT_DIALOG',
  SET_EDIT_DIALOG_TYPE: 'SET_EDIT_DIALOG_TYPE',
  SET_TYPES: 'SET_TYPES',
  UPDATE_ITEM_IN_LIST: 'UPDATE_ITEM_IN_LIST',
  CLEAR_ITEM: 'CLEAR_ITEM',
  ADD_ITEM_TO_BOOKMARKS: 'ADD_ITEM_TO_BOOKMARKS',
  REMOVE_ITEM_FROM_BOOKMARKS: 'REMOVE_ITEM_FROM_BOOKMARKS',
  SET_FILTERS: 'SET_FILTERS',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SET_FILTER_VEHICLE_NR: 'SET_FILTER_VEHICLE_NR',
  SET_FILTER_TECH_PASSPORT: 'SET_FILTER_TECH_PASSPORT',
  SET_FILTER_BRAND: 'SET_FILTER_BRAND',
  SET_FILTER_TYPE: 'SET_FILTER_TYPE',
  SET_FILTERS_SAVED_LOADING: 'SET_FILTERS_SAVED_LOADING',
  SET_FILTERS_SAVED_LIST: 'SET_FILTERS_SAVED_LIST',
  SET_FILTERS_SAVED_FETCHED: 'SET_FILTERS_SAVED_FETCHED',
  SET_SEARCH: 'SET_SEARCH',
  SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY: 'SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY'
})

export const ACTIONS_KEYS = Object.freeze({
  FETCH_TRUCKS_LIST: 'FETCH_TRUCKS_LIST',
  FETCH_TRAILERS_LIST: 'FETCH_TRAILERS_LIST',
  FETCH_ITEM: 'FETCH_ITEM',
  FETCH_TYPES: 'FETCH_TYPES',
  CREATE_ITEM: 'CREATE_ITEM',
  CHANGE_ITEM: 'CHANGE_ITEM',
  SHOW_EDIT_DIALOG: 'SHOW_EDIT_DIALOG',
  ADD_ITEM_TO_BOOKMARKS: 'ADD_ITEM_TO_BOOKMARKS',
  REMOVE_ITEM_FROM_BOOKMARKS: 'REMOVE_ITEM_FROM_BOOKMARKS',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SET_FILTERS: 'SET_FILTERS',
  SET_FILTER_VEHICLE_NR: 'SET_FILTER_VEHICLE_NR',
  SET_FILTER_TECH_PASSPORT: 'SET_FILTER_TECH_PASSPORT',
  SET_FILTER_BRAND: 'SET_FILTER_BRAND',
  SET_FILTER_TYPE: 'SET_FILTER_TYPE',
  CREATE_NEW_SAVED_FILTERS: 'CREATE_NEW_SAVED_FILTERS',
  REMOVE_SAVED_FILTERS: 'REMOVE_SAVED_FILTERS',
  LOAD_SAVED_FILTERS: 'LOAD_SAVED_FILTERS',
  SET_SEARCH: 'SET_SEARCH'
})

export const GETTERS_KEYS = Object.freeze({
  TRUCKS: 'TRUCKS',
  TRAILERS: 'TRAILERS',
  LIST_FILTERS_SET: 'LIST_FILTERS_SET'
})

export const STORE_MODULE_NAME = 'vehicles'

export const EDIT_DIALOG_TYPES = Object.freeze({
  EDIT: 'editing',
  CREATE: 'creation'
})

export const LIST_TYPES = Object.freeze({
  TRUCK: 'truck',
  TRAILER: 'trailer'
})

export const filtersInit = Object.freeze({
  vehicleNr: null,
  techPassport: null,
  brand: null,
  type: ''
})

export const setFilter = async (context, key, value) => {
  if (!key) {
    return
  }

  switch (key) {
    case 'vehicleNr':
      await context.$store.dispatch('vehicles/SET_FILTER_VEHICLE_NR', value)
      break
    case 'techPassport':
      await context.$store.dispatch('vehicles/SET_FILTER_TECH_PASSPORT', value)
      break
    case 'brand':
      await context.$store.dispatch('vehicles/SET_FILTER_BRAND', value)
      break
    case 'type':
      await context.$store.dispatch('vehicles/SET_FILTER_TYPE', value)
      break
  }
}
