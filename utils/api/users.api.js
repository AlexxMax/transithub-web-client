import {
  complementRequest
} from '@/utils/http'

const URL_USERS = '/api1/transithub/users'
const URL_USERS_ACTIVATE = '/api1/transithub/users.activate'
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

export const findUserByEmail = async searchEmail => {
  const {
    data: {
      status,
      user_exist: userExist,
      guid,
      firstname,
      lastname,
      email,
      language,
      need_reg: needReg,
      msg
    }
  } = await $nuxt.$axios(complementRequest({
    method: 'get',
    url: URL_USERS_FIND_BY_EMAIL,
    params: {
      email: searchEmail
    }
  }))

  return {
    status,
    userExist,
    guid,
    firstname,
    lastname,
    email,
    language,
    needReg,
    msg
  }
}

export const activateUser = async (user, ctx) => {
  const {
    data: {
      status,
      user_exist: userExist,
      guid,
      firstname,
      lastname,
      email,
      language,
      msg
    }
  } = await ctx.$axios(complementRequest({
    method: 'post',
    url: URL_USERS_ACTIVATE,
    data: user
  }))

  return {
    status,
    userExist,
    guid,
    firstname,
    lastname,
    email,
    language,
    msg
  }
}

export const updateUser = async user => {
  const {
    data: {
      status,
      user_exist: userExist,
      guid,
      firstname,
      lastname,
      email,
      language,
      need_reg: needReg,
      msg
    }
  } = await $nuxt.$axios(complementRequest({
    method: 'put',
    url: URL_USERS,
    params: {
      guid: $nuxt.$store.state.user.guid,
      access_token: $nuxt.$store.state.user.token
    },
    data: { ...user, need_reg: user.needReg }
  }))

  return {
    status,
    userExist,
    guid,
    firstname,
    lastname,
    email,
    language,
    needReg,
    msg
  }
}

export const changePassword = async ({ oldPassword, newPassword }) => {
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
      password_old: oldPassword,
      password_new: newPassword
    }
  }))

  return {
    userExist,
    status,
    guid,
    msg
  }
}
