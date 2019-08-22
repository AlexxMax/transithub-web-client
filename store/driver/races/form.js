import {
  defaultRaceFormData,
  RACE_FORM_STEPS,
  MUTATIONS_KEYS
} from "@/utils/driver";

export const state = () => ({
  modified: false,
  activeStep: RACE_FORM_STEPS.START,
  data: { ...defaultRaceFormData }
});

export const mutations = {
  [MUTATIONS_KEYS.UPDATE_RACE_FORM](state, data) {
    state.data = { ...state.data, ...data };
  },

  [MUTATIONS_KEYS.SET_RACE_FORM_MODIFICATION](state, modified) {
    state.modified = modified;
  },

  [MUTATIONS_KEYS.SET_RACE_FORM_ACTIVE_STEP](state, step) {
    state.activeStep = step;
  },

  [MUTATIONS_KEYS.RESET_RACE_FORM](state) {
    state.modified = false;
    state.activeStep = RACE_FORM_STEPS.START;
    state.data = { ...defaultRaceFormData };
  }
};
