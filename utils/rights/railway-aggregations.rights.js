import { getUser } from '@/utils/rights'

export const userCanEdit = function(railwayRequestAuthorsGuid = null) {
  const user = getUser(this.store)
  const railwayAggreagtionItemAuthorGuid = this.store.state.railwayAggregations.item.authorGuid

  return railwayRequestAuthorsGuid
    ? user.guid === railwayRequestAuthorsGuid
    : user.guid === railwayAggreagtionItemAuthorGuid
}
