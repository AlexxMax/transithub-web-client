import { complementRequest } from '@/utils/http'
import * as notify from '@/utils/notifications'
import {
  setToken as setCookieToken,
  unsetToken as unsetCookieToken,
  unsetCurrentCompanyWorkspaceName as unsetCookieCurrentCompanyWorkspaceName,
  setUserId as setCookieUserId,
  unsetUserId as unsetCookieUserId
} from '@/utils/_cookies'

export const state = () => ({
  token: '',
  email: '',
  phone: '',
  phoneChecked: false,
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
    state.phone = user.phone
    state.phoneChecked = user.phone_checked
    state.firstname = user.firstname
    state.lastname = user.lastname
    state.language = user.language
  },

  REGISTRATION(state, user) {
    state.guid = user.guid
    state.email = user.email
    state.phone = user.phone
    state.firstname = user.firstname
    state.lastname = user.lastname
    state.regPassword = user.password
    state.language = user.language
  },

  logout(state) {
    if (process.browser) {
      localStorage.removeItem('transithub')
    }

    state.token = null
    state.guid = null
    state.email = null
    state.phone = null
    state.firstname = null
    state.lastname = null
    state.language = null
    state.phoneChecked = false
  },

  removeRegPassword(state) {
    delete state.regPassword;
  },

  removeNewPassword(state) {
    delete state.newPassword;
  },

  UPDATE_USER_DATA(state, user) {
    state.email = user.email
    state.phone = user.phone
    state.firstname = user.firstname
    state.lastname = user.lastname
    state.language = user.language
    state.newPassword = user.password
  },

  SET_TOKEN(state, token) {
    state.token = token
  },

  SET_GUID(state, guid) {
    state.guid = guid
  },

  SET_USER_DATA(state, user) {
    state.guid = user.guid
    state.email = user.email
    state.phone = user.phone
    state.phoneChecked = user.phoneChecked
    state.firstname = user.firstname
    state.lastname = user.lastname
    state.language = user.language
  }
}

export const actions = {
  /**
   * Login user
   *
   * @param {*} {
   *     commit,
   *     dispatch
   *   }
   * @param {*} user
   */
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
        params: {
          auth_type: user.authType
        },
        data: {
          ...user,
          phone: user.phone ? user.phone.pUnmaskPhone() : null
        }
      }))
      if (data.user_exist) {
        commit('login', data)
        commit('removeRegPassword')
        await dispatch('companies/getUsersCompanies', { userGuid: data.guid }, { root: true })
        setCookieUserId(data.guid)
        setCookieToken(data.access_token)
      } else {
        throw new Error
      }
    } catch (e) {
      return false
      // notify.error('Incorrect phone number, email or password.')
    }
    return true
  },

  userLogout({
    commit,
    dispatch
  }) {
    commit('logout')
    commit('removeNewPassword')
    dispatch('companies/clearData', null, {
      root: true
    })
    unsetCookieToken()
    unsetCookieUserId()
  },

  async userRegister({
    commit
  }, user) {
    const errorUserExists = 'User already exists!'

    try {
      let { userExist, needReg } = await this.$api.users.findByEmail(user.email)
      if (userExist) {
        if (needReg) {
          // const {
          //   status,
          //   userExist,
          //   guid,
          //   firstname,
          //   lastname,
          //   email,
          //   phone,
          //   language,
          //   msg
          // } = await this.$api.users.activateUser(user)

          // if (status && userExist) {
          //   commit('REGISTRATION', {
          //     guid,
          //     firstname,
          //     lastname,
          //     email,
          //     phone,
          //     language,
          //     password: user.password
          //   })
          //   return true
          // } else {
          //   if (msg) {
          //     throw new Error(msg)
          //   } else {
          //     throw new Error(errorUserExists)
          //   }
          // }

          const {
            status,
            userExist,
            guid,
            firstname,
            lastname,
            email,
            phone,
            language,
            msg
          } = await this.$api.users.updateUserOnRegistration(user)

          if (status && userExist) {
            commit('REGISTRATION', {
              guid,
              firstname,
              lastname,
              email,
              phone,
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
        const data = await this.$api.users.createUser(user)

        const payload = {
          ...data,
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
      notify.error(e.message)
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
        phone,
        language
      } = await this.$api.users.updateUser(user)

      if (userExist) {
        commit('UPDATE_USER_DATA', {
          guid,
          firstname,
          lastname,
          email,
          phone,
          language
        })
        return true
      } else {
        throw new Error(msg)
      }
    } catch (e) {
      notify.error(e.message)
      return false
    }
  },

  async getUserInfo({ commit, dispatch, state }, guid = null) {
    try {
      const data = await this.$api.users.findByGuid(guid || state.guid)

      if (data.msg) {
        // dispatch('userLogout')
        // $nuxt.layoutName = "public"
        // $nuxt.$router.push('/')
        // this.app.router.push('/')
        throw new Error(data.msg)
      }

      if (data.status && data.userExist) {
        commit('SET_USER_DATA', data)
      } else {
        // dispatch('userLogout')
        // this.app.router.push('/')
      }

      return true
    } catch (e) {
      notify.error(e.message)
      return false
    }
  }
}