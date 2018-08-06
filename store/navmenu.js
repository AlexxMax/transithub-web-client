export const state = () => ({
  collapse: false
})

export const mutations = {
  SET_COLLAPSE (state, value) {
    state.collapse = value
  }
}
