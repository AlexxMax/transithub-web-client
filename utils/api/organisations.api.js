import { getUserJWToken } from '@/utils/user'

const URL = Object.freeze({
  ORGANISATIONS: '/api1/transithub/organisations'
})

const formatResponseItem = item => ({
  guid: item.guid,
  name: (item.name || '').pCapitalizeFirstWord(),
  fullname: item.fullname,
  workname: item.workname,
  shortname: item.shortname,
  edrpou : item.edrpou,
  inn: (item.inn || '').toUpperCase(),
  email: item.email,
  facebook: item.facebook,
  telegram: item.telegram,
  phone: item.phone,
  webpage: item.webpage,
  organisationFormGuid: item.organisation_form_guid,
  organisationFormName: (item.organisation_form_name || '').pCapitalizeFirstWord(),
  organisationFormAbbreviation: (item.organisation_form_abbreviation || '').toUpperCase(),
  taxSchemeGuid: item.tax_scheme_guid,
  taxSchemeName: (item.tax_scheme_name || '').pCapitalizeFirstWord(),
  taxSchemeNds: item.tax_scheme_nds === 1
})

const formatPayload = payload => ({
  company_guid: payload.companyGuid,
  name: payload.name,
  edrpou: payload.edrpou,
  inn: payload.inn,
  email: payload.email,
  facebook: payload.facebook,
  telegram: payload.telegram,
  phone: (payload.phone || '').pUnmaskPhone(),
  webpage: payload.webpage,
  organisation_form_guid: payload.organisationFormGuid,
  tax_scheme_guid: payload.taxSchemeGuid
})

export const getOrganisations = async function(companyGuid) {
  const {
    data: {
      status,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.ORGANISATIONS,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid
    }
  })

  const result = {
    status,
    items: []
  }

  if (status) {
    items.forEach(item => {
      result.items.push(formatResponseItem(item))
    });
  }

  return result
}

export const createOrganisation = async function(companyGuid, payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'post',
    url: URL.ORGANISATIONS,
    params: {
      access_token: getUserJWToken(this)
    },
    data: formatPayload({ companyGuid, ...payload })
  })

  return {
    status,
    err: _err,
    item: status ? formatResponseItem(item) : {}
  }
}

export const changeOrganisation = async function(companyGuid, organisationGuid, payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'put',
    url: URL.ORGANISATIONS,
    params: {
      access_token: getUserJWToken(this),
      guid: organisationGuid
    },
    data: formatPayload({ companyGuid, ...payload })
  })

  return {
    status,
    err: _err,
    item: status ? formatResponseItem(item) : {}
  }
}

export const deleteOrganisation = async function(companyGuid, organisationGuid) {
  const { data: { status } } = await this.$axios({
    method: 'delete',
    url: URL.ORGANISATIONS,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      guid: organisationGuid
    }
  })

  return { status }
}
