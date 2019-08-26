import { MUTATIONS_KEYS } from '@/utils/driver'

export const state = () => ({
  bottomNavmenuVisible: true,
})

export const mutations = {
  [MUTATIONS_KEYS.BOTTOM_NAVMENU_VISIBLE](state, value) {
    state.bottomNavmenuVisible = value;
  }
}
