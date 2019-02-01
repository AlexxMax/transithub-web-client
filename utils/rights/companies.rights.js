import { getUser } from '@/utils/rights'
import { isOwner, isAdmin } from '@/utils/roles'

const userCanEdit = function(companyUsers = []) {
  const user = getUser(this.store)
  const userProps = companyUsers.find(item => item.guid === user.guid)
  if (userProps) {
    const role = userProps.roleGuid
    return isOwner(role) || isAdmin(role)
  }
  return false
}

export default (context) => ({
  userCanEdit: userCanEdit.bind(context)
})
