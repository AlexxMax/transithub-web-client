export const state = () => ({
  show: false
})

export const mutations = {
  SHOW_SUBNAVMENU(state) {
    state.show = true
  },
  HIDE_SUBNAVMENU(state) {
    state.show = false
  }
}
