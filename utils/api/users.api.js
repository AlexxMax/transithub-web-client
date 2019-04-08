import { getUserJWToken } from '@/utils/user'

const URL_USERS = '/api1/transithub/users'
const URL_USERS_ACTIVATE = '/api1/transithub/users.activate'
const URL_USERS_FIND_BY_EMAIL = '/api1/transithub/users.find_by_email'
const URL_USERS_FIND_BY_GUID = '/api1/transithub/users.find_by_guid'
const URL_USERS_CHANGE_PASSWORD = '/api1/transithub/users.update_password'
const URL_USERS_SEND_PIN = '/api1/transithub/users.send_pin'
const URL_USERS_PHONE_IS_UNIQUE = '/api1/transithub/users.phone_is_unique'
const URL_USERS_CHECK_PHONE_BY_PIN = '/api1/transithub/users.check_phone_by_pin'
const URL_USERS_CHANGE_PASSWORD_SEND_PIN = '/api1/transithub/users.change_password.pin'
const URL_USERS_CHANGE_PASSWORD_CONFIRM = '/api1/transithub/users.change_password.confirm'

export const createUser = async function(payload) {
  const {
    data
  } = await this.$axios({
    method: 'post',
    url: URL_USERS,
    data: payload
  })

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
      msg,
      phone_checked: phoneChecked
    }
  } = await this.$axios({
    method: 'get',
    url: URL_USERS_FIND_BY_EMAIL,
    params: {
      email: searchEmail
    }
  })

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
    msg,
    phoneChecked
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
      msg,
      phone_checked: phoneChecked
    }
  } = await this.$axios({
    method: 'get',
    url: URL_USERS_FIND_BY_GUID,
    params: {
      guid: searchGuid
    }
  })

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
    msg,
    phoneChecked
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
  } = await this.$axios({
    method: 'post',
    url: URL_USERS_ACTIVATE,
    data: user
  })

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
  } = await this.$axios({
    method: 'put',
    url: URL_USERS,
    params: {
      guid: this.store.state.user.guid,
      access_token: getUserJWToken(this)
    },
    data: {
      ...user,
      need_reg: user.needReg,
      phone_checked: user.phoneChecked ? 1 : 0
    }
  })

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

export const updateUserOnRegistration = async function(user) {
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
  } = await this.$axios({
    method: 'put',
    url: URL_USERS,
    params: {
      update_by_email: 1
    },
    data: {
      ...user,
      phone: user.phone ? user.phone.pUnmaskPhone() : null
    }
  })

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
  } = await this.$axios({
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
  })

  return {
    userExist,
    status,
    guid,
    msg
  }
}

export const sendPinToUser = async function(phone, email, phoneUnregistered = false) {
  const {
    data: {
      status,
      pin_sended: pinSended,
      phone: userPhone
    }
  } = await this.$axios({
    method: 'post',
    url: URL_USERS_SEND_PIN,
    params: {
      access_token: getUserJWToken(this)
    },
    data: {
      email,
      phone,
      phone_unregistered: phoneUnregistered ? 1 : null
    }
  })

  return {
    status,
    pinSended,
    phone: userPhone
  }
}

export const phoneIsUnique = async function(phone) {
  const { data: { status, phone_unique } } = await this.$axios({
    method: 'get',
    url: URL_USERS_PHONE_IS_UNIQUE,
    params: { phone }
  })

  return {
    status,
    phoneIsUnique: phone_unique
  }
}

export const checkPhoneByPin = async function(phone, pin) {
  const { data: { status, valid } } = await this.$axios({
    method: 'post',
    url: URL_USERS_CHECK_PHONE_BY_PIN,
    params: { phone, pin }
  })

  return {
    status,
    valid: valid
  }
}

export const changePasswordSendPin = async function(userGuid = null, userEmail = null, userPhone = null) {
  const { data: { status, phone, user_guid: guid } } = await this.$axios({
    method: 'post',
    url: URL_USERS_CHANGE_PASSWORD_SEND_PIN,
    params: {
      user_guid: userGuid,
      email: userEmail,
      phone: userPhone,
      access_token: getUserJWToken(this)
    }
  })

  return { status, phone, guid }
}

export const changePasswordConfirm = async function(userGuid, pin, password) {
	console.log("TCL: userGuid, pin, password", userGuid, pin, password)
  const { data: { status } } = await this.$axios({
    method: 'post',
    url: URL_USERS_CHANGE_PASSWORD_CONFIRM,
    params: {
      user_guid: userGuid,
      access_token: getUserJWToken(this),
      pin,
      password
   }
  })

  return { status }
}

