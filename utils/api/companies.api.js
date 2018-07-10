import {
  complementRequest
} from '@/utils/http'

const URL_USERS = '/api1/transithub/companies/users'
const URL_SEND_INVITATION_TO_USER = '/api1/transithub/companies/users.send_invitation'

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
