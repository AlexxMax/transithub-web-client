import { complementRequest } from '@/utils/http'
import { getUserJWToken } from '@/utils/user'
import { formatDate } from '@/utils/formating'
import { getStatusPresentation } from '@/utils/vehiclesRegisters'

const URL_VEHICLES_REGISTERS = '/api1/transithub/vehicles_registers'

export const getVehiclesRegisters = async (
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
    url: URL_VEHICLES_REGISTERS,
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
        periodFrom: formatDate(item.date_from_utc),
        periodTo: formatDate(item.date_to_utc),
        tripsQuantity: item.trips_quantity,
        status: getStatusPresentation((item.status || '').toLowerCase()),
        phone: item.phone || item.driver_phone,
        requestGuid: item.request_guid,
        vehicleNumber: item.r_vehicle_number || item.vehicle_number,
        vehicleBrand: item.r_vehicle_brand || `${item.vehicle_brand} ${item.vehicle_model}`,
        trailerNumber: item.r_trailer_number || item.trailer_number,
        trailerBrand: item.r_trailer_brand || `${item.trailer_brand} ${item.trailer_model}`,
        driverFullname: item.r_driver_fullname || item.driver_fullname
      })
    }
  }

  return result
}
