export const MUTATIONS_KEYS = Object.freeze({
  SET_LIST: 'SET_LIST',
  SET_COUNT: 'SET_COUNT',
  SET_LOADING: 'SET_LOADING',
  SET_OFFSET: 'SET_OFFSET',
  SET_ITEM: 'SET_ITEM',
  CLEAR_LIST: 'CLEAR_LIST',
  APPEND_TO_LIST: 'APPEND_TO_LIST',
  PREPEND_TO_LIST: 'PREPEND_TO_LIST',
  UPDATE_ITEM_IN_LIST: 'UPDATE_ITEM_IN_LIST',

  SET_SUBORDINATE_LIST: 'SET_SUBORDINATE_LIST',
  APPEND_TO_SUBORDINATE_LIST: 'APPEND_TO_SUBORDINATE_LIST',
  SET_SUBORDINATE_WAREHOUSE_NAME: 'SET_SUBORDINATE_WAREHOUSE_NAME',
  SET_SUBORDINATE_LOADING: 'SET_SUBORDINATE_LOADING',
  SET_SUBORDINATE_VISIBILE: 'SET_SUBORDINATE_VISIBILE',
  SET_SUBORDINATE_OFFSET: 'SET_SUBORDINATE_OFFSET',

  SHOW_EDIT_DIALOG: 'SHOW_EDIT_DIALOG',
  SET_EDIT_DIALOG_TYPE: 'SET_EDIT_DIALOG_TYPE',
  SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY: 'SET_CREATE_NEW_INACCESSIBLE_FUNCTIONALITY'
})

export const ACTIONS_KEYS = Object.freeze({
  FETCH_LIST: 'FETCH_LIST',
  FETCH_ITEM: 'FETCH_ITEM',
  CHANGE_ITEM: 'CHANGE_ITEM',
  CREATE_ITEM: 'CREATE_ITEM',

  FETCH_SUBORDINATE_LIST: 'FETCH_SUBORDINATE_LIST',

  SHOW_EDIT_DIALOG: 'SHOW_EDIT_DIALOG'
})

export const EDIT_DIALOG_TYPES = Object.freeze({
  EDIT: 'editing',
  CREATE: 'creation'
})

export const DIRECTIONS = Object.freeze({
  UNLOADING: 'Unloading',
  LOADING: 'Loading'
})

export const PRIORITIES = Object.freeze({
  LOW: 'Low',
  MEDIUM: 'Normal',
  HIGH: 'High'
})

export const LOADING_TYPES = Object.freeze({
  MOUND: 'Mound',
  POURING: 'Pouring'
})

export const STORE_MODULE_NAME = 'pqQueues'