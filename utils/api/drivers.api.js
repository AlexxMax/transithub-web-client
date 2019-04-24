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
  companyGuid: item.company_guid
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
  pass_issued: payload.passIssued
})

export const getDrivers = async function(companyGuid, limit = PAGE_SIZE, offset = OFFSET) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.DRIVERS,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      limit,
      offset
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
