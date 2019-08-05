import * as companies from '@/utils/rights/companies.rights'
import * as railwayAggregations from '@/utils/rights/railway-aggregations.rights'
import * as railwayRequests from '@/utils/rights/railway-requests.rights'

import { mapBindMethods } from '@/utils/nuxtIntegrations'

export const getUser = store => {
  return store.state.user
}

export default (context) => ({
  companies: mapBindMethods(context, companies),
  railwayAggregations: mapBindMethods(context, railwayAggregations),
  railwayRequests: mapBindMethods(context, railwayRequests)
})
