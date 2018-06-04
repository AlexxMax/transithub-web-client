import {
  complementRequest
} from '@/utils/http'
import {
  show as messageShow,
  TYPE_ERROR as messageTypeError
} from '@/utils/messages'
import {
  getUserId as getUserIdCookie,
  setCurrentCompanyWorkspaceName as setCurrentCompanyWorkspaceNameCookie,
  getCurrentCompanyWorkspaceName as getCurrentCompanyWorkspaceNameCookie
} from '@/utils/cookies'

export const state = () => ({
  list: [],
  currentCompany: {},
  strict: true
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

  getCompanyByGuid: state => guid => {
    return state.list.find(item => {
      if (item.guid === guid) {
        return item
      }
    })
  },

  getCurrentCompanyWorkspaceName: state => {
    return state.currentCompany.workspaceName
  }
}

export const mutations = {
  registration(state, company) {
    const {
      guid,
      name,
      workspace_name: workspaceName
    } = company
    state.list.push({
      guid,
      name,
      workspaceName
    })
    state.currentCompany = {
      guid,
      name,
      workspaceName
    }
  },

  setCompanies(state, companies) {
    state.list = []
    for (const company of companies) {
      const {
        guid,
        name_ua: nameUa,
        workspace_name: workspaceName
      } = company
      state.list.push({
        guid,
        nameUa,
        workspaceName
      })
    }
  },

  setCurrentCompany(state, {
    guid,
    nameUa,
    workspaceName
  }) {
    state.currentCompany = {
      guid,
      nameUa,
      workspaceName
    }
  },

  clearData(state) {
    state.list = []
    state.currentCompany = {}
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
    commit,
    dispatch,
    state
  }, {
    userId,
    req
  }) {
    if (!userId && process.server) {
      userId = getUserIdCookie(req)
    }

    if (!userId) {
      return
    }

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

        if (!state.currentCompany.guid && state.list.length > 0) {
          const currentCompanyWorkspaceName = (process.server) ? getCurrentCompanyWorkspaceNameCookie(req) : null
          let company = null
          if (currentCompanyWorkspaceName) {
            company = state.list.find((elem) => {
              if (elem.workspaceName === currentCompanyWorkspaceName) {
                return elem
              }
            })
          }

          // set company from list by index
          company = (company) ? company : state.list[0]
          dispatch('setCurrentCompany', company)
        }
      }
    } catch (e) {
      messageShow(e.toString(), messageTypeError)
    }
  },

  async getCompanyByWorkspaceName({
    commit,
  }, workspaceName) {
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
          workspace_name: workspaceName
        }
      }))

      if (status === true) {
        const company = items[0]
        commit('registration', company)
        return true
      } else if (status === false) {
        throw new Error('Can`t find company')
      }
    } catch (e) {
      messageShow(e.toString(), messageTypeError)
      return false
    }
  },

  async setCurrentCompany({
    commit
  }, data) {
    commit('setCurrentCompany', data)
    setCurrentCompanyWorkspaceNameCookie(data.workspaceName)
  },

  async addUserToCompany({
    commit,
    getters,
    state
  }, {
    companyGuid,
    userId
  }) {
    try {
      const {
        data
      } = await this.$axios(complementRequest({
        method: 'post',
        url: '/api1/transithub/users.add_to_company',
        data: {
          company_guid: companyGuid,
          user_id: userId
        }
      }))

      if (data.status === true) {
        if (data.user_exist === true && data.company_exist === true) {
          const company = getters.getCompanyByGuid(companyGuid) || getters.getCurrentCompany || getters.getRandomCompany
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
  },

  clearData({
    commit
  }) {
    commit('clearData')
  }
}
