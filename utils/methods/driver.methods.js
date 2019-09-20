import {
  STORE_MODULE_NAME_RACE_FORM as RACE_FORM_MODULE,
  STORE_MODULE_NAME_WORKSPACE as WORKSPACE_MODULE,
  STORE_MODULE_NAME,
  MUTATIONS_KEYS,
  ACTIONS_KEYS,
  RACE_FORM_STEPS,
  CREATION_TYPES
} from "@/utils/driver";

// RACE FORM

export const setСreationType = function (type) {
  this.store.commit(`${RACE_FORM_MODULE}/${MUTATIONS_KEYS.SET_RACE_FORM_CREATION_TYPE}`, type)
  this.store.commit(`${RACE_FORM_MODULE}/${MUTATIONS_KEYS.SET_RACE_FORM_ACTIVE_STEP}`, type === CREATION_TYPES.BY_VEHICLE_REGISTER ? RACE_FORM_STEPS.SELECT_VEHICLE_REGISTER : RACE_FORM_STEPS.MANUAL_CREATION)
}

export const setRaceFormModified = function (modified) {
  this.store.commit(`${RACE_FORM_MODULE}/${MUTATIONS_KEYS.SET_RACE_FORM_MODIFICATION}`, modified)
}

export const setRaceFormActiveStep = function (step) {
  this.store.commit(`${RACE_FORM_MODULE}/${MUTATIONS_KEYS.SET_RACE_FORM_ACTIVE_STEP}`, step)
}

export const setRaceFormPreviousStep = function (step) {
  this.store.commit(`${RACE_FORM_MODULE}/${MUTATIONS_KEYS.SET_RACE_FORM_PREVIOUS_STEP}`, step)
}

export const updateRaceForm = function (data) {
  this.store.commit(`${RACE_FORM_MODULE}/${MUTATIONS_KEYS.UPDATE_RACE_FORM}`, data)
}

export const resetRaceForm = function () {
  this.store.commit(`${RACE_FORM_MODULE}/${MUTATIONS_KEYS.RESET_RACE_FORM}`)
}

// WORKSPACE
export const setBottomNavmenuVisible = function (visible) {
  this.store.commit(`${WORKSPACE_MODULE}/${MUTATIONS_KEYS.BOTTOM_NAVMENU_VISIBLE}`, visible)
}
export const setActionsheet = function (visible, items) {
  this.store.commit(`${WORKSPACE_MODULE}/${MUTATIONS_KEYS.SET_ACTIONSHEET}`, { visible, items })
}

// DRIVER PROFILE FORM
export const changeDriver = function (payload) {
  this.store.dispatch(`${STORE_MODULE_NAME}/${ACTIONS_KEYS.CHANGE_DRIVER}`, payload)
}
