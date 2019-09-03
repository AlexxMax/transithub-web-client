import _ from 'lodash'

import {
  defaultRaceFormData,
  CREATION_TYPES,
  RACE_FORM_STEPS,
  MUTATIONS_KEYS
} from "@/utils/driver"

export const state = () => ({
  activeStep: null,
  modified: false,
  modifiedDate: null,
  creationType: null,
  previousStep: null,
  data: { ...defaultRaceFormData }
});

export const mutations = {
  [MUTATIONS_KEYS.UPDATE_RACE_FORM](state, data) {

    let dataCompare = data
    let defaultRaceFormDataCompare = defaultRaceFormData

    delete defaultRaceFormDataCompare.certSerialNumber
    delete dataCompare.certSerialNumber

    state.modified = !_.isEqual(dataCompare, defaultRaceFormDataCompare)
    state.modified ? state.modifiedDate = new Date() : null

    state.data = { ...state.data, ...data }
  },

  [MUTATIONS_KEYS.SET_RACE_FORM_CREATION_TYPE](state, type) {
    state.creationType = type
  },

  [MUTATIONS_KEYS.SET_RACE_FORM_MODIFICATION](state, modified) {
    state.modified = modified;
  },

  [MUTATIONS_KEYS.SET_RACE_FORM_ACTIVE_STEP](state, step) {
    state.activeStep = step;
  },

  [MUTATIONS_KEYS.SET_RACE_FORM_PREVIOUS_STEP](state, step) {
    state.previousStep = step
  },

  [MUTATIONS_KEYS.RESET_RACE_FORM](state) {
    state.modified = false
    state.data = { ...defaultRaceFormData }
  }
};