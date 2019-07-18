import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

const URL = Object.freeze({
  DRIVERS: '/api1/transithub/drivers'
})

const formatResponseItem = item => ({
  guid: item.guid,
  firstName: (item.first_name || '').pCapitalizeAllFirstWords(),
  middleName: (item.middle_name || '').pCapitalizeAllFirstWords(),
  lastName: (item.last_name || '').pCapitalizeAllFirstWords(),
  fullName: (item.full_name || '').pCapitalizeAllFirstWords(),
  shortName: (item.name || '').pCapitalizeAllFirstWords(),
  passSerial: (item.pass_serial || '').toUpperCase(),
  passNumber: item.pass_number,
  passDate: new Date(item.pass_date_utc).pFormatDate(),
  passIssued: item.pass_issued,
  certSerialNumber: (item.cert_serial_number || '').toUpperCase(),
  phone: item.phone,
  phone1: item.phone_1,
  phone2: item.phone_2,
  email: item.email,
  companyGuid: item.company_guid,
  isFavorite: item.is_favorite === 1,
  personDocsType: item.person_docs_type || 'passport',
  idCard: item.id_card,
  idCardDate: new Date(item.id_card_date_utc).pFormatDate(),
  idCardIssued: item.id_card_issued
})

const formatPayload = payload => ({
  first_name: payload.firstName,
  middle_name: payload.middleName,
  last_name: payload.lastName,
  cert_serial_number: payload.certSerialNumber,
  phone: payload.phone.pUnmaskPhone(),
  phone_1: (payload.phone1 || '').pUnmaskPhone(),
  phone_2: (payload.phone2 || '').pUnmaskPhone(),
  email: payload.email,
  pass_serial: payload.passSerial,
  pass_number: payload.passNumber,
  pass_date: new Date(payload.passDate).pFormatDate(),
  pass_issued: payload.passIssued,
  person_docs_type: payload.personDocsType || 'passport',
  id_card: payload.idCard,
  id_card_date: new Date(payload.idCardDate).pFormatDate(),
  id_card_issued: payload.idCardIssued
})

export const getDrivers = async function(companyGuid, limit = PAGE_SIZE, offset = OFFSET, filters, search = null) {
  const {
    lastName,
    certSerialNumber,
    phone,
    passSerial,
    passNr
  } = filters

  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.DRIVERS,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      user_guid: this.store.state.user.guid,
      limit,
      offset,
      last_name: lastName,
      cert_serial_number: certSerialNumber,
      phone: phone,
      pass_serial: passSerial,
      pass_number: passNr,
      search
    }
  })

  const result = {
    status,
    count,
    items: []
  }

  if (status && count > 0) {
    items.forEach(item => {
      result.items.push(formatResponseItem(item))
    });
  }

  return result
}

export const getDriver = async function(companyGuid, driverGuid) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.DRIVERS,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      user_guid: this.store.state.user.guid,
      guid: driverGuid
    }
  })

  const result = {
    status,
    item: {}
  }

  if (status && count) {
    const item = items[0]
    result.item = formatResponseItem(item)
  }

  return result
}

export const createDriver = async function(companyGuid, payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'post',
    url: URL.DRIVERS,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid
    },
    data: formatPayload(payload)
  })

  return {
    status,
    err: _err,
    item: status ? formatResponseItem(item) : {}
  }
}

export const changeDriver = async function(companyGuid, driverGuid, payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'put',
    url: URL.DRIVERS,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      guid: driverGuid
    },
    data: formatPayload(payload)
  })

  return {
    status,
    err: _err,
    item: status ? {
      ...formatResponseItem(item),
      companyGuid
    } : {}
  }
}
