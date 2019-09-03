import _ from 'lodash'

import { getUserJWToken } from '@/utils/user'
import { getLangFromStore } from '@/utils/locale'
import { PAGE_SIZE } from '@/utils/defaultValues'

const URL_DRIVER_RACE = '/transithub/driver/races'

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

  // const payload = {
  //   ...formatRequest(form, this.store),
  //   user_guid: user.guid,
  //   driver_guid: guid,
  //   driver_cert_serial_number: certSerialNumber,
  //   driver_pass_date: passDate,
  //   driver_pass_issues: passIssued,
  //   driver_pass_number: passNumber,
  //   driver_pass_serial: passSerial,
  //   driver_person_docs_type: personDocsType,
  //   check_geo: form.checkGeo ? 1 : 0,
  //   no_waybill_weight: form.noWaybillWeight ? 1 : 0
  // }
  const payload = {
    "driver_guid": guid,
    "driver_cert_serial_number": certSerialNumber,
    "driver_pass_issued": "test passport issued",
    "driver_pass_number": "12123",
    "driver_pass_serial": "АВ",
    "driver_pass_date": "11-JAN-11",
    "driver_person_docs_type": "passport",
    "vehicle_number": "AA0321AA",
    "trailer_number": "BB0321BB",
    "point_from_koatuu": "0524584405",
    "point_to_koatuu": "0524881203",
    "carrier_guid": "a29d1b72-fe7e-9f83-0cef-14f2d46591cd",
    "carrier_name": "a29d1b72-fe7e-9f83-0cef-14f2d46591cd",
    "sender_name": "sender",
    "goods_guid": "СОЯ",
    "quantity": 3,
    "waybill_number": 321,
    "waybill_date": "2019-09-03T11:35:58.370Z",
    "user_guid": user.guid,
    "loading_type": "",
    "direction": "",
    "vehicles_register_guid": "",
    "waybill_gross": 123,
    "waybill_tara": 23,
    "no_waybill_weight": 1,
    "register_in_queue": 1,
    "geo_lat": 55,
    "geo_lng": 33,
    "check_geo": 0,
    "warehouse_from_code": "5310100000008",
    "warehouse_to_code": "5310100000003"
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