import * as companies from '@/utils/api/companies.api'
import * as requests from '@/utils/api/requests.api'
import * as points from '@/utils/api/points.api'
import * as warehouses from '@/utils/api/warehouses.api'
import * as races from '@/utils/api/races.api'
import * as users from '@/utils/api/users.api'
import * as vehiclesRegisters from '@/utils/api/vehiclesRegisters.api'
import * as railwayAggregations from '@/utils/api/railway-aggregations.api'
import * as goods from '@/utils/api/goods.api'
// import * as tags from '@/utils/api/tags.api'
import * as usersFilters from '@/utils/api/users-filters.api'
import * as favorites from '@/utils/api/favorites.api'
import * as drivers from '@/utils/api/drivers.api'
import * as vehicles from '@/utils/api/vehicles.api'
import * as organisations from '@/utils/api/organisations.api'
import * as localities from '@/utils/api/localities.api'
import * as pqWarehouses from '@/utils/api/pq.warehouses.api'

import { mapBindMethods } from '@/utils/nuxtIntegrations'

export default (context) => {
  return {
    companies: mapBindMethods(context, companies),
    requests: mapBindMethods(context, requests),
    points: mapBindMethods(context, points),
    warehouses: mapBindMethods(context, warehouses),
    races: mapBindMethods(context, races),
    users: mapBindMethods(context, users),
    vehiclesRegisters: mapBindMethods(context, vehiclesRegisters),
    railway: mapBindMethods(context, railwayAggregations),
    goods: mapBindMethods(context, goods),
    // tags: mapBindMethods(context, tags),
    usersFilters: mapBindMethods(context, usersFilters),
    favorites: mapBindMethods(context, favorites),
    drivers: mapBindMethods(context, drivers),
    vehicles: mapBindMethods(context, vehicles),
    organisations: mapBindMethods(context, organisations),
    localities: mapBindMethods(context, localities),
    pqWarehouses: mapBindMethods(context, pqWarehouses)
  }
}