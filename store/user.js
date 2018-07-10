import {
  complementRequest
} from '@/utils/http'
import { createUser as apiCreateUser } from '@/utils/api/users.api'
import {
  showErrorMessage,
  showSuccessMessage
} from '@/utils/messages'
import {
  setToken as setCookieToken,
  unsetToken as unsetCookieToken,
  unsetCurrentCompanyWorkspaceName as unsetCookieCurrentCompanyWorkspaceName,
  setUserId as setCookieUserId,
  unsetUserId as unsetCookieUserId
} from '@/utils/cookies'

export const state = () => ({
  token: '',
  email: '',
  guid: '',
  firstname: '',
  lastname: '',
  language: '',
  regPassword: '',
  newPassword: '',

  strict: true
})

export const getters = {
  username: state => state.firstname + ' ' + state.lastname,
  isAuthenticated: state => !!state.token
}

export const mutations = {
  login(state, user) {
    state.token = user.access_token
    state.guid = user.guid
    state.email = user.email
    state.firstname = user.firstname
    state.lastname = user.lastname
    state.language = user.language
  },

  registration(state, user) {
    state.guid = user.guid
    state.email = user.email
    state.firstname = user.firstname
    state.lastname = user.lastname
    state.regPassword = user.password
    state.language = user.language
  },

  logout(state) {
    if (process.browser) {
      localStorage.removeItem('transithub')
    }

    state.token = null;
    state.guid = null
    state.email = null
    state.firstname = null
    state.lastname = null
    state.language = null
  },

  removeRegPassword(state) {
    delete state.regPassword;
  },

  removeNewPassword(state) {
    delete state.newPassword;
  },

  updateDataUser(state, user) {
    state.email = user.email
    state.firstname = user.firstname
    state.lastname = user.lastname
    state.language = user.language
    state.newPassword = user.password
  }
}

export const actions = {
  async userLogin({
    commit,
    dispatch
  }, user) {
    try {
      const {
        data
      } = await this.$axios(complementRequest({
        method: 'post',
        url: '/api1/transithub/authentication',
        data: user
      }))
      if (data.user_exist) {
        commit('login', data)
        commit('removeRegPassword')
        await dispatch('companies/getUsersCompanies', {userGuid: data.guid}, {root: true})
        setCookieUserId(data.guid)
        setCookieToken(data.access_token)
        this.$router.push(`/${data.language}/workspace/orders`)
      } else {
        throw new Error
      }
    } catch (e) {
      showErrorMessage('Incorrect email or password.')
    }
  },

  async userLogout({
    commit,
    dispatch
  }) {
    commit('logout')
    commit('removeNewPassword')
    dispatch('companies/clearData', null, {
      root: true
    })
    unsetCookieToken()
    unsetCookieCurrentCompanyWorkspaceName()
    unsetCookieUserId()
    this.$router.push('/')
    return null
  },

  async userRegister({
    commit
  }, user) {
    try {
      const data = await apiCreateUser(user)

      const payload = { ...data,
        password: user.password
      }

      if (!data.user_exist) {
        commit('registration', payload)
        return true
      } else {
        throw new Error('User already exsists!')
      }
    } catch (e) {
      showErrorMessage(e.message)
      return false
    }
  },

  async userUpdate({
    commit,
    state
  }, user) {
    try {
      const {
        data
      } = await this.$axios(complementRequest({
        method: 'put',
        url: '/api1/transithub/users',
        params: {
          guid: state.guid,
          access_token: state.token
        },
        data: user
      }))

      if (data.user_exist) {
        commit('updateDataUser', data)
        showSuccessMessage($nuxt.$t('forms.user.messages.saveMainSuccess', user.language))
        return true
      } else {
        throw new Error(data.msg)
      }
    } catch (e) {
      showErrorMessage(e.message)
      return false
    }
  }
}
