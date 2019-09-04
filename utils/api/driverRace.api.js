import _ from 'lodash'

import { getUserJWToken } from '@/utils/user'
import { getLangFromStore } from '@/utils/locale'
import { PAGE_SIZE } from '@/utils/defaultValues'

const URL_DRIVER_RACE = '/api1/transithub/driver/races'

// Each object key from smake_case to camelCame
const format = item =>
  Object.keys(item).reduce(
    (obj, key) => ({ ...obj, [_.camelCase(key)]: item[key] }), {}
  )

const formatRequest = item =>
  Object.keys(item).reduce(
    (obj, key) => ({ ...obj, [_.snakeCase(key)]: item[key] }), {}
  )

export const createDriverRace = async function (form) {
  const {
    guid,
    certSerialNumber,
    passDate,
    passIssued,
    passNumber,
    passSerial,
    personDocsType
  } = this.store.state.driver
  const user = this.store.state.user

  const formatedRequest = formatRequest(form, this.store)

  const payload = {
    ...formatedRequest,
    user_guid: user.guid,
    driver_guid: guid,
    carrier_name: formatedRequest.carrier_name.replace(/"/g, '\\"'),
    driver_cert_serial_number: certSerialNumber,
    driver_pass_date: passDate,
    driver_pass_issues: passIssued,
    driver_pass_number: passNumber,
    driver_pass_serial: passSerial,
    driver_person_docs_type: personDocsType,
    check_geo: form.checkGeo ? 1 : 0,
    no_waybill_weight: form.noWaybillWeight ? 1 : 0
  }

  console.log(payload);

  const { status, ...data } = await this.$axios.$post(URL_DRIVER_RACE, payload, {
    params: {
      access_token: getUserJWToken(this)
    }
  })

  if (!status) return { status: false }

  return
}