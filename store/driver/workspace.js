import { MUTATIONS_KEYS } from '@/utils/driver'

export const state = () => ({
  bottomNavmenuVisible: true,
  actionsheetVisible: false,
})

export const mutations = {
  [MUTATIONS_KEYS.BOTTOM_NAVMENU_VISIBLE](state, value) {
    state.bottomNavmenuVisible = value;
  },
  [MUTATIONS_KEYS.SET_ACTIONSHEET_VISIBLE](state, value) {
    state.actionsheetVisible = value;
  }
}