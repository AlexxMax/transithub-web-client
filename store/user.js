import {
  complementRequest
} from '@/utils/http'
import {
  show as messageShow,
  TYPE_ERROR as messageTypeError
} from '@/utils/messages'

export const state = () => ({
  token: '',
  email: '',
  id: '',
  firstname: '',
  lastname: ''
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
  }
}

export const actions = {
  async userLogin({
    commit
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

      if (!data.user_exist) {
        commit('login', data)
        this.$router.push('/workspace')
      } else {
        throw new Error('User already exsists!')
      }
    } catch (e) {
      messageShow(e.toString(), messageTypeError)
    }
  }
}
