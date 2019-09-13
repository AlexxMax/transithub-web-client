import { getUserJWToken } from '@/utils/user'

const URL = Object.freeze({
  QUEUE_PROFILE: '/api1/transithub/pq_queues_profiles'
})

const formatResponseItem = (res) => ({
  guid: res.guid,
  name: res.name,
  createdAt: res.created_at,
  description: (res.description || '').pCapitalizeFirstWord(),
  lat: res.lat || '',
  lng: res.lng || '',
  fullAddress: res.full_address.pCapitalizeAllFirstWords(),
  koatuu: res.koatuu,
  buildingNr: res.building_n || '',
  districtCode: res.district_code,
  districtName: res.district_name,
  regionCode: res.region_code,
  regionName: res.region_name,
  localityId: res.locality_id,
  localityName: res.locality_name,
  companyId: res.th_company_id,
  author_user_guid: res.author_user_guid
})

export const getQueuesProfiles = async function (
  companyGuid
) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.QUEUE_PROFILE,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid
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
        ...formatResponseItem(item),
        companyGuid
      })
    });
  }

  return result
}