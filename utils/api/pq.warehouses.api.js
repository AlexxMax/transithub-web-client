import _ from 'lodash'

import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

const URL = Object.freeze({
  PQ_WAREHOUSES: '/api1/transithub/pq_warehouses'
})

// Each object key from smake_case to camelCame
const format = item => Object.keys(item).reduce((obj, key) => ({ ...obj, [_.camelCase(key)]: item[key] }), {})

// API
export const getPQWarehouses = async function (offset, limit) {

  const { status, count, items } = await this.$axios.$get(URL.PQ_WAREHOUSES, {
    params: {
      access_token: getUserJWToken(this),
      company_guid: this.store.state.companies.currentCompany.guid,
      offset,
      limit
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

export const createPQWarehouse = async function (form) {

  const payload = {
    company_guid: this.store.state.companies.currentCompany.guid,
    name: form.name,
    organisation_guid: form.organisation,
    locality_koatuu: form.location,
    full_address: form.address,
    geo_registration_lat: form.lat,
    geo_registration_lng: form.lng
  }

  const { state } = await this.$axios.$post(URL.PQ_WAREHOUSES, payload, {
    params: {
      access_token: getUserJWToken(this)
    }
  })

  return state === 'created' ? true : false

}

export const updatePQWarehouse = async function (guid, form) {

  const payload = {
    company_guid: this.store.state.companies.currentCompany.guid,
    name: form.name,
    organisation_guid: form.organisation,
    locality_koatuu: form.location,
    full_address: form.address,
    geo_registration_lat: form.lat,
    geo_registration_lng: form.lng
  }

  const item = await this.$axios.$put(URL.PQ_WAREHOUSES, payload, {
    params: {
      guid,
      access_token: getUserJWToken(this)
    }
  })

  return {
    status: item.state === 'changed' ? true : false,
    item: format(item)
  }

}