import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

const URL = Object.freeze({
  drivers: '/api1/transithub/drivers'
})

export const getDrivers = async function(companyGuid, limit = PAGE_SIZE, offset = OFFSET) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.drivers,
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
      result.items.push({
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
        companyGuid: item.company_guid
      })
    });
  }

  return result
}

export const getDriver = async function(companyGuid, driverGuid) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.drivers,
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
    result.item = {
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
      companyGuid: item.company_guid
    }
  }

  return result
}
