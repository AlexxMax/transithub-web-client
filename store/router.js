export const state = () => ({
  workspaceLandingRoute: null
})

export const mutations = {
  SET_WORKSPACE_LANDING_ROUTE(state, { name, params }) {
    state.workspaceLandingRoute = {
      name,
      params
    }
  },
  CLEAR_WORKSPACE_LANDING_ROUTE(state) {
    state.workspaceLandingRoute = null
  }
}
