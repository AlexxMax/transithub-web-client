import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'

const URL_USERS = '/api1/transithub/companies/users'
const URL_SEND_INVITATION_TO_USER = '/api1/transithub/companies/users.send_invitation'
const URL_ACCEPT_USER_INVITATION = '/api1/transithub/companies/users.accept_invitation'
const URL_INVITATION_INFO = '/api1/transithub/companies/invitation_info'

export const getUsers = async ({
  ctx,
  companyGuid,
  userGuid
}) => {
  if (!ctx) {
    ctx = $nuxt
  }

  const {
    data: {
      status,
      count,
      items
    }
  } = await ctx.$axios(complementRequest({
    method: 'get',
    url: URL_USERS,
    params: {
      access_token: ctx.$store.state.user.token,
      company_guid: companyGuid,
      user_guid: userGuid
    }
  }))

  const result = {
    status: status
  }

  if (userGuid) {
    result.item = {}
    if (items.length > 0) {
      const item = items[0]
      result.item = {
        companyGuid: item.company_guid,
        userGuid: item.user_guid,
        email: item.user_email,
        firstname: item.firstname,
        lastname: item.lastname,
        roleGuid: item.role_guid,
        roleNameUa: item.name_ua,
        roleNameRu: item.name_ru,
        active: item.active,
        pendingKey: item.pending_key,
        invitationAccepted: item.invitation_accepted
      }
    }
  } else {
    result.count = count
    result.items = []
    for (const item of items) {
      result.items.push({
        companyGuid: item.company_guid,
        userGuid: item.user_guid,
        email: item.user_email,
        firstname: item.firstname,
        lastname: item.lastname,
        roleGuid: item.role_guid,
        roleNameUa: item.name_ua,
        roleNameRu: item.name_ru,
        active: item.active,
        pendingKey: item.pending_key,
        invitationAccepted: item.invitation_accepted
      })
    }
  }

  return result
}

export const updateUser = async ({
  companyGuid,
  userGuid,
  roleGuid,
  active
}) => {
  const {
    data
  } = await $nuxt.$axios(complementRequest({
    method: 'put',
    url: URL_USERS,
    data: {
      access_token: $nuxt.$store.state.user.token,
      company_guid: companyGuid,
      user_guid: userGuid,
      role_guid: roleGuid,
      active
    }
  }))

  return {
    status: data.status,
    userGuid: data.user_guid,
    companyGuid: data.company_guid,
    roleGuid: data.role_guid,
    active: data.active,
    msg: data.msg
  }
}

export const sendInvitationToUser = async ({
  companyGuid,
  userGuid
}) => {
  const {
    data
  } = await $nuxt.$axios(complementRequest({
    method: 'post',
    url: URL_SEND_INVITATION_TO_USER,
    data: {
      access_token: $nuxt.$store.state.user.token,
      company_guid: companyGuid,
      user_guid: userGuid
    }
  }))

  return {
    status: data.status,
    userGuid: data.user_guid,
    companyGuid: data.company_guid,
    pendingKey: data.pending_key,
    invitationAccepted: data.invitation_accepted,
    msg: data.msg
  }
}

export const getInvitationInfo = async (
  companyGuid,
  userGuid,
  key,
  ctx
) => {
  try {
    const { data: {
      status,
      msg,
      user,
      company,
      author
    }} = await ctx.$axios(complementRequest({
      method: 'get',
      url: URL_INVITATION_INFO,
      params: {
        access_token: getUserJWToken(ctx),
        company_guid: companyGuid,
        user_guid: userGuid,
        key
      }
    }))

    let _user = {}, _company = {}, _author = {}
    if (status) {
      _user = {
        guid: user.guid,
        firstname: user.firstname,
        lastname: user.lastname,
        fullname: `${user.firstname} ${user.lastname}`,
        email: user.email,
        language: user.language,
        needReg: user.need_reg,
        invitationAccepted: user.invitation_accepted,
        role: {
          guid: user.guid,
          nameUa: user.role.name_ua,
          nameRu: user.role.name_ru
        }
      }

      _company = {
        guid: company.guid,
        name: company.name_ua,
        workName: company.work_name_ua
      }

      _author = {
        guid: author.guid,
        fullname: `${author.firstname} ${author.lastname}`,
        email: author.email
      }
    }

    return {
      status,
      msg,
      user: _user,
      company: _company,
      author: _author
    }
  } catch (err) {
    return {
      status: false,
      msg: err.message
    }
  }
}

export const acceptInvitation = async (
  companyGuid,
  userGuid,
  updateUser,
  userFirstname,
  userLastname,
  userEmail,
  userPassword,
  userLanguage,
  key,
  ctx
) => {
  const { data } = await ctx.$axios(complementRequest({
    method: 'post',
    url: URL_ACCEPT_USER_INVITATION,
    data: {
      user_guid: userGuid,
      update_user: updateUser ? 1 : 0,
      firstname: userFirstname,
      lastname: userLastname,
      password: userPassword,
      email: userEmail,
      language: userLanguage,
      company_guid: companyGuid,
      key: key
    }
  }))

  return {
    status: data.status,
    msg: data.msg,
    userGuid: data.user_guid,
    companyGuid: data.company_guid
  }
}
