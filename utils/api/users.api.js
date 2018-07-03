import {
  complementRequest
} from '@/utils/http'

const URL_USERS = '/api1/transithub/users'
const URL_USERS_FIND_BY_EMAIL = '/api1/transithub/users.find_by_email'

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
