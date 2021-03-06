import { complementRequest } from '@/utils/http'
import * as notify from '@/utils/notifications'
import {
  getUserId as getUserIdCookie,
  setCurrentCompanyWorkspaceName as setCurrentCompanyWorkspaceNameCookie,
  getCurrentCompanyWorkspaceName as getCurrentCompanyWorkspaceNameCookie,
  unsetCurrentCompanyWorkspaceName as unsetCurrentCompanyWorkspaceNameCookie
} from '@/utils/_cookies'

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
  navmenu: {
    showCompanyMenu: false,
    companyGuid: null,
    showCompaniesMenu: false
  },
  userAccess: {
    accessAuto: true,
    accessRailway: true,
    accessQueue: true,
    roleGuid: null,
    _userAccess: {
      accessAuto: true,
      accessRailway: true,
      accessQueue: true,
    }
  },
  globalFilter: null,
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
  },

  globalFilterOnlyGuids: state => {
    if (state.globalFilter) {
      return state.globalFilter.map(({ guid }) => (guid))
    }
    return state.list.map(({ guid }) => (guid))
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
        api_token: apiToken,
        access_auto: accessAuto,
        access_railway: accessRailway,
        access_queue: accessQueue
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
        workspaceName,
        accessAuto: accessAuto === 1,
        accessRailway: accessRailway === 1,
        accessQueue: accessQueue === 1,
      })
    }
  },

  ADD_COMPANY(state, company) {
    state.list.push(company)
  },

  SET_CURRENT_COMPANY(state, company) {
    state.currentCompany = {
      taxSchemeGuid: null,
      ...company
    }
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
        invitation_accepted: invitationAccepted,
        access_auto: accessAuto,
        access_railway: accessRailway,
        access_queue: accessQueue
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
        invitationAccepted,
        accessAuto: accessAuto === 1,
        accessRailway: accessRailway === 1,
        accessQueue: accessQueue === 1,
      })
    }
  },

  SET_USERS_COUNT(state, count) {
    state.users.count = count
  },

  UPDATE_USER(state, { userGuid, roleGuid, active }) {
    const elem = state.users.list.find(item => item.guid === userGuid)

    elem.roleGuid = roleGuid
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
      description,
      access_auto: accessAuto,
      access_railway: accessRailway,
      access_queue: accessQueue,
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
      description,
      accessAuto: accessAuto === 1,
      accessRailway: accessRailway === 1,
      accessQueue: accessQueue === 1,
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
  },

  SET_NAVMENU(state, payload = {}) {
    state.navmenu.showCompanyMenu = payload.showCompanyMenu || false
    state.navmenu.companyGuid = payload.companyGuid || null
    state.navmenu.showCompaniesMenu = payload.showCompaniesMenu || false
  },

  SET_GLOBAL_FILTER(state, filter) {
    state.globalFilter = filter
  },

  CLEAR_GLOBAL_FILTER(state) {
    state.globalFilter = null
  },

  SET_USER_ACCESS_BY_COMPANY(state, { accessAuto, accessRailway, accessQueue }) {
    state.userAccess.accessAuto = accessAuto && state.userAccess._userAccess.accessAuto
    state.userAccess.accessRailway = accessRailway && state.userAccess._userAccess.accessRailway
    state.userAccess.accessQueue = accessQueue && state.userAccess._userAccess.accessQueue
  },

  SET_USER_ACCESS_BY_USER(state, { accessAuto, accessRailway, accessQueue, roleGuid }) {
    state.userAccess.accessAuto = state.currentCompany.accessAuto && accessAuto
    state.userAccess.accessRailway = state.currentCompany.accessRailway && accessRailway
    state.userAccess.accessQueue = state.currentCompany.accessQueue && accessQueue
    state.userAccess.roleGuid = roleGuid

    state.userAccess._userAccess.accessAuto = accessAuto
    state.userAccess._userAccess.accessRailway = accessRailway
    state.userAccess._userAccess.accessQueue = accessQueue
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
      }, this))

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
          description,
          access_auto: accessAuto,
          access_railway: accessRailway,
          access_queue: accessQueue,
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
          description,
          accessAuto,
          accessRailway,
          accessQueue,
        }
        commit('ADD_COMPANY', companyData)
        await dispatch('setCurrentCompany', companyData)
        return true
      } else {
        throw new Error('Company already exsists!')
      }
    } catch ({ message }) {
      notify.error(message)
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
      }, this))

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
          await dispatch('setCurrentCompany', company)
        }
      }
    } catch ({ message }) {
      notify.error(message)
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
      }, this))

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
          description,
          access_auto: accessAuto,
          access_railway: accessRailway,
          access_queue: accessQueue,
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
          description,
          accessAuto: accessAuto === 1,
          accessRailway: accessRailway === 1,
          accessQueue: accessQueue === 1,
        }
        commit('ADD_COMPANY', companyData)
        return true
      } else if (status === false) {
        throw new Error('Can`t find company')
      }
    } catch ({ message }) {
      notify.error(message)
      return false
    }
  },

  async setCurrentCompany({
    commit,
    state,
    rootState
  }, data) {
    if (state.currentCompany.guid === data.guid) {
      return
    }

    commit('SET_CURRENT_COMPANY', data)
    setCurrentCompanyWorkspaceNameCookie(data.workspaceName)

    try {
      const { status, item: { accessAuto, accessRailway, accessQueue, roleGuid } } = await this.$api.companies.getUsers({
        companyGuid: state.currentCompany.guid,
        userGuid: rootState.user.guid,
        compact: true
      })
      if (status) {
        commit('SET_USER_ACCESS_BY_USER', { accessAuto, accessRailway, accessQueue, roleGuid })
      }
    } catch ({ message }) {
      notify.error(message)
    }

    this.$bus.companies.currentCompanyChanged.emit()
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
          active: active ? 1 : 0,
          author: rootState.user.guid
        }
      }, this))

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
    } catch ({ message }) {
      notify.error(message)
      return false
    }
  },

  async updateUser({
    commit,
    dispatch,
    rootGetters
  }, data) {
    try {
      const result = await this.$api.companies.updateUser(data)

      if (result.status === true) return true
      else throw new Error($nuxt.$t(`messages.${result.msgCode}`))

    } catch ({ message }) {
      notify.error(message)
      return false
    }
  },

  clearData({
    commit
  }) {
    unsetCurrentCompanyWorkspaceNameCookie()
    commit('SET_NAVMENU')
    commit('CLEAR_DATA')
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
      }, this))

      if (status === true) {
        commit('SET_USERS_LIST', items)
        commit('SET_USERS_COUNT', count)
      } else {
        throw new Error(`Can't load company's users`)
      }
    } catch ({ message }) {
      notify.error(message)
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
      }, this))

      if (status === true) {
        commit('SET_API_TOKEN', token)
      } else {
        throw new Error(`Can't generate company's API token`)
      }
    } catch ({ message }) {
      notify.error(message)
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
      }, this))

      if (status === true) {
        commit('SET_ACCRED_COMPANIES_LIST', items)
        commit('SET_ACCRED_COMPANIES_COUNT', count)
      } else {
        throw new Error(`Can't load company's accreded companies`)
      }
    } catch ({ message }) {
      notify.error(message)
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
      description: company.description,
      user_guid: rootState.user.guid,
      access_auto: company.accessAuto === true ? 1 : 0,
      access_railway: company.accessRailway === true ? 1 : 0,
      access_queue: company.accessQueue === true ? 1 : 0,
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
      }, this))

      if (data.status === true) {
        commit('UPDATE_CURRENT_COMPANY', data)
        commit(
          'SET_USER_ACCESS_BY_COMPANY', { accessAuto: company.accessAuto, accessRailway: company.accessRailway, accessQueue: company.accessQueue }
        )
        setCurrentCompanyWorkspaceNameCookie(data.workspace_name)
        notify.success($nuxt.$t('forms.company.messages.updateCompanySuccess'))
        return true
      } else {
        const msgCode = data.msg_code
        throw new Error($nuxt.$t(`messages.${msgCode}`))
      }
    } catch ({ message }) {
      notify.error(message)
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
    } catch ({ message }) {
      notify.error(message)
      return false
    }
  },

  async createCompanySimple({ commit, state, dispatch }, payload) {
    const result = { companyExist: false, message: null }
    try {
      const {
        status,
        companyExist,
        item
      } = await this.$api.companies.createCompanySimple(payload)

      result.companyExist = companyExist

      if (status && !companyExist) {
        commit('ADD_COMPANY', item)
        await dispatch('setCurrentCompany', item)
      }
    } catch (error) {
      result.message = error.message
    }

    return result
  },

  setCompaniesGlobalFilter({ state, commit }, companies) {
    commit('SET_GLOBAL_FILTER', companies.length === 0 ? null : companies)
    this.$cookies.companiesGlobalFilter.setFilters(state.globalFilter)
  }
}
