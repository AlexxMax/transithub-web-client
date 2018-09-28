import { complementRequest } from '@/utils/http'
import API from '@/utils/api'
import { showErrorMessage, showSuccessMessage } from '@/utils/messages'
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

  REGISTRATION(state, user) {
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

  UPDATE_USER_DATA(state, user) {
    state.email = user.email
    state.firstname = user.firstname
    state.lastname = user.lastname
    state.language = user.language
    state.newPassword = user.password
  },

  SET_TOKEN(state, token) {
    state.token = token
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
    return null
  },

  async userRegister({
    commit
  }, user) {
    const errorUserExists = 'User already exists!'

    try {
      let { userExist, needReg } = await API.users.findByEmail(user.email)
      if (userExist) {
        if (needReg) {
            const {
              status,
              userExist,
              guid,
              firstname,
              lastname,
              email,
              language,
              msg
            } = await API.users.activateUser(user, this)

            if (status && userExist) {
              commit('REGISTRATION', {
                guid,
                firstname,
                lastname,
                email,
                language,
                password: user.password
              })
              return true
            } else {
              if (msg) {
                throw new Error(msg)
              } else {
                throw new Error(errorUserExists)
              }
            }
        } else {
          throw new Error(errorUserExists)
        }
      } else {
        const data = await API.users.createUser(user)

        const payload = { ...data,
          password: user.password
        }

        if (!data.user_exist) {
          commit('REGISTRATION', payload)
          return true
        } else {
          throw new Error(errorUserExists)
        }
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
        userExist,
        msg,
        guid,
        firstname,
        lastname,
        email,
        language
      } = await API.users.updateUser(user)

      if (userExist) {
        commit('UPDATE_USER_DATA', {
          guid,
          firstname,
          lastname,
          email,
          language
        })
        showSuccessMessage($nuxt.$t('forms.user.messages.saveMainSuccess', language))
        return true
      } else {
        throw new Error(msg)
      }
    } catch (e) {
      showErrorMessage(e.message)
      return false
    }
  }
}
