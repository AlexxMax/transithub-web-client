import _orderBy from 'lodash.orderby'

import { complementRequest } from '@/utils/http'
import * as notify from '@/utils/notifications'

export const state = () => ({
  list: [],
  loading: false
})

export const getters = {
  getOrganisationForm: state => guid => {
    return state.list.find(elem => elem.guid === guid) || {}
  }
}

export const mutations = {
  CLEAR_LIST(state) {
    state.list = []
  },
  SET_LIST(state, list) {
    for (const item of list) {
      const {
        guid,
        name_ua: nameUa,
        name_ru: nameRu,
        abbr_ua: abbrUa,
        abbr_ru: abbrRu,
        type
      } = item
      state.list.push({
        guid,
        nameUa,
        nameRu,
        abbrUa,
        abbrRu,
        type
      })
    }
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

export const actions = {
  async load({
    commit,
    rootState
  }) {
    commit('CLEAR_LIST')
    commit('SET_LOADING', true)
    try {
      const {
        data: {
          items,
          status
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/transithub/organisationForms',
      }))

      if (status === true) {
        const nameCol = rootState.locale === 'ua' ? 'name_ua' : 'name_ru'
        const list = _orderBy(items, [nameCol], ['desc'])
        commit('SET_LIST', list)
        commit('SET_LOADING', false)
      } else {
        throw new Error(`Can't load Organisation Forms`)
      }
    } catch (e) {
      commit('SET_LOADING', false)
      notify.error(e.toString())
    }
  }
}