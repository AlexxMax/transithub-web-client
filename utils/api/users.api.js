import {
  complementRequest
} from '@/utils/http'

const URL_USERS = '/api1/transithub/users'
const URL_USERS_FIND_BY_EMAIL = '/api1/transithub/users.find_by_email'
const URL_USERS_CHANGE_PASSWORD = '/api1/transithub/users.update_password'

export const createUser = async payload => {
  const {
    data
  } = await $nuxt.$axios(complementRequest({
    method: 'post',
    url: URL_USERS,
    data: payload
  }))

  return data
}

export const findUserByEmail = async email => {
  const {
    data
  } = await $nuxt.$axios(complementRequest({
    method: 'get',
    url: URL_USERS_FIND_BY_EMAIL,
    params: {
      email,
      access_token: $nuxt.$store.state.user.token
    }
  }))

  return data
}

export const changePassword = async password => {
  const {
    data: {
      user_exist: userExist,
      status,
      guid,
      msg
    }
  } = await $nuxt.$axios(complementRequest({
    method: 'put',
    url: URL_USERS_CHANGE_PASSWORD,
    params: {
      user_guid: $nuxt.$store.state.user.guid,
      access_token: $nuxt.$store.state.user.token
    },
    data: {
      password_old: password.oldPassword,
      password_new: password.newPassword
    }
  }))

  return {
    userExist,
    status,
    guid,
    msg
  }
}
