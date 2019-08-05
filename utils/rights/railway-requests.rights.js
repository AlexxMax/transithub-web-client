import { getUser } from '@/utils/rights'

export const userCanEdit = function(railwayRequestAuthorGuid = null) {
  const user = getUser(this.store)
  const railwayRequestsItemAuthorGuid = this.store.state.railwayRequests.item.authorGuid

  return railwayRequestAuthorGuid
    ? user.guid === railwayRequestAuthorGuid
    : user.guid === railwayRequestsItemAuthorGuid
}
