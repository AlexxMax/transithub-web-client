export const MUTATIONS_KEYS = Object.freeze({
  SET_DRIVER: 'SET_DRIVER',
  SET_LOADING: 'SET_LOADING',

  // RACE FORM
  UPDATE_RACE_FORM: 'UPDATE_RACE_FORM',
  SET_RACE_FORM_MODIFICATION: 'SET_RACE_FORM_MODIFICATION',
  RESET_RACE_FORM: 'RESET_RACE_FORM',
  SET_RACE_FORM_ACTIVE_STEP: 'SET_RACE_FORM_ACTIVE_STEP',

  // WORKSPACE
  BOTTOM_NAVMENU_VISIBLE: 'BOTTOM_NAVMENU_VISIBLE',
})

export const ACTIONS_KEYS = Object.freeze({
  FETCH_DRIVER: 'FETCH_DRIVER',
  CREATE_DRIVER: 'CREATE_DRIVER',
  CHANGE_DRIVER: 'CHANGE_DRIVER',
})

export const STORE_MODULE_NAME = 'driver'
export const STORE_MODULE_NAME_RACE_FORM = 'driver/races/form'
export const STORE_MODULE_NAME_WORKSPACE = 'driver/workspace'

export const defaultRaceFormData = Object.freeze({
  certSerialNumber: '',
});

export const RACE_FORM_STEPS = Object.freeze({
  START: 'start',
  SELECT_VEHICLE_REGISTER: 'select-vehicle-register',
  CHECK_VEHICLE_REGISTER: 'check-vehicle-register',
  DATA_REFINEMENT: 'data-refinement',
  FINISH: 'finish',
});
