import generateRailwayAggregationsRights from '@/utils/rights/railway-aggregations.rights'
import generateRailwayRequestsRights from '@/utils/rights/railway-requests.rights'

export const getUser = (store) => {
  return store.state.user
}

export default (context) => ({
  railwayAggregations: generateRailwayAggregationsRights(context),
  railwayRequests: generateRailwayRequestsRights(context)
})
