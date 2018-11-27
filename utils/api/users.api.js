import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'

const URL_USERS = '/api1/transithub/users'
const URL_USERS_ACTIVATE = '/api1/transithub/users.activate'
const URL_USERS_FIND_BY_EMAIL = '/api1/transithub/users.find_by_email'
const URL_USERS_FIND_BY_GUID = '/api1/transithub/users.find_by_guid'
const URL_USERS_CHANGE_PASSWORD = '/api1/transithub/users.update_password'
const URL_USERS_SEND_PIN = '/api1/transithub/users.send_pin'

export const createUser = async function(payload) {
  const {
    data
  } = await this.$axios(complementRequest({
    method: 'post',
    url: URL_USERS,
    data: payload
  }))

  return data
}

export const findUserByEmail = async function(searchEmail) {
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
      phone,
      msg
    }
  } = await this.$axios(complementRequest({
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
    phone,
    language,
    needReg,
    msg
  }
}

export const findUserByGuid = async function(searchGuid) {
  const {
    data: {
      status,
      user_exist: userExist,
      guid,
      firstname,
      lastname,
      email,
      phone,
      language,
      need_reg: needReg,
      msg
    }
  } = await this.$axios(complementRequest({
    method: 'get',
    url: URL_USERS_FIND_BY_GUID,
    params: {
      guid: searchGuid
    }
  }))

  return {
    status,
    userExist,
    guid,
    firstname,
    lastname,
    email,
    phone,
    language,
    needReg,
    msg
  }
}

export const activateUser = async function(user) {
  const {
    data: {
      status,
      user_exist: userExist,
      guid,
      firstname,
      lastname,
      email,
      phone,
      language,
      msg
    }
  } = await this.$axios(complementRequest({
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
    phone,
    language,
    msg
  }
}

export const updateUser = async function(user) {
  const {
    data: {
      status,
      user_exist: userExist,
      guid,
      firstname,
      lastname,
      email,
      phone,
      language,
      need_reg: needReg,
      msg
    }
  } = await this.$axios(complementRequest({
    method: 'put',
    url: URL_USERS,
    params: {
      guid: this.store.state.user.guid,
      access_token: getUserJWToken(this)
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
    phone,
    language,
    needReg,
    msg
  }
}

export const changePassword = async function({ oldPassword, newPassword }) {
  const {
    data: {
      user_exist: userExist,
      status,
      guid,
      msg
    }
  } = await this.$axios(complementRequest({
    method: 'put',
    url: URL_USERS_CHANGE_PASSWORD,
    params: {
      user_guid: this.store.state.user.guid,
      access_token: getUserJWToken(this)
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

export const sendPinToUser = async function(phone, email) {
  const {
    data: {
      status,
      pin_sended: pinSended,
      phone: userPhone
    }
  } = await this.$axios(complementRequest({
    method: 'post',
    url: URL_USERS_SEND_PIN,
    params: {
      access_token: getUserJWToken(this)
    },
    data: {
      email,
      phone
    }
  }))

  return {
    status,
    pinSended,
    phone: userPhone
  }
}
