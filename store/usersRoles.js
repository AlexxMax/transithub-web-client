import {
  complementRequest
} from '@/utils/http'
import * as notify from '@/utils/notifications'

const ADMIN_ROLE_GUID = 'admin'

export const state = () => ({
  list: [],
  count: 0
})

export const getters = {
  getAdminRole: state => {
    return state.list.find(elem => elem.guid === ADMIN_ROLE_GUID) || {}
  },
  getRoleByGuid: state => guid => state.list.find(elem => elem.guid === guid)
}

export const mutations = {
  CLEAR(state) {
    state.list = []
    state.count = 0
  },
  SET_LIST(state, list) {
    state.list = []
    for (const {
        name_ua: nameUa,
        name_ru: nameRu,
        guid
      } of list) {
      state.list.push({
        nameUa,
        nameRu,
        guid
      })
    }
  },
  SET_COUNT(state, count) {
    state.count = count
  }
}

export const actions = {
  async load({
    commit,
    rootState
  }) {
    commit('CLEAR')

    try {
      const {
        data: {
          status,
          count,
          items
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/transithub/users_roles',
        params: {
          access_token: rootState.user.token
        }
      }, this))

      if (status === true) {
        commit('SET_LIST', items)
        commit('SET_COUNT', count)
      } else {
        throw new Error(`Can't load user's roles`)
      }
    } catch (e) {
      notify.error(e.toString())
    }
  }
}
