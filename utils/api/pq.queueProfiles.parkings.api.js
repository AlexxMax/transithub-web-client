import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE } from '@/utils/defaultValues'

const URL = Object.freeze({
  QUEUE_PROFILES_PARKINGS: '/api1/transithub/pq_queue_profiles/pq_parkings',
})

const formatResponseItem = item => ({
  parkingGuid: item.parking_guid,
  parkingName: item.parking_name,
  parkingFullAddress: item.parking_full_address,
  parkingActive: item.parking_active,
  queueProfileGuid: item.profile_guid,
  queueProfileName: item.profile_name,
  queueProfileFullAddress: item.profile_full_address,
  profileActive: item.profile_active,
  companyGuid: item.company_guid
})

export const getParkingsQueueProfiles = async function (offset, limit = PAGE_SIZE, companyGuid, queueProfileGuid) {
  const { status, count, items } = await this.$axios.$get(URL.QUEUE_PROFILES_PARKINGS, {
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid || this.store.state.companies.currentCompany.guid,
      profile_guid: queueProfileGuid,
      offset,
      limit
    }
  })

  if (!status) return;

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

export const getQueueProfilesParkings = async function (offset, limit = PAGE_SIZE, companyGuid, parkingGuid) {
  const { status, count, items } = await this.$axios.$get(URL.QUEUE_PROFILES_PARKINGS, {
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid || this.store.state.companies.currentCompany.guid,
      parking_guid: parkingGuid,
      offset,
      limit
    }
  })

  if (!status) return;

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

export const bindParkingWithQueueProfile = async function (parkingGuid) {
  const { status, _err, ...item } = await this.$axios.$post(URL.QUEUE_PROFILES_PARKINGS, {
    queue_profile_guid: this.store.state.pqQueueProfiles.item.guid,
    parking_guid: parkingGuid,
  }, {
    params: {
      access_token: getUserJWToken(this)
    }
  })
  return {
    status,
    err: _err,
    item: status ? {
      ...formatResponseItem(item)
    } : {}
  }
}

export const unbindParkingWithQueueProfile = async function (parkingGuid) {
  const { status, _err } = await this.$axios.$delete(URL.QUEUE_PROFILES_PARKINGS, {
    params: {
      access_token: getUserJWToken(this),
      queue_profile_guid: this.store.state.pqQueueProfiles.item.guid,
      parking_guid: parkingGuid
    }
  })
  
  return {
    status,
    err: _err
  }
}

export const bindQueueProfileWithParking = async function (queueProfileGuid) {
  const { status, _err, ...item } = await this.$axios.$post(URL.QUEUE_PROFILES_PARKINGS, {
    queue_profile_guid: queueProfileGuid,
    parking_guid: this.store.state.pqParkings.item.guid,
  }, {
    params: {
      access_token: getUserJWToken(this)
    }
  })
  
  return {
    status,
    err: _err,
    item: status ? {
      ...formatResponseItem(item)
    } : {}
  }
}

export const unbindQueueProfileWithParking = async function (queueProfileGuid) {
  const { status, _err } = await this.$axios.$delete(URL.QUEUE_PROFILES_PARKINGS, {
    params: {
      access_token: getUserJWToken(this),
      queue_profile_guid: queueProfileGuid,
      parking_guid: this.store.state.pqParkings.item.guid
    }
  })
  
  return {
    status,
    err: _err
  }
}
