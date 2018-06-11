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
  users: {
    list: [],
    count: 0
  },
  accredCompanies: {
    list: [],
    count: 0
  },
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
        edrpou,
        inn,
        name_ua: nameUa,
        name_ru: nameRu,
        fullname_ua: fullnameUa,
        fullname_ru: fullnameRu,
        shortname_ua: shortnameUa,
        shortname_ru: shortnameRu,
        workname_ua: worknameUa,
        workname_ru: worknameRu,
        organisation_form_guid: organisationFormGuid,
        organisation_form_name_ua: organisationFormNameUa,
        organisation_form_name_ru: organisationFormNameRu,
        organisation_form_abbr_ua: organisationFormAbbrUa,
        organisation_form_abbr_ru: organisationFormAbbrRu,
        organisation_form_type: organisationFormType,
        organisation_form_nds: organisationFormNds,
        tax_scheme_guid: taxSchemeGuid,
        tax_scheme_name_ua: taxSchemeNameUa,
        tax_scheme_name_ru: taxSchemeNameRu,
        tax_scheme_name_nds: taxSchemeNameNds,
        workspace_name: workspaceName,
        phone,
        email,
        webpage,
        telegram,
        facebook,
        info,
        api_token: apiToken
      } = company
      state.list.push({
        guid,
        edrpou,
        inn,
        nameUa,
        nameRu,
        fullnameUa,
        fullnameRu,
        shortnameUa,
        shortnameRu,
        worknameUa,
        worknameRu,
        organisationFormGuid,
        organisationFormNameUa,
        organisationFormNameRu,
        organisationFormAbbrUa,
        organisationFormAbbrRu,
        organisationFormType,
        organisationFormNds,
        taxSchemeGuid,
        taxSchemeNameUa,
        taxSchemeNameRu,
        taxSchemeNameNds,
        workspaceName,
        phone,
        email,
        webpage,
        telegram,
        facebook,
        info,
        apiToken
      })
    }
  },

  setCurrentCompany(state, company) {
    state.currentCompany = { ...company }
  },

  clearData(state) {
    state.list = []
    state.currentCompany = {}
  },

  CLEAR_USERS(state) {
    state.users.list = []
    state.users.count = 0
  },

  SET_USERS_LIST(state, items) {
    for (const {
      user_email: userEmail,
      firstname,
      lastname,
      role_guid: roleGuid,
      name_ua: nameUa,
      name_ru: nameRu,
      active,
      pending_key: pendingKey,
      invitation_accepted: invitationAccepted
    } of items) {
      state.users.list.push({
        userEmail,
        firstname,
        lastname,
        roleGuid,
        nameUa,
        nameRu,
        active: active === 1,
        pendingKey,
        invitationAccepted
      })
    }
  },

  SET_USERS_COUNT(state, count) {
    state.users.count = count
  },

  SET_API_TOKEN(state, token) {
    state.currentCompany.apiToken = token
  },

  CLEAR_ACCRED_COMPANIES(state) {
    state.accredCompanies.list = []
    state.accredCompanies.count = 0
  },

  SET_ACCRED_COMPANIES_LIST(state, items) {
    for (const {
      opponent_guid: opponentGuid,
      opponent_work_name_ua: opponentWorkNameUa,
      opponent_work_name_ru: opponentWorkNameRu,
      accred_date: accredDate,
      accred_period: accredPeriod,
      active
    } of items) {
      state.accredCompanies.list.push({
        opponentGuid,
        opponentWorkNameUa,
        opponentWorkNameRu,
        accredDate,
        accredPeriod,
        active
      })
    }
  },

  SET_ACCRED_COMPANIES_COUNT(state, count) {
    state.accredCompanies.count = count
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
  },

  async loadCompanyUsers({
    commit,
    state,
    rootState
  }) {
    commit('CLEAR_USERS')

    try {
      const {
        data: {
          status,
          items,
          count
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/transithub/companies/users',
        params: {
          company_guid: state.currentCompany.guid,
          access_token: rootState.user.token
        }
      }))

      if (status === true) {
        commit('SET_USERS_LIST', items)
        commit('SET_USERS_COUNT', count)
      } else {
        throw new Error(`Can't load company's users`)
      }
    } catch (e) {
      messageShow(e.toString(), messageTypeError)
    }
  },

  async generateApiToken({
    commit,
    state,
    rootState
  }) {
    try {
      const {
        data: {
          status,
          token
        }
      } = await this.$axios(complementRequest({
        method: 'post',
        url: '/api1/transithub/companies/api_client',
        params: {
          company_guid: state.currentCompany.guid,
          access_token: rootState.user.token
        }
      }))

      if (status === true) {
        commit('SET_API_TOKEN', token)
      } else {
        throw new Error(`Can't generate company's API token`)
      }
    } catch (e) {
      messageShow(e.toString(), messageTypeError)
    }
  },

  async loadCompanyAccredCompanies({
    commit,
    state,
    rootState
  }) {
    commit('CLEAR_ACCRED_COMPANIES')

    try {
      const {
        data: {
          status,
          items,
          count
        }
      } = await this.$axios(complementRequest({
        method: 'get',
        url: '/api1/transithub/companies/accred_companies',
        params: {
          company_guid: state.currentCompany.guid,
          access_token: rootState.user.token
        }
      }))

      if (status === true) {
        commit('SET_ACCRED_COMPANIES_LIST', items)
        commit('SET_ACCRED_COMPANIES_COUNT', count)
      } else {
        throw new Error(`Can't load company's accreded companies`)
      }
    } catch (e) {
      messageShow(e.toString(), messageTypeError)
    }
  }
}
