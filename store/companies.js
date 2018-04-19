import {
  complementRequest
} from '@/utils/http'
import {
  show as messageShow,
  TYPE_ERROR as messageTypeError
} from '@/utils/messages'

export const state = () => ({
  list: [],
  currentCompany: null
})

export const getters = {
  getCurrentCompany: state => {
    return state.currentCompany
  },

  getRandomCompany: state => {
    if (state.list.length != 0) {
      return state.list[0]
    }
    return {}
  },

  getCompanyById: state => id => {
    return state.list.find(item => {
      if (item.id === id) {
        return item
      }
    })
  }
}

export const mutations = {
  registration(state, company) {
    const {
      id,
      name,
      workspace_name: workspaceName
    } = company
    state.list.push({
      id,
      name,
      workspaceName
    })
    state.currentCompany = {
      id,
      name,
      workspaceName
    }
  },

  setCompanies(state, companies) {
    state.list = companies
    if (!state.currentCompany && companies.length >= 0) {
      state.currentCompany = companies[0]
    }
  },

  setCurrentCompany(state, {
    id,
    name,
    workspaceName
  }) {
    state.currentCompany = {
      id,
      name,
      workspaceName
    }
  }
}

export const actions = {
  async companyRegister({
    commit
  }, company) {
    try {
      const {
        data
      } = await this.$axios(complementRequest({
        method: 'post',
        url: '/api1/transithub/companies',
        data: company
      }))

      if (!data.company_exist) {
        commit('registration', data)
        return true
      } else {
        throw new Error('Company already exsists!')
      }
    } catch (e) {
      messageShow(e.toString(), messageTypeError)
      return false
    }
  },

  async getUsersCompanies({
    commit
  }, userId) {
    try {
      const {
        data: {
          status,
          items
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/transithub/companies',
        params: {
          user_id: userId
        }
      }))

      if (status === true) {
        commit('setCompanies', items)
      }
    } catch (e) {
      messageShow(e.toString(), messageTypeError)
    }
  },

  async setCurrentCompany({
    commit
  }, data) {
    commit('setCurrentCompany', data)
  },

  async addUserToCompany({
    commit,
    getters,
    state
  }, {
    companyId,
    userId
  }) {
    try {
      const {
        data
      } = await this.$axios(complementRequest({
        method: 'post',
        url: '/api1/transithub/users.add_to_company',
        data: {
          company_id: companyId,
          user_id: userId
        }
      }))

      if (data.status === true) {
        if (data.user_exist === true && data.company_exist === true) {
          const company = getters.getCompanyById(companyId) || getters.getCurrentCompany || getters.getRandomCompany
          commit('setCurrentCompany', company)
          return true
        } else if (!data.user_exist) {
          throw new Error('Can`t find user')
        } else if (!data.company_exist) {
          throw new Error('Can`t find company')
        }
      } else {
        throw new Error(data.msg)
      }
    } catch (e) {
      messageShow(e.toString(), messageTypeError)
      return false
    }
  }
}
