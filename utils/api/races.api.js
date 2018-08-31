import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'
import { formatDate, formatDateTime } from '@/utils/formating'
import { getStatusPresentation } from '@/utils/races'

const URL_RACES = '/api1/transithub/races'

export const getRaces = async (
  limit,
  offset,
  filters,
  ctx
) => {
  const {
    data: {
      status,
      count,
      items
    }
  } = await ctx.$axios(complementRequest({
    method: 'get',
    url: URL_RACES,
    params: {
      access_token: getUserJWToken(ctx),
      limit: limit,
      offset: offset,
      request_guid: filters.requestGuid
    }
  }))

  const result = {
    status,
    count,
    items: []
  }

  if (status) {
    for (const item of items) {
      result.items.push({
        guid: item.guid,
        number: item.number,
        date: formatDate(item.date_utc),
        driverFullname: item.driver_full_name,
        phone: item.phone || item.driver_phone,
        vehicleNumber: item.vehicle_number,
        vehicleBrand: `${item.vehicle_brand} ${item.vehicle_model}`,
        trailerNumber: item.trailer_number || '',
        trailerBrand: `${item.trailer_brand || ''} ${item.trailer_model || ''}`,
        quantity: item.quantity,
        lastEventUa: item.last_event_ua || '',
        LastEventRu: item.last_event_ru || '',
        lastEventDate: formatDateTime(item.last_event_date_utc),
        status: getStatusPresentation((item.status || '').toLowerCase())
      })
    }
  }

  return result
}
