import _ from 'lodash'

import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

const URL = Object.freeze({
  PQ_WAREHOUSES: '/api1/transithub/pq_warehouses'
})

// Each object key from smake_case to camelCame
const format = item => Object.keys(item).reduce((obj, key) => ({ ...obj, [_.camelCase(key)]: item[key] }), {})

// API
export const getPQWarehouses = async function (
  companyGuid = this.store.state.companies.currentCompany.guid,
  limit = PAGE_SIZE,
  offset = OFFSET,
) {

  const { status, count, items } = await this.$axios.$get(URL.PQ_WAREHOUSES, {
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid
    }
  })

  if (!status) return

  const formatedItems = items.map(item => format(item))

  return { status, count, items: formatedItems }

}

export const getPQWarehouse = async function (
  guid,
  companyGuid = this.store.state.companies.currentCompany.guid,
  limit = PAGE_SIZE,
  offset = OFFSET,
) {

  const { status, count, items } = await this.$axios.$get(URL.PQ_WAREHOUSES, {
    params: {
      guid,
      access_token: getUserJWToken(this),
      company_guid: companyGuid
    }
  })

  if (!status) return

  return { status, item: format(items[0]) }

}

export const createPQWarehouses = async function (payload) {

  const newPayload = {
    "company_guid": this.store.state.companies.currentCompany.guid,
    "organisation_guid": "8827599e-a087-6752-597e-4701f519c952",
    "warehouse_id": 13184,
    "name": "For Test",
    "lat": "50",
    "lng": "35",
    "full_address": "вул. Яноунеймушка 14",
    "street_type": "55",
    "street_name": "Соборна",
    "building_n": "8",
    "kt": "1",
    "location_type_code": "02",
    "location_type": "тип",
    "geo_status": "+",
    "koatuu": "123456",
    "organisation": "Організація",
    "kind": "вид",
    "is_used": "1",
    "code_ad": "213",
    "district_code": "23",
    "district_name": "Район",
    "region_code": "44",
    "region_name": "Область",
    "locality_name": "насю пункт",
    "geo_registration_lat": "55.20",
    "geo_registration_lng": "33.26"
  }

  const { status } = await this.$axios.$post(URL.PQ_WAREHOUSES, newPayload, {
    params: {
      access_token: getUserJWToken(this),
    }
  })

  console.log(status);

}