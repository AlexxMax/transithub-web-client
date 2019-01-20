import { getUserJWToken } from '@/utils/user'

const URL_USERS = '/api1/transithub/companies/users'
const URL_SEND_INVITATION_TO_USER = '/api1/transithub/companies/users.send_invitation'
const URL_ACCEPT_USER_INVITATION = '/api1/transithub/companies/users.accept_invitation'
const URL_INVITATION_INFO = '/api1/transithub/companies/invitation_info'
const URL_CREATE_COMPANY_SIMPLE = '/api1/transithub/companies.simple_create'

export const getUsers = async function({
  companyGuid,
  userGuid
}) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL_USERS,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      user_guid: userGuid
    }
  })

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
        phone: item.user_phone,
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
        phone: item.user_phone,
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

export const updateUser = async function({
  companyGuid,
  userGuid,
  roleGuid,
  active,
  author
}) {
  const {
    data
  } = await this.$axios({
    method: 'put',
    url: URL_USERS,
    data: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      user_guid: userGuid,
      role_guid: roleGuid,
      active,
      author
    }
  })

  return {
    status: data.status,
    userGuid: data.user_guid,
    companyGuid: data.company_guid,
    roleGuid: data.role_guid,
    active: data.active,
    msg: data.msg
  }
}

export const sendInvitationToUser = async function({
  companyGuid,
  userGuid
}) {
  const {
    data
  } = await this.$axios({
    method: 'post',
    url: URL_SEND_INVITATION_TO_USER,
    data: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      user_guid: userGuid
    }
  })

  return {
    status: data.status,
    userGuid: data.user_guid,
    companyGuid: data.company_guid,
    pendingKey: data.pending_key,
    invitationAccepted: data.invitation_accepted,
    msg: data.msg
  }
}

export const getInvitationInfo = async function(
  companyGuid,
  userGuid,
  key
) {
  try {
    const { data: {
      status,
      msg,
      user,
      company,
      author
    }} = await this.$axios({
      method: 'get',
      url: URL_INVITATION_INFO,
      params: {
        access_token: getUserJWToken(this),
        company_guid: companyGuid,
        user_guid: userGuid,
        key
      }
    })

    let _user = {}, _company = {}, _author = {}
    if (status) {
      _user = {
        guid: user.guid,
        firstname: user.firstname,
        lastname: user.lastname,
        fullname: `${user.firstname} ${user.lastname}`,
        email: user.email,
        phone: user.phone,
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

export const acceptInvitation = async function(
  companyGuid,
  userGuid,
  updateUser,
  userFirstname,
  userLastname,
  userEmail,
  userPassword,
  userLanguage,
  key
) {
  const { data } = await this.$axios({
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
  })

  return {
    status: data.status,
    msg: data.msg,
    userGuid: data.user_guid,
    companyGuid: data.company_guid
  }
}

export const createCompanySimple = async function(payload) {
  const {
    name,
    organisationFormGuid,
    ownerGuid
  } = payload

  const { data } = await this.$axios({
    method: 'post',
    url: URL_CREATE_COMPANY_SIMPLE,
    data: {
      name,
      organisation_form: organisationFormGuid,
      owner_guid: ownerGuid
    }
  })

  const result = {
    status: data.status,
    companyExist: data.company_exist
  }

  if (data.status && !data.company_exist) {
    result.item = {
      guid: data.guid,
      name: data.name,
      fullname: data.fullname,
      shortname: data.shortname,
      workname: data.workname,
      workspaceName: data.workspace_name,
      organisationFormGuid: data.organisation_form,
      ownerGuid: data.owner_guid
    }
  }

  return result
}
