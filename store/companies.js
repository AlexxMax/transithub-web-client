import {
  complementRequest
} from '@/utils/http'
import {
  showErrorMessage,
  showSuccessMessage
} from '@/utils/messages'
import {
  getUserId as getUserIdCookie,
  setCurrentCompanyWorkspaceName as setCurrentCompanyWorkspaceNameCookie,
  getCurrentCompanyWorkspaceName as getCurrentCompanyWorkspaceNameCookie,
  unsetCurrentCompanyWorkspaceName as unsetCurrentCompanyWorkspaceNameCookie
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
  showCreateNewDialog: false,
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
  SET_COMPANIES(state, companies) {
    state.list = []
    for (const company of companies) {
      const {
        guid,
        edrpou,
        inn,
        name_ua: name,
        fullname_ua: fullname,
        shortname_ua: shortname,
        workname_ua: workname,
        organisation_form_guid: organisationFormGuid,
        tax_scheme_guid: taxSchemeGuid,
        workspace_name: workspaceName,
        phone,
        email,
        webpage,
        telegram,
        facebook,
        info,
        description,
        api_token: apiToken
      } = company
      state.list.push({
        guid,
        edrpou,
        inn,
        name,
        fullname,
        shortname,
        workname,
        organisationFormGuid,
        taxSchemeGuid,
        phone,
        email,
        webpage,
        telegram,
        facebook,
        info,
        description,
        apiToken,
        workspaceName
      })
    }
  },

  ADD_COMPANY(state, company) {
    state.list.push(company)
  },

  SET_CURRENT_COMPANY(state, company) {
    state.currentCompany = company
  },

  CLEAR_DATA(state) {
    state.list = []
    state.currentCompany = {}
  },

  CLEAR_USERS(state) {
    state.users.list = []
    state.users.count = 0
  },

  SET_USERS_LIST(state, items) {
    for (const {
      user_guid: guid,
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
        guid,
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

  UPDATE_USER(state, { userGuid, roleGuid, roleNameUa, roleNameRu, active }) {
    const elem = state.users.list.find(elem => elem.guid === userGuid)
    elem.roleGuid = roleGuid
    elem.nameUa = roleNameUa
    elem.nameRu = roleNameRu
    elem.active = active
  },

  SEND_INVITATION_TO_USER(state, { userGuid, pendingKey, invitationAccepted }) {
    const elem = state.users.list.find(elem => elem.guid === userGuid)
    elem.userGuid = userGuid
    elem.pendingKey = pendingKey
    elem.invitationAccepted = invitationAccepted
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
      opponent_work_name_ua: opponentWorkName,
      accred_date: accredDate,
      accred_date_utc: accredDateUtc,
      accred_period: accredPeriod,
      active,
      description
    } of items) {
      state.accredCompanies.list.push({
        opponentGuid,
        opponentWorkName,
        accredDate,
        accredDateUtc,
        accredPeriod,
        active,
        description
      })
    }
  },

  SET_ACCRED_COMPANIES_COUNT(state, count) {
    state.accredCompanies.count = count
  },

  UPDATE_CURRENT_COMPANY(state, company) {
    const {
      guid,
      edrpou,
      inn,
      name_ua: name,
      fullname_ua: fullname,
      shortname_ua: shortname,
      workname_ua: workname,
      organisation_form: organisationFormGuid,
      tax_scheme: taxSchemeGuid,
      workspace_name: workspaceName,
      phone,
      email,
      webpage,
      telegram,
      facebook,
      info,
      api_token: apiToken,
      description
    } = company

    const companyData = {
      guid,
      edrpou,
      inn,
      name,
      fullname,
      shortname,
      workname,
      organisationFormGuid,
      taxSchemeGuid,
      phone,
      email,
      webpage,
      telegram,
      facebook,
      info,
      apiToken,
      workspaceName,
      description
    }

    state.currentCompany = companyData

    for (const i in state.list) {
      if (state.list[i].guid === companyData.guid) {
        state.list[i] = companyData
      }
    }
  },

  SET_CREATE_NEW_DIALOG(state, value) {
    state.showCreateNewDialog = value
  }
}

export const actions = {
  async companyRegister({
    commit,
    dispatch
  }, company) {
    const payload = {
      name_ua: company.name,
      edrpou: company.edrpou,
      inn: company.inn,
      phone: company.phone,
      email: company.email,
      webpage: company.webpage,
      telegram: company.telegram,
      facebook: company.facebook,
      info: company.info,
      organisation_form: company.organisationForm,
      tex_schedule: company.taxScheme,
      description: company.description
    }

    try {
      const {
        data
      } = await this.$axios(complementRequest({
        method: 'post',
        url: '/api1/transithub/companies',
        data: payload
      }))

      if (!data.company_exist) {
        const {
          guid,
          edrpou,
          inn,
          name_ua: name,
          fullname_ua: fullname,
          shortname_ua: shortname,
          workname_ua: workname,
          organisation_form: organisationFormGuid,
          tax_scheme: taxSchemeGuid,
          workspace_name: workspaceName,
          phone,
          email,
          webpage,
          telegram,
          facebook,
          info,
          api_token: apiToken,
          description
        } = data

        const companyData = {
          guid,
          edrpou,
          inn,
          name,
          fullname,
          shortname,
          workname,
          organisationFormGuid,
          taxSchemeGuid,
          phone,
          email,
          webpage,
          telegram,
          facebook,
          info,
          apiToken,
          workspaceName,
          description
        }
        commit('ADD_COMPANY', companyData)
        dispatch('setCurrentCompany', companyData)
        return true
      } else {
        throw new Error('Company already exsists!')
      }
    } catch (e) {
      showErrorMessage(e.message)
      return false
    }
  },

  async getUsersCompanies({
    commit,
    dispatch,
    state
  }, {
    userGuid,
    req
  }) {
    if (!userGuid && process.server) {
      userGuid = getUserIdCookie(req)
    }

    if (!userGuid) {
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
          user_guid: userGuid
        }
      }))

      if (status === true) {
        commit('SET_COMPANIES', items)

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
      showErrorMessage(e.message)
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
        const {
          guid,
          edrpou,
          inn,
          name_ua: name,
          fullname_ua: fullname,
          shortname_ua: shortname,
          workname_ua: workname,
          organisation_form: organisationFormGuid,
          tax_scheme: taxSchemeGuid,
          workspace_name: workspaceName,
          phone,
          email,
          webpage,
          telegram,
          facebook,
          info,
          api_token: apiToken,
          description
        } = company

        const companyData = {
          guid,
          edrpou,
          inn,
          name,
          fullname,
          shortname,
          workname,
          organisationFormGuid,
          taxSchemeGuid,
          phone,
          email,
          webpage,
          telegram,
          facebook,
          info,
          apiToken,
          workspaceName,
          description
        }
        commit('ADD_COMPANY', companyData)
        return true
      } else if (status === false) {
        throw new Error('Can`t find company')
      }
    } catch (e) {
      showErrorMessage(e.message)
      return false
    }
  },

  setCurrentCompany({
    commit
  }, data) {
    commit('SET_CURRENT_COMPANY', data)
    setCurrentCompanyWorkspaceNameCookie(data.workspaceName)
  },

  async addUserToCompany({
    rootState
  }, {
    companyGuid,
    userGuid,
    roleGuid,
    needInvitation,
    active = true
  }) {
    try {
      const {
        data
      } = await this.$axios(complementRequest({
        method: 'post',
        url: '/api1/transithub/users.add_to_company',
        data: {
          company_guid: companyGuid,
          user_guid: userGuid,
          role_guid: roleGuid,
          need_invitation: needInvitation,
          active,
          author: rootState.user.guid
        }
      }))

      if (data.status === true) {
        // if (data.user_exist === true && data.company_exist === true) {
        //   const company = getters.getCompanyByGuid(companyGuid) || getters.getCurrentCompany || getters.getRandomCompany
        //   commit('SET_CURRENT_COMPANY', company)
        //   return true
        // } else
        if (!data.user_exist) {
          throw new Error('Can`t find user')
        } else if (!data.company_exist) {
          throw new Error('Can`t find company')
        }
        return true
      } else {
        throw new Error(data.msg)
      }
    } catch (e) {
      showErrorMessage(e.message)
      return false
    }
  },

  async updateUser({
    commit,
    rootGetters
  }, data) {
    try {
      const result = await this.$api.companies.updateUser(data)

      if (result.status === true) {
        const { nameUa: roleNameUa, nameRu: roleNameRu } = rootGetters['usersRoles/getRoleByGuid'](result.roleGuid)
        commit('UPDATE_USER', { ...result, roleNameUa, roleNameRu })
        return true
      } else {
        throw new Error(result.msg)
      }
    } catch (e) {
      showErrorMessage(e.message)
      return false
    }
  },

  clearData({
    commit
  }) {
    commit('CLEAR_DATA')
    unsetCurrentCompanyWorkspaceNameCookie()
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
      showErrorMessage(e.message)
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
      showErrorMessage(e.message)
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
      showErrorMessage(e.message)
    }
  },

  async updateCompany({
    commit,
    state,
    rootState
  }, company) {
    const payload = {
      name_ua: company.name,
      edrpou: company.edrpou,
      inn: company.inn,
      phone: company.phone,
      email: company.email,
      webpage: company.webpage,
      telegram: company.telegram,
      facebook: company.facebook,
      info: company.info,
      organisation_form: company.organisationFormGuid,
      tex_schedule: company.taxSchemeGuid,
      description: company.description
    }

    try {
      const {
        data
      } = await this.$axios(complementRequest({
        method: 'put',
        url: '/api1/transithub/companies',
        params: {
          guid: state.currentCompany.guid,
          access_token: rootState.user.token
        },
        data: payload
      }))

      if (data.status === true) {
        commit('UPDATE_CURRENT_COMPANY', data)
        setCurrentCompanyWorkspaceNameCookie(data.workspaceName)
        showSuccessMessage($nuxt.$t('forms.company.messages.updateCompanySuccess'))
        return true
      } else {
        throw new Error(`Can't update company`)
      }
    } catch (e) {
      showErrorMessage(e.message)
    }
  },

  showCreateNewDialog({
    commit
  }, value) {
    commit('SET_CREATE_NEW_DIALOG', value)
  },

  async sendInvitationToUser({
    commit
  }, data) {
    try {
      const result = await this.$api.companies.sendInvitationToUser(data)

      if (result.status === true) {
        commit('SEND_INVITATION_TO_USER', result)
        return true
      } else {
        throw new Error(result.msg)
      }
    } catch (e) {
      showErrorMessage(e.message)
      return false
    }
  }
}
