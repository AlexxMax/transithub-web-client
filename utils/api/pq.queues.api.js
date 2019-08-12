import { getUserJWToken } from '@/utils/user'
import { PAGE_SIZE, OFFSET } from '@/utils/defaultValues'

const URL = Object.freeze({
  QUEUES: '/api1/transithub/pq_queues'
})

const formatResponseItem = item => ({
  guid: item.guid,
  warehouseGuid: item.warehouse_guid,
  warehouseName: item.warehouse_name,
  name: (item.name || '').pCapitalizeFirstWord(),
  direction: (item.direction || '').pCapitalizeFirstWord(),
  priority: (item.priority || '').pCapitalizeFirstWord(),
  outputRatio: item.output_ratio, 
  loadingType: (item.loading_type || '').pCapitalizeFirstWord(),
  organisationGuid: item.organisation_guid,
  organisationName: item.organisation_name
})

const formatPayload = payload => ({
  name: payload.name,
  direction: payload.direction,
  priority: payload.priority,
  output_ratio: payload.outputRatio,
  loading_type: payload.loadingType,
  company_guid: payload.companyGuid,
  organisation_guid: payload.organisationGuid,
  warehouse_guid: payload.warehouseGuid || ''
})

export const getQueues = async function(
  companyGuid,
  limit = PAGE_SIZE,
  offset = OFFSET
) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.QUEUES,
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
        ...formatResponseItem(item),
        companyGuid
      })
    });
  }

  return result
}

export const getQueue = async function(companyGuid, guid) {
  const {
    data: {
      status,
      count,
      items
    }
  } = await this.$axios({
    method: 'get',
    url: URL.QUEUES,
    params: {
      access_token: getUserJWToken(this),
      company_guid: companyGuid,
      guid
    }
  })

  const result = {
    status,
    item: {}
  }

  if (status && count > 0) {
    const item = items[0]
    result.item = {
      ...formatResponseItem(item),
      companyGuid
    }
  }

  return result
}

export const changeQueue = async function(guid, payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'put',
    url: URL.QUEUES,
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

export const createQueue = async function(payload) {
  const { data: { status, _err, ...item } } = await this.$axios({
    method: 'post',
    url: URL.QUEUES,
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
