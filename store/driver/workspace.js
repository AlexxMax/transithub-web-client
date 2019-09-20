import { MUTATIONS_KEYS } from '@/utils/driver'

export const state = () => ({
  bottomNavmenuVisible: true,
  actionsheet: { visible: false, items: null },
})

export const mutations = {
  [MUTATIONS_KEYS.BOTTOM_NAVMENU_VISIBLE](state, value) {
    state.bottomNavmenuVisible = value;
  },
  [MUTATIONS_KEYS.SET_ACTIONSHEET](state, actionsheet) {
    state.actionsheet = actionsheet
  }
}
