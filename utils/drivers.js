export const MUTATIONS_KEYS = Object.freeze({
  SET_LIST: 'SET_LIST',
  APPEND_TO_LIST: 'APPEND_TO_LIST',
  PREPEND_TO_LIST: 'PREPEND_TO_LIST',
  SET_COUNT: 'SET_COUNT',
  SET_LOADING: 'SET_LOADING',
  SET_OFFSET: 'SET_OFFSET',
  SET_ITEM: 'SET_ITEM',
  CLEAR_LIST: 'CLEAR_LIST',
  UPDATE_ITEM_IN_LIST: 'UPDATE_ITEM_IN_LIST',
  SHOW_EDIT_DIALOG: 'SHOW_EDIT_DIALOG',
  SET_EDIT_DIALOG_TYPE: 'SET_EDIT_DIALOG_TYPE',
  ADD_ITEM_TO_BOOKMARKS: 'ADD_ITEM_TO_BOOKMARKS',
  REMOVE_ITEM_FROM_BOOKMARKS: 'REMOVE_ITEM_FROM_BOOKMARKS',
  //SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY: 'SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY',
  SET_FILTERS: 'SET_FILTERS',
  SET_FILTER_LAST_NAME: 'SET_FILTER_LAST_NAME',
  SET_FILTER_CERT_SERIAL_NUMBER: 'SET_FILTER_CERT_SERIAL_NUMBER',
  SET_FILTER_PHONE: 'SET_FILTER_PHONE',
  SET_FILTER_PASS_SERIAL: 'SET_FILTER_PASS_SERIAL',
  SET_FILTER_PASS_NR: 'SET_FILTER_PASS_NR',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SET_FILTERS_SAVED_LOADING: 'SET_FILTERS_SAVED_LOADING',
  SET_FILTERS_SAVED_LIST: 'SET_FILTERS_SAVED_LIST',
  SET_FILTERS_SAVED_LOADING: 'SET_FILTERS_SAVED_LOADING',
  SET_FILTERS_SAVED_FETCHED: 'SET_FILTERS_SAVED_FETCHED',
  UPDATE_FILTERS_DATA: 'UPDATE_FILTERS_DATA',
  SET_FILTERS_DATA_FETCHED: 'SET_FILTERS_DATA_FETCHED',
  SET_SEARCH: 'SET_SEARCH',

  SET_VEHICLES_REGISTERS_LIST: 'SET_VEHICLES_REGISTERS_LIST',
  SET_VEHICLES_REGISTERS_LOADING: 'SET_VEHICLES_REGISTERS_LOADING',
  SET_VEHICLES_REGISTERS_COUNT: 'SET_VEHICLES_REGISTERS_COUNT'
})

export const ACTIONS_KEYS = Object.freeze({
  FETCH_LIST: 'FETCH_LIST',
  FETCH_ITEM: 'FETCH_ITEM',
  CREATE_ITEM: 'CREATE_ITEM',
  CHANGE_ITEM: 'CHANGE_ITEM',
  SHOW_EDIT_DIALOG: 'SHOW_EDIT_DIALOG',
  ADD_ITEM_TO_BOOKMARKS: 'ADD_ITEM_TO_BOOKMARKS',
  REMOVE_ITEM_FROM_BOOKMARKS: 'REMOVE_ITEM_FROM_BOOKMARKS',
  SET_FILTERS: 'SET_FILTERS',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SET_FILTER_LAST_NAME: 'SET_FILTER_LAST_NAME',
  SET_FILTER_CERT_SERIAL_NUMBER: 'SET_FILTER_CERT_SERIAL_NUMBER',
  SET_FILTER_PHONE: 'SET_FILTER_PHONE',
  SET_FILTER_PASS_SERIAL: 'SET_FILTER_PASS_SERIAL',
  SET_FILTER_PASS_NR: 'SET_FILTER_PASS_NR',
  SET_FILTERS: 'SET_FILTERS',
  CREATE_NEW_SAVED_FILTERS: 'CREATE_NEW_SAVED_FILTERS',
  REMOVE_SAVED_FILTERS: 'REMOVE_SAVED_FILTERS',
  LOAD_SAVED_FILTERS: 'LOAD_SAVED_FILTERS',
  SET_SEARCH: 'SET_SEARCH',

  FETCH_VEHICLES_REGISTERS_LIST: 'FETCH_VEHICLES_REGISTERS_LIST',
  UPDATE_VEHICLES_REGISTERS: 'UPDATE_VEHICLES_REGISTERS'
})

export const GETTERS_KEYS = Object.freeze({
  LIST_FILTERS_SET: 'LIST_FILTERS_SET'
})

export const STORE_MODULE_NAME = 'drivers'

export const EDIT_DIALOG_TYPES = Object.freeze({
  EDIT: 'editing',
  CREATE: 'creation'
})

export const PERSON_DOCS_TYPE = Object.freeze({
  PASSPORT: 'passport',
  ID_CARD: 'id_card'
})

export const filtersInit = Object.freeze({
  lastName: null,
  certSerialNumber:  null || '',
  phone: null,
  passSerial: null,
  passNr: null
})

export const setFilter = async (context, key, value) => {
  if (!key) {
    return
  }

  switch (key) {
    case 'lastName':
      await context.$store.dispatch('drivers/SET_FILTER_LAST_NAME', value)
      break
    case 'certSerialNumber':
      await context.$store.dispatch('drivers/SET_FILTER_CERT_SERIAL_NUMBER', value)
      break
    case 'phone':
      await context.$store.dispatch('drivers/SET_FILTER_PHONE', value)
      break
    case 'passSerial':
      await context.$store.dispatch('drivers/SET_FILTER_PASS_SERIAL', value)
      break
    case 'passNr':
      await context.$store.dispatch('drivers/SET_FILTER_PASS_NR', value)
      break
  }
}
