import { isOwner, isAdmin, isUser, ROLES } from '@/utils/roles'

export const userCanEdit = function () {
  const role = this.store.state.companies.userAccess.roleGuid
  return isOwner(role) || isAdmin(role)
}

export const isUserCanEditUser = function (candidate) {
  const myRole = this.store.state.companies.userAccess.roleGuid
  const myGuid = this.store.state.user.guid

  const candidateRole = candidate.roleGuid
  const candidateGuid = candidate.guid

  const isMe = myGuid === candidateGuid

  if (isUser(myRole)) return false

  else if (isOwner(myRole) && (isMe || isAdmin(candidateRole) || isUser(candidateRole)))
    return true

  else if (isAdmin(myRole) && (isAdmin(candidateRole) || isUser(candidateRole)))
    return true

  else return false
}

export const accessibleRoles = function (candidate) {
  const myRole = this.store.state.companies.userAccess.roleGuid
  const myGuid = this.store.state.user.guid

  const candidateRole = candidate.roleGuid
  const candidateGuid = candidate.guid

  const isMe = myGuid === candidateGuid

  const { owner, admin, user } = ROLES

  if (isUser(myRole)) return []

  else if (isOwner(myRole) && (isAdmin(candidateRole) || isUser(candidateRole)))
    return [owner, admin, user]

  else if (isAdmin(myRole) && isMe) return []

  else if (isAdmin(myRole) && (isAdmin(candidateRole) || isUser(candidateRole)))
    return [admin, user]

  else return []
}
