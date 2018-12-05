import { getUser } from '@/utils/rights'

const userCanEdit = function(railwayRequestAuthorGuid = null) {
  const user = getUser(this.store)
  const railwayRequestsItemAuthorGuid = this.store.state.railwayRequests.item.authorGuid

  return railwayRequestAuthorGuid
    ? user.guid === railwayRequestAuthorGuid
    : user.guid === railwayRequestsItemAuthorGuid
}

export default (context) => ({
  userCanEdit: userCanEdit.bind(context)
})
