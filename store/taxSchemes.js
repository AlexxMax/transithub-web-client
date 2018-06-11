import {
  complementRequest
} from '@/utils/http'
import {
  show as messageShow,
  TYPE_ERROR as messageTypeError
} from '@/utils/messages'

export const state = () => ({
  list: []
})

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
        nds
      } = item
      state.list.push({
        guid,
        nameUa,
        nameRu,
        nds
      })
    }
  }
}

export const actions = {
  async load({
    commit
  }) {
    commit('CLEAR_LIST')
    try {
      const {
        data: {
          items,
          status
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/transithub/taxSchemes',
      }))

      if (status === true) {
        commit('SET_LIST', items)
      } else {
        throw new Error(`Can't load Tax Schemes`)
      }
    } catch (e) {
      messageShow(e.toString(), messageTypeError)
    }
  }
}
