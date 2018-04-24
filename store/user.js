import {
  complementRequest
} from '@/utils/http'
import {
  show as messageShow,
  TYPE_ERROR as messageTypeError
} from '@/utils/messages'
import {
  show as notificationShow
} from '@/utils/notifications'

export const state = () => ({
  token: '',
  email: '',
  id: '',
  firstname: '',
  lastname: '',
  language: '',
  regPassword: '',

  strict: true
})

export const getters = {
  username: state => state.firstname + ' ' + state.lastname,
  isAuthenticated: state => !!state.token
}

export const mutations = {
  login(state, user) {
    state.token = user.access_token
    state.id = user.id
    state.email = user.email
    state.firstname = user.firstname
    state.lastname = user.lastname
    state.language = user.language
  },

  registration(state, user) {
    state.id = user.id
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
    state.id = null
    state.email = null
    state.firstname = null
    state.lastname = null
    state.language = null
  },

  removeRegPassword(state) {
    delete state.regPassword;
  },

  updateDataUser(state, user) {
    state.email = user.email
    state.firstname = user.firstname
    state.lastname = user.lastname
    state.language = user.language
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
        dispatch('companies/getUsersCompanies', data.id, {
          root: true
        })
        this.$router.push('/workspace')
      } else {
        throw new Error
      }
    } catch (e) {
      messageShow('Incorrect email or password.', messageTypeError)
    }
  },

  async userLogout({
    commit
  }) {
    commit('logout')
    this.$router.push('/')
    return null
  },

  async userRegister({
    commit
  }, user) {
    try {
      const {
        data
      } = await this.$axios(complementRequest({
        method: 'post',
        url: '/api1/transithub/users',
        data: user
      }))

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
      messageShow(e.toString(), messageTypeError)
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
          id: state.id,
          access_token: state.token
        },
        data: user
      }))

      if (data.user_exist) {
        commit('updateDataUser', data)
        notificationShow('Повідомлення', 'Дані користувача змінено!')
        return true
      } else {
        throw new Error()
      }
    } catch (e) {
      infoShow(e.toString(), infoTypeError)
      return false
    }
  }
}
