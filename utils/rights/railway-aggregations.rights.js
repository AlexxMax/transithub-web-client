import { getUser } from '@/utils/rights'

const userCanEdit = function(railwayRequestAuthorsGuid = null) {
  const user = getUser(this.store)
  const railwayAggreagtionItemAuthorGuid = this.store.state.railwayAggregations.item.authorGuid

  return railwayRequestAuthorsGuid
    ? user.guid === railwayRequestAuthorsGuid
    : user.guid === railwayAggreagtionItemAuthorGuid
}

export default (context) => ({
  userCanEdit: userCanEdit.bind(context)
})
