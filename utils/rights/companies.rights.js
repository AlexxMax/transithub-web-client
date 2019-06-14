import { isOwner, isAdmin } from '@/utils/roles'

const userCanEdit = function() {
  const role = this.store.state.companies.userAccess.roleGuid
  return isOwner(role) || isAdmin(role)
}

export default (context) => ({
  userCanEdit: userCanEdit.bind(context)
})
