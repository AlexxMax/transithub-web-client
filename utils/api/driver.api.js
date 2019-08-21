import { getUserJWToken } from '@/utils/user'

const URL = Object.freeze({
  GET_BY_USER: '/api1/transithub/driver.get_by_user',
  CREATE_BY_USER: '/api1/transithub/driver.create_by_user',
})

const formatResponse = (res) => ({
  guid: res.driver_guid,
  certSerialNumber: res.cert_serial_number,
  personDocsType: res.person_docs_type,
  passSerial: res.pass_serial,
  passNumber: res.pass_number,
  passDate: new Date(res.pass_date).pFormatDate(),
  passIssued: res.pass_issued,
})

const formatPayload = (payload) => ({
  cert_serial_number: payload.certSerialNumber,
  pass_issued: payload.passIssued,
  pass_serial: payload.passSerial,
  pass_number: payload.passNumber,
  pass_date: new Date(payload.passDate).pFormatDate(),
  person_docs_type: payload.personDocsType,
})

export const getDriver = async function (userGuid) {
  const { data: { status, ...driver } } = await this.$axios({
    url: URL.GET_BY_USER,
    method: 'get',
    params: {
      access_token: getUserJWToken(this),
      user_guid: userGuid,
    },
  })

  return {
    status,
    driver: formatResponse(driver),
  }
}

export const createDriver = async function (userGuid, payload) {
  const { data: { status, ...driver } } = await this.$axios({
    url: URL.CREATE_BY_USER,
    method: 'post',
    params: {
      access_token: getUserJWToken(this),
      user_guid: userGuid
    },
    data: formatPayload(payload),
  })

  return {
    status,
    driver: formatResponse(driver),
  }
}

export const changeDriver = async function (driverGuid, userGuid, payload) {
  const { data: { status, ...driver } } = await this.$axios({
    url: URL.CREATE_BY_USER,
    method: 'put',
    params: {
      access_token: getUserJWToken(this),
      driver_guid: driverGuid,
      user_guid: userGuid
    },
    data: formatPayload(payload),
  })

  return {
    status,
    driver: formatResponse(driver),
  }
}
