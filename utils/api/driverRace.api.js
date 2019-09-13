import _ from 'lodash'
import moment from 'moment'

import { getUserJWToken } from '@/utils/user'
import { getLangFromStore } from '@/utils/locale'
import { CREATION_TYPES, STORE_MODULE_NAME_RACE_FORM } from '@/utils/driver'
import { getStatus } from '@/utils/driverRace'
import { PAGE_SIZE } from '@/utils/defaultValues'

const URL_DRIVER_RACE = '/api1/transithub/driver/races'
const URL_DRIVER_RACE_STATUS = '/api1/transithub/driver/races/status'

// Each object key from smake_case to camelCame
const format = item =>
  Object.keys(item).reduce(
    (obj, key) => ({ ...obj, [_.camelCase(key)]: item[key] }), {}
  )

const formatRequest = item =>
  Object.keys(item).reduce(
    (obj, key) => ({ ...obj, [_.snakeCase(key)]: item[key] }), {}
  )

const getPayload = (form, store) => {

  const user = {
    user_guid: store.state.user.guid,
  }

  const driver = {
    driver_guid: store.state.driver.guid,
  }

  const points = {
    point_from_koatuu: form.pointFromKoatuu,
    point_to_koatuu: form.pointToKoatuu
  }

  const warehouses = {
    warehouse_from_code: form.warehouseFromCode,
    warehouse_to_code: form.warehouseToCode
  }

  const secondary = {
    goods_guid: form.goodsGuid,
    carrier_name: form.carrierName.replace(/"/g, '\\"'),
    sender_name: form.senderName.replace(/"/g, '\\"'),
  }

  const vehicle = {
    vehicle_number: form.vehicleNumber,
    trailer_number: form.trailerNumber
  }

  const waybill = {
    waybill_gross: form.waybillGross,
    waybill_number: form.waybillNumber,
    waybill_tara: form.waybillTara,
    waybill_net: form.waybillNet,
    quantity: form.quantity,
    no_waybill_weight: form.noWaybillWeight ? 1 : 0,
    waybill_date: moment(form.waybillDate).format('DD.MM.YYYY')
  }

  return store.state.driver.races.form.creationType == CREATION_TYPES.MANUAL ? {
    ...user,
    ...points,
    ...warehouses,
    ...secondary,
    ...vehicle,
    ...driver,
    ...waybill

  } : {
    ...user,
    ...waybill,
    request_number: form.requestNumber,
    vehicles_register_guid: form.vehiclesRegisterGuid,
  }

}

export const createDriverRace = async function (form) {

  const payload = getPayload(form, this.store)

  console.log(payload);

  const { status } = await this.$axios.$post(URL_DRIVER_RACE, payload, {
    params: {
      access_token: getUserJWToken(this)
    }
  })

  if (!status) return false

  return true
}

export const getDriverCurrentRaces = async function () {

  const { status, ...item } = await this.$axios.$get(URL_DRIVER_RACE_STATUS, {
    params: {
      access_token: getUserJWToken(this),
      user_guid: this.store.state.user.guid
    }
  })

  const result = {
    ...format(item),
    status: getStatus(item.status),
    waybillDate: item.waybill_date.split(' ')[0]
  }

  return status ? result : null
}