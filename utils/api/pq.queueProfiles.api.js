import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

const URL = Object.freeze({
  QUEUE_PROFILES: '/api1/transithub/pq_queues_profiles',
})

const formatResponseItem = (item) => ({
  guid: item.guid,
  name: item.name,
  fullAddress: item.full_address,
  koatuu: item.koatuu,
  districtCode: item.district_code,
  districtName: item.district_name,
  regionCode: item.region_code,
  regionName: item.region_name,
  localityName: item.locality_name,
  companyGuid: item.company_guid,
  authorUserGuid: item.author_user_guid,
  description: item.description,
  lat: item.lat,
  lng: item.lng,
  registrationZoneRadius: item.registration_zone_radius
})

const formatPayload = (payload) => ({
  name: payload.name,
  full_address: payload.full_address,
  koatuu: payload.koatuu,
  district_code: payload.districtCode,

})

export const getQueueProfiles = async function (
  limit = PAGE_SIZE,
  offset = OFFSET,
  companyGuid
) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.QUEUE_PROFILES,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid || this.store.state.companies.currentCompany.guid,
      limit,
      offset,
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

export const getQueueProfile = async function (companyGuid, guid) {
  const { data: { status, count, items } } = await this.$axios({
    method: 'get',
    url: URL.QUEUE_PROFILES,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid || this.store.state.companies.currentCompany.guid,
      guid
    }
  })

  const result = {
    status,
    item: []
  }

  if (status && count > 0) {
    const item = items[0]
    result.item = formatResponseItem(item)
  }

  return result
}


export const createQueueProfile = async function (payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'post',
    url: URL.QUEUE_PROFILES,
    params: {
      access_token: getUserJWToken(this)
    },
    data: formatPayload(payload)
  })

  return {
    status,
    err: _err,
    item: status ? {
      ...formatResponseItem(item)
    } : {}
  }
}

export const changeQueueProfile = async function (guid, payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'put',
    url: URL.QUEUE_PROFILES,
    params: {
      access_token: getUserJWToken(this),
      guid
    },
    data: formatPayload(payload)
  })

  return {
    status,
    err: _err,
    item: status ? {
      ...formatResponseItem(item)
    } : {}
  }
}
